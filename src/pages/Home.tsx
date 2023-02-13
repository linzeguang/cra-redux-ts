import React from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectTheme, updateTheme } from '@/features/basicSlice'

const Home: React.FC = () => {
  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div>{theme}</div>
      <button onClick={() => dispatch(updateTheme('dark'))}>dark</button>
      <button onClick={() => dispatch(updateTheme('light'))}>light</button>
    </div>
  )
}

export default Home
