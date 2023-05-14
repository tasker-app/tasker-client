import { useState } from 'react'
import styled from 'styled-components'

import { Header } from '@/components/Header'
import { Nav } from '@/components/Nav'

const LandingContainer = styled.div``

const Landing = () => {
  const [isNavOpen, setIsNavOpen] = useState(true)

  return (
    <LandingContainer>
      <Header handleNavToggle={() => setIsNavOpen(!isNavOpen)} />
      <Nav isNavOpen={isNavOpen} />
    </LandingContainer>
  )
}

export default Landing
