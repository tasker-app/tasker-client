import styled from 'styled-components'

import { Text } from '@/components/Common'

const Note = styled.div`
  margin-top: 10px;
  margin-left: 4px;
`

const Content = styled.div`
  display: flex;
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: space-between;
`

export const WeeklyStatistic = () => {
  return (
    <>
      <Note>
        <Text color="#787878" size={15}>
          Weekly Statistic
        </Text>
      </Note>

      <Content></Content>
    </>
  )
}
