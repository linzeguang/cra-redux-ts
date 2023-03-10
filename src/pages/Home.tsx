import React from 'react'
import styled from '@emotion/styled'

const Text = styled.p({
  fontSize: 24,
  color: 'tomato',
})

const Home: React.FC = () => {
  return (
    <div>
      <Text>Home</Text>
    </div>
  )
}

export default Home
