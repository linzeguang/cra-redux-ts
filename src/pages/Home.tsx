import React from 'react'
import { Button } from '@mui/material'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectTheme, updateTheme } from '@/features/basicSlice'

const Home: React.FC = () => {
  const theme = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div>{theme}</div>
      <Button variant='contained' onClick={() => dispatch(updateTheme('dark'))}>
        dark
      </Button>
      <Button variant='outlined' onClick={() => dispatch(updateTheme('light'))}>
        light
      </Button>
    </div>
  )
}

export default Home
