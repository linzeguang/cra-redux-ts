import React from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = React.lazy(() => import('@/pages/Home'))
const About = React.lazy(() => import('@/pages/About'))

const Routing: React.FC = () => {
  return (
    <React.Suspense fallback={null}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </React.Suspense>
  )
}

export default Routing
