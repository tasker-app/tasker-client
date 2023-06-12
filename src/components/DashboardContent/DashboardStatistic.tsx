import { motion } from 'framer-motion'
import { useState } from 'react'
import styled from 'styled-components'

import { Text } from '@/components/Common'

import { DailyStatistic } from './DailyStatistic'
import { WeeklyStatistic } from './WeeklyStatistic'

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
const StatisticContent = styled.div`
  padding-top: 32px;
  height: calc(100vh - 80px - 24px - 24px - 41px - 35px - 40px);
  position: relative;
  overflow: hidden;
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
const PageContent = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
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
            <RadioInput defaultChecked={selectedOption === 'daily'} name="radio" type="radio" />
            <OptionName>Daily</OptionName>
          </Radio>
          <Radio onClick={() => setSelectedOption('weekly')}>
            <RadioInput defaultChecked={selectedOption === 'weekly'} name="radio" type="radio" />
            <OptionName>Weekly</OptionName>
          </Radio>
        </Option>
        <PageContent
          animate={{ x: selectedOption === 'daily' ? 0 : '-100%' }}
          initial={{ x: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <DailyStatistic />
        </PageContent>
        <PageContent
          animate={{ x: selectedOption === 'weekly' ? 0 : '100%' }}
          initial={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <WeeklyStatistic />
        </PageContent>
      </StatisticContent>
    </>
  )
}
