import styled from 'styled-components'

import { Button } from '@/components/Button'

const LandingContainer = styled.div`
  font-weight: bold;
`

const Landing = () => {
  return (
    <LandingContainer>
      Landing
      <Button />
    </LandingContainer>
  )
}

export default Landing
