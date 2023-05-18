import styled from 'styled-components'

import HeartImage from '@/assets/images/HeartImage.webp'
import StarImage from '@/assets/images/StarImage.webp'
import { AuthHeader } from '@/components/AuthHeader'
import { PricingCard } from '@/components/PricingCard'

const PricingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  .heart-image {
    width: 300px;
    position: fixed;
    right: 0;
    bottom: 80px;
  }
  .star-image {
    width: 300px;
    position: fixed;
    left: 0;
    bottom: 0;
  }
`

const Pricing = () => {
  return (
    <PricingContainer>
      <AuthHeader />
      <PricingCard />
      <img alt="Sign in Illustration" className="star-image" src={StarImage} />
      <img alt="Sign in Illustration" className="heart-image" src={HeartImage} />
    </PricingContainer>
  )
}

export default Pricing
