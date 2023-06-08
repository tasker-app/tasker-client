import styled from 'styled-components'

import { ReactComponent as FireIcon } from '@/assets/icons/fire.svg'
import { ReactComponent as GoalIcon } from '@/assets/icons/goal.svg'
import { Text } from '@/components/Common'

import { StatictisCircle } from './StatisticCircle'

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
const Statistic = styled.div`
  height: fit-content;
  display: grid;
  justify-items: center;
`
const StaticText = styled.div`
  text-align: center;
  margin-top: 20px;
  line-height: 1.5;
`
const EditGoal = styled.div`
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    text-decoration-color: #b95a5a;
  }
`

export const DailyStatistic = () => {
  return (
    <>
      <Note>
        <Text color="#787878" size={15}>
          5 completed tasks today
        </Text>
      </Note>

      <Content>
        <Statistic>
          <StatictisCircle completedWorkload={0} iconSize={55} totalWorkload={100}>
            <FireIcon height={55} width={55} />
          </StatictisCircle>
          <StaticText>
            <Text color="#787878" size={15}>
              Daily goal completed:<span style={{ color: 'black', fontWeight: 700 }}> 5/5</span>
            </Text>
            <br />
            <Text color="#787878" size={15}>
              All of today tasks is easy for you, Toan
            </Text>
            <EditGoal>
              <Text color="#B95A5A" size={15}>
                Edit your daily goal
              </Text>
            </EditGoal>
          </StaticText>
        </Statistic>
        <Statistic>
          <StatictisCircle completedWorkload={100} iconSize={75} totalWorkload={100}>
            <GoalIcon height={75} width={75} />
          </StatictisCircle>
          <StaticText>
            <Text color="#787878" size={15}>
              You’ve completed your goal: 2 days in a row
            </Text>
            <br />
            <Text color="#787878" size={15}>
              30 May 2023 - 31 May 2023
            </Text>
          </StaticText>
        </Statistic>
      </Content>
    </>
  )
}
