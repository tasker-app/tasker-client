import 'react-toastify/dist/ReactToastify.css'

import styled from 'styled-components'

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
const SettingReminderContent = styled.div`
  padding: 40px;
`
const ContentBlock = styled.div``

export const ReminderSetting = () => {
  return (
    <SubscriptionSettingContainer>
      <Header>
        <HeaderContent>
          <Text size={25} type="bold">
            Reminder
          </Text>
        </HeaderContent>
      </Header>
      <SettingReminderContent>
        <ContentBlock></ContentBlock>
      </SettingReminderContent>
    </SubscriptionSettingContainer>
  )
}
