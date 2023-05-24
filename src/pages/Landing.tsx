import styled, { keyframes } from 'styled-components'

import { ReactComponent as Right } from '@/assets/icons/arrow-right.svg'
import Facebook from '@/assets/images/Facebook.webp'
import Laptop from '@/assets/images/Laptop.webp'
import ProductHunt from '@/assets/images/ProductHunt.webp'
import Twitter from '@/assets/images/Twitter.webp'
import { AuthHeader } from '@/components/AuthHeader'
import { Text } from '@/components/Common'

const Page = styled.div`
  height: 100dvh;
  width: 100vw;
  user-select: none;
`

const Gradient = keyframes`
	0% {
		background-position: 0% 50%;
	}
  25% {
    background-position: 50% 50%;
  }
	50% {
		background-position: 100% 50%;
	}
  75% {
    background-position: 50% 50%;
  }
	100% {
		background-position: 0% 50%;
	}
`

const Hero = styled.section`
  width: calc(100vw - 40px);
  height: 60%;
  background: linear-gradient(
    94.59deg,
    #c0d1e1 3.24%,
    rgba(38, 105, 167, 0.494173) 35.34%,
    rgba(48, 33, 137, 0.48) 76.68%,
    rgba(186, 112, 204, 0.51) 96.62%
  );
  background-size: 200% 200%;
  box-shadow: 0px 4px 20px rgba(169, 92, 216, 0.25);
  animation: ${Gradient} 15s ease infinite;
  border-radius: 20px;

  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`

const Image = styled.div``

const Meet = styled.section`
  position: absolute;
  top: calc(80px + 60% + 52px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`

const Contact = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-left: 8px;
  align-items: center;

  img {
    width: 30%;
    filter: saturate(0.2);
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      filter: saturate(1);
      scale: 1.03;
    }
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  span:first-child {
    line-height: 1.2;
  }

  span:nth-child(2) {
    line-height: 1.5;
  }
`

const Button = styled.button`
  border: none;
  outline: none;
  width: 180px;
  height: 38px;
  background: linear-gradient(180deg, rgba(142, 115, 198, 0.44) 0%, rgba(53, 242, 254, 0.4) 100%, #541c1c 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  svg {
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    svg {
      transform: translateX(3px);
    }
  }
`

const Landing = () => {
  return (
    <Page>
      <AuthHeader />
      <Hero>
        <Image>
          <img alt="Laptop" src={Laptop} />
        </Image>
        <Content>
          <Text color="#08212F" size={40} type="bold">
            Your ultimate daily task <br /> manager for productivity
          </Text>
          <Text color="#5A586F" size={14} type="regular">
            Streamline your daily tasks, boost productivity, and seize the day with <br /> Maximize Your Day: The
            Ultimate Productivity Task Manager. <br />
            Effortlessly stay organized, accomplish more, and unlock your full potential
          </Text>
          <Button>
            <Right />
            <Text color="#1D3122" size={14}>
              Start organizing
            </Text>
          </Button>
        </Content>
      </Hero>
      <Meet>
        <Text color="#1E2021" size={16} type="bold">
          Meet Us @
        </Text>
        <Contact>
          <img alt="Facebook" src={Facebook} />
          <img alt="Twitter" src={Twitter} />
          <img alt="Product Hunt" src={ProductHunt} />
        </Contact>
      </Meet>
    </Page>
  )
}

export default Landing
