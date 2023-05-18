import { useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as ClockIcon } from '@/assets/icons/clock.svg'
import { ReactComponent as DefaultFlag } from '@/assets/icons/flag-default.svg'
import { ReactComponent as GreenFlag } from '@/assets/icons/flag-green.svg'
import { ReactComponent as RedFlag } from '@/assets/icons/flag-red.svg'
import { ReactComponent as YellowFlag } from '@/assets/icons/flag-yellow.svg'
import { Text } from '@/components/Common'
import { DatePicker } from '@/components/DatePicker'
import { PRIORITY_LIST } from '@/libs/constant'

import { SelectPriority } from './SelectPriority'

const AddTaskContainer = styled.div`
  height: 190px;
  border: 1px solid rgba(148, 148, 148, 0.8);
  border-radius: 12px;
  padding: 15px 40px 18px 27px;
  box-sizing: border-box;
  margin-top: 40px;
`

const AddTaskContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const TaskName = styled.input`
  width: 100%;
  border: none;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  font-family: 'Regular';

  &:focus {
    outline: none;
  }
`

const TaskDescription = styled.input`
  width: 100%;
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  font-family: 'Regular';

  &:focus {
    outline: none;
  }
`

const TaskProperties = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const TaskPropertiesButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f9f8f8;
  border: 1px solid rgba(120, 120, 120, 0.5);
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f1f1f1;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

const PremiumLabel = styled.div`
  margin: 0 auto;
  background-color: #faead1;
  padding: 4px 10px 5px 10px;
  border-radius: 4px;
  box-sizing: border-box;
`

const ButtonFlex = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: #efefef;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e1e1e1;
  }

  &:last-child {
    background: linear-gradient(180deg, rgba(119, 179, 223, 0.5) 0%, rgba(66, 208, 227, 0.255) 100%);
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background: linear-gradient(180deg, rgba(119, 179, 223, 0.8) 0%, rgba(66, 208, 227, 0.5) 100%);
    }
  }
`

const MAPPING_FLAG_ICON = {
  default: <DefaultFlag />,
  low: <GreenFlag />,
  medium: <YellowFlag />,
  high: <RedFlag />
}

export const AddTask = () => {
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [priority, setPriority] = useState('default')

  return (
    <AddTaskContainer>
      <AddTaskContent>
        <TaskName placeholder="Task name" type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <TaskDescription
          placeholder="Description"
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <TaskProperties>
          <DatePicker />
          <SelectPriority list={PRIORITY_LIST} setValue={setPriority} value={priority}>
            <TaskPropertiesButton>
              {MAPPING_FLAG_ICON[priority as keyof typeof MAPPING_FLAG_ICON]}
              <Text color="#949494">{PRIORITY_LIST.find((item) => item.value === priority)?.label}</Text>
            </TaskPropertiesButton>
          </SelectPriority>
          <TaskPropertiesButton>
            <ClockIcon />
            <Text color="#949494">Reminder</Text>
            <PremiumLabel>
              <Text color="#8F4700" size={10} type="bold">
                PREMIUM ONLY
              </Text>
            </PremiumLabel>
          </TaskPropertiesButton>
        </TaskProperties>
        <ButtonFlex>
          <Button>
            <Text>Cancel</Text>
          </Button>
          <Button>
            <Text>Add Task</Text>
          </Button>
        </ButtonFlex>
      </AddTaskContent>
    </AddTaskContainer>
  )
}
