const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { getPlugin, pluginByName, whenProd } = require('@craco/craco')
const PrerendererWebpackPlugin = require('@prerenderer/webpack-plugin')

const prerenderRoutes = require('./prerenderRoutes')

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl)
const analyzer = process.argv.includes('--analyzer')

/** @type {import('@craco/types').CracoConfig} */
module.exports = {
  reactScriptsVersion: 'react-scripts',
  webpack: {
    alias: {
      '@': pathResolve('src'),
    },
    plugins: {
      add: [new ProgressBarPlugin()]
        .concat(
          analyzer
            ? [
                new BundleAnalyzerPlugin({
                  analyzerMode: 'server',
                  analyzerHost: '127.0.0.1',
                  analyzerPort: 8889,
                  openAnalyzer: true, // 构建完打开浏览器
                  reportFilename: path.resolve(__dirname, `analyzer/index.html`),
                }),
              ]
            : [],
        )
        .concat(
          whenProd(
            () => [
              new UglifyJsPlugin({
                // 开启打包缓存
                cache: true,
                // 开启多线程打包
                parallel: true,
                uglifyOptions: {
                  // 删除警告
                  warnings: false,
                  // 压缩
                  compress: {
                    // 移除console
                    drop_console: true,
                    // 移除debugger
                    drop_debugger: true,
                  },
                },
              }),
              new PrerendererWebpackPlugin({
                routes: prerenderRoutes,
                rendererOptions: {
                  headless: false,
                  renderAfterTime: 3000,
                  timeout: 5000,
                },
              }),
            ],
            [],
          ),
        ),
    },
    configure: (webpackConfig) => {
      // splitChunks打包优化
      webpackConfig.optimization.splitChunks = {
        ...webpackConfig.optimization.splitChunks,
        cacheGroups: {
          commons: {
            chunks: 'all',
            // 将两个以上的chunk所共享的模块打包至commons组。
            minChunks: 2,
            name: 'commons',
            priority: 80,
          },
        },
      }
      // 开启持久化缓存
      webpackConfig.cache.type = 'filesystem'

      // 缩小loaders处理范围
      webpackConfig.module.rules.forEach((rule) => {
        rule.include = path.resolve(__dirname, 'src')
      })

      // cdn
      const { isFound: isHtmlWebpackPluginFound, match: htmlWebpackPlugin } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin'),
      )

      if (isHtmlWebpackPluginFound && htmlWebpackPlugin) {
        htmlWebpackPlugin.userOptions.cdn = whenProd(
          () => {
            webpackConfig.externals = {
              react: 'React',
              'react-dom': 'ReactDOM',
              redux: 'Redux',
              'react-redux': 'ReactRedux',
            }
            return {
              js: [
                'https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.production.min.js',
                'https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
                'https://cdn.bootcdn.net/ajax/libs/redux/4.2.1/redux.min.js',
                'https://cdn.bootcdn.net/ajax/libs/react-redux/8.0.5/react-redux.min.js',
              ],
              css: [],
            }
          },
          { js: [], css: [] },
        )
      }
      // cdn

      return webpackConfig
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://test.buckydrop.com',
        changeOrigin: true,
      },
    },
    // 本地服务的端口号
    port: 3000,
    // 本地服务的响应头设置
    headers: {
      // 允许跨域
      'Access-Control-Allow-Origin': '*',
    },
  },
}
