import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

import Routing from './routes'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Routing />
    </BrowserRouter>
  )
}

export default App
