import { useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as Checked } from '@/assets/icons/checked.svg'
import { ReactComponent as Diamond } from '@/assets/icons/diamond.svg'
import { Text } from '@/components/Common/Text'
import { SignInButton } from '@/components/SignInButton'

const PricingCardContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
const CardCover = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const Card = styled.div<{ isBuy: boolean }>`
  width: 295px;
  height: 446px;
  background: ${({ isBuy }) =>
    isBuy ? `#E4EEF5` : `linear-gradient(180deg, #93cfdc 0%, rgba(129, 110, 169, 0.2) 100%)`};
  box-shadow: 0px 4px 8px rgba(88, 100, 104, 0.25);
  border-radius: 12px;
  padding: 30px;
  display: grid;
  align-content: space-between;
  justify-content: space-between;
`
const CardContainer = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 15px;
`
const Title = styled.div`
  margin-bottom: 5px;
`
const CardHeader = styled.div`
  text-align: left;
  border-bottom: 1px solid #787878;
`
const Price = styled.div`
  margin-top: 10px;
`
const HeaderContent = styled.div`
  margin-bottom: 24px;
`
const CardContent = styled.div`
  margin-top: 16px;
  text-align: left;
`
const ContentContainer = styled.div`
  display: grid;
  gap: 18px;
  margin-top: 21px;
`
const Content = styled.div`
  display: flex;
  align-items: center;
`
const CheckedStyled = styled(Checked)`
  margin-right: 11px;
`
const CardTitle = styled.div`
  align-items: center;
  display: flex;
`
const DiamondStyled = styled(Diamond)`
  margin-left: 10px;
`
const ButtonBlock = styled.div``

export const PricingCard = () => {
  const [isBuyFree, setIsBuyFree] = useState(false)
  const [isBuyPremium, setIsBuyPremium] = useState(false)
  const freePackage = {
    price: 0,
    content: ['Personal task manager', 'Tracking task as calendar', 'Statistic about your productivity']
  }
  const payPackage = {
    price: 2.99,
    content: [
      'Personal task manager',
      'Tracking task as calendar',
      'Statistic about your productivity',
      'Task manager for team',
      'Personal Reminder via your email',
      'All time support from Tasker team'
    ]
  }

  return (
    <PricingCardContainer>
      <CardCover>
        <Title>
          <Text size={32} type="bold">
            What special deal we offer for you
          </Text>
        </Title>
        <Text color="#787878" size={16} type="regular">
          Upgrade to the premium plan and get more productivity
        </Text>

        <CardContainer>
          <Card isBuy={isBuyFree || isBuyPremium}>
            <div style={{ width: 'inherit' }}>
              <CardHeader>
                <HeaderContent>
                  <CardTitle>
                    <Text size={25} type="bold">
                      Free plan
                    </Text>
                  </CardTitle>
                  <Price>
                    <Text color="#787878" size={50}>
                      {freePackage.price}$
                    </Text>
                    <Text color="#787878" size={30}>
                      {' / month'}
                    </Text>
                  </Price>
                </HeaderContent>
              </CardHeader>
              <CardContent>
                <Text color="#33363F" size={20}>
                  You will get:
                </Text>
                <ContentContainer>
                  {freePackage.content.map((content, index) => (
                    <Content key={index}>
                      <CheckedStyled />
                      <Text color="#33363F" size={15}>
                        {content}
                      </Text>
                    </Content>
                  ))}
                </ContentContainer>
              </CardContent>
            </div>
            <ButtonBlock>
              {isBuyFree ? (
                <SignInButton disabled={true} height="35px" width="201.36px" onClick={() => setIsBuyFree(true)}>
                  {isBuyPremium ? 'Be premium' : 'You’re currently here'}
                </SignInButton>
              ) : (
                <SignInButton disabled={isBuyPremium} height="35px" width="201.36px" onClick={() => setIsBuyFree(true)}>
                  Be premium
                </SignInButton>
              )}
            </ButtonBlock>
          </Card>
          <Card isBuy={isBuyPremium}>
            <div style={{ width: 'inherit' }}>
              <CardHeader>
                <HeaderContent>
                  <CardTitle>
                    <Text size={25} type="bold">
                      Premium plan
                    </Text>
                    <DiamondStyled />
                  </CardTitle>
                  <Price>
                    <Text color="#3E3E3E" size={50}>
                      {payPackage.price}$
                    </Text>
                    <Text color="#3E3E3E" size={30}>
                      {' / month'}
                    </Text>
                  </Price>
                </HeaderContent>
              </CardHeader>
              <CardContent>
                <Text color="#33363F" size={20}>
                  You will get:
                </Text>
                <ContentContainer>
                  {payPackage.content.map((content, index) => (
                    <Content key={index}>
                      <CheckedStyled />
                      <Text color="#33363F" size={15}>
                        {content}
                      </Text>
                    </Content>
                  ))}
                </ContentContainer>
              </CardContent>
            </div>
            <ButtonBlock>
              {isBuyPremium ? (
                <SignInButton disabled={true} height="35px" width="201.36px" onClick={() => setIsBuyPremium(true)}>
                  You’re currently here
                </SignInButton>
              ) : (
                <SignInButton disabled={false} height="35px" width="201.36px" onClick={() => setIsBuyPremium(true)}>
                  Be premium
                </SignInButton>
              )}
            </ButtonBlock>
          </Card>
        </CardContainer>
      </CardCover>
    </PricingCardContainer>
  )
}
