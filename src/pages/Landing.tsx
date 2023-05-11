import styled from 'styled-components'

import { Button } from '@/components/Button'
import { Text } from '@/components/Common'

const LandingContainer = styled.div`
  font-weight: bold;
`

const Landing = () => {
  return (
    <LandingContainer>
      <Text color="#000" size={12} type="bold">
        Test
      </Text>
      <Button />
    </LandingContainer>
  )
}

export default Landing
