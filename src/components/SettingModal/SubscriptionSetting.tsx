import 'react-toastify/dist/ReactToastify.css'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as StarIcon } from '@/assets/icons/star.svg'
import { Text } from '@/components/Common/Text'
const SubscriptionSettingContainer = styled.div``
const Header = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 1px solid rgba(148, 148, 148, 0.6);
`
const HeaderContent = styled.div`
  margin: 24px 0 15px 40px;
`
const SettingSubscriptionContent = styled.div`
  padding: 40px;
`
const ContentBlock = styled.div``
const Plan = styled.div`
  margin-bottom: 25px;
`
const Title = styled.div``
const PlanContent = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`

const Upgrade = styled.div`
  align-items: center;
  display: grid;
  gap: 5px;
  a:-webkit-any-link {
    text-decoration: none;
  }
`
const Notice = styled.div`
  margin: 12px 0 10px 0;
`

const Button = styled.button`
  width: 180px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(180deg, #6fb9e3 0%, rgba(137, 125, 208, 0.43) 100%);
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
    transform: scale(1.05);
  }
`

type SubscriptionSettingProps = {
  setIsSwitchTab: (isSwitchTab: boolean) => void
}
export const SubscriptionSetting = ({ setIsSwitchTab }: SubscriptionSettingProps) => {
  useEffect(() => {
    setIsSwitchTab(false)
  }, [])

  return (
    <SubscriptionSettingContainer>
      <Header>
        <HeaderContent>
          <Text size={25} type="bold">
            Subscription
          </Text>
        </HeaderContent>
      </Header>
      <SettingSubscriptionContent>
        <ContentBlock>
          <Plan>
            <Title>
              <Text size={17} type="bold">
                Your plan
              </Text>
            </Title>
            <PlanContent>
              <Upgrade>
                <Notice>
                  <Text color="#787878" size={12}>
                    You are on the Free Plan now. Upgrade to Premium for take all advantages of Tasker just with
                    2.99$/month
                  </Text>
                </Notice>
                <Link to="/pricing">
                  <Button>
                    <StarIcon />
                    <Text size={12}>Upgrade to Premium</Text>
                  </Button>
                </Link>
              </Upgrade>
            </PlanContent>
          </Plan>
        </ContentBlock>
      </SettingSubscriptionContent>
    </SubscriptionSettingContainer>
  )
}
