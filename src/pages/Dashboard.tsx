import { useState } from 'react'
import styled from 'styled-components'

import { DashboardContent } from '@/components/DashboardContent'
import { Header } from '@/components/Header'
import { Nav } from '@/components/Nav'

const DashboardContainer = styled.div``

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;

  height: calc(100vh - 132px); // 132px = 60px (header) + 72px (space)
  margin: 24px auto;
  width: calc(100vw - 80px); // 80px (space)
`

const Dashboard = () => {
  const [isNavOpen, setIsNavOpen] = useState(true)

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <DashboardContainer>
      <Header handleNavToggle={handleNavToggle} />
      <Grid>
        <Nav isNavOpen={isNavOpen} />
        <DashboardContent isNavOpen={isNavOpen} />
      </Grid>
    </DashboardContainer>
  )
}

export default Dashboard
