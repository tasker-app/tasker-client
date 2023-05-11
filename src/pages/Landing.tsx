import styled from 'styled-components'

import { ReactComponent as ChartIcon } from '@/assets/icons/chart.svg'
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
      <ChartIcon />
      <Button />
    </LandingContainer>
  )
}

export default Landing
