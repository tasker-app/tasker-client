import { useState } from 'react'
import styled from 'styled-components'

import { DashboardContent } from '@/components/DashboardContent'
import { Header } from '@/components/Header'
import { Nav } from '@/components/Nav'

const DashboardContainer = styled.div``

const Grid = styled.div<{ isExpanded: boolean }>`
  display: grid;
  grid-template-columns: ${(props) => (props.isExpanded ? '40px 1fr' : 'repeat(5, 1fr)')};
  gap: ${(props) => (props.isExpanded ? '0' : '30px')};
  transition: grid-template-columns 0.3s ease-in-out;
`

const Dashboard = () => {
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen)
    setIsExpanded(!isExpanded)
  }

  return (
    <DashboardContainer>
      <Header handleNavToggle={handleNavToggle} />
      <Grid isExpanded={isExpanded}>
        <Nav isNavOpen={isNavOpen} />
        <DashboardContent />
      </Grid>
    </DashboardContainer>
  )
}

export default Dashboard
