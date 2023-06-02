import { useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as FireIcon } from '@/assets/icons/fire.svg'
import { ReactComponent as GoalIcon } from '@/assets/icons/goal.svg'
import { Text } from '@/components/Common'

import { StatictisCircle } from './StatisticCircle'

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
const StatisticContent = styled.div`
  padding-top: 32px;
  height: calc(100vh - 80px - 24px - 24px - 41px - 35px - 60px - 58px);
  position: relative;
`
const Option = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-radius: 20px;
  background-color: #eee;
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 4.5px;
  width: 226px;
  height: 45px;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;

  input:checked + span {
    background-color: #fff;
    font-weight: 600;
  }
`
const Radio = styled.label`
  flex: 1 1 auto;
  text-align: center;
`
const RadioInput = styled.input`
  display: none;
`
const OptionName = styled.span`
  height: 20px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: none;
  padding: 0.5rem 0;
  color: #000000;
  transition: background-color 0.3s ease-in-out;

  input:checked + & {
    background-color: #fff;
    font-weight: 600;
  }
`
const Note = styled.div`
  margin-top: 10px;
  margin-left: 4px;
`

const Content = styled.div`
  display: flex;
  width: 80%;
  margin-top: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: space-between;
`
const Statistic = styled.div`
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

export const DashboardStatistic = () => {
  const [selectedOption, setSelectedOption] = useState('daily')

  return (
    <>
      <Title>
        <Text size={32} type="bold">
          Statistic
        </Text>
      </Title>
      <StatisticContent>
        <Option>
          <Radio onClick={() => setSelectedOption('daily')}>
            <RadioInput checked={selectedOption === 'daily'} name="radio" type="radio" />
            <OptionName>Daily</OptionName>
          </Radio>
          <Radio onClick={() => setSelectedOption('weekly')}>
            <RadioInput checked={selectedOption === 'weekly'} name="radio" type="radio" />
            <OptionName>Weekly</OptionName>
          </Radio>
        </Option>
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
      </StatisticContent>
    </>
  )
}
