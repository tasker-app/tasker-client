import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as ClockIcon } from '@/assets/icons/clock.svg'
import { ReactComponent as DefaultFlag } from '@/assets/icons/flag-default.svg'
import { ReactComponent as GreenFlag } from '@/assets/icons/flag-green.svg'
import { ReactComponent as RedFlag } from '@/assets/icons/flag-red.svg'
import { ReactComponent as YellowFlag } from '@/assets/icons/flag-yellow.svg'
import { Text } from '@/components/Common'
import { DatePicker } from '@/components/DatePicker'
import { PRIORITY_LIST } from '@/libs/constant'
import { Task as TaskType } from '@/models/task'
import { moveToEndOfDate } from '@/utils'

import { SelectPriority } from './SelectPriority'

// #region Styles
const AddTaskContainer = styled.div<{ isCancelAddTask: boolean }>`
  height: 190px;
  border: 1px solid rgba(148, 148, 148, 0.8);
  border-radius: 12px;
  padding: 15px 40px 18px 27px;
  box-sizing: border-box;
  margin-top: 40px;
  display: ${(props) => (props.isCancelAddTask ? 'none' : 'block')};
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

const Button = styled.button<{ isTaskNameEmpty?: boolean }>`
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
    opacity: ${(props) => (props.isTaskNameEmpty ? 0.5 : 1)};
    cursor: ${(props) => (props.isTaskNameEmpty ? 'not-allowed' : 'pointer')};
    transition: opacity 0.3s ease-in-out;

    &:hover {
      background: linear-gradient(180deg, rgba(119, 179, 223, 0.8) 0%, rgba(66, 208, 227, 0.5) 100%);
    }
  }
`
// #endregion

const MAPPING_FLAG_ICON = {
  default: <DefaultFlag />,
  low: <GreenFlag />,
  medium: <YellowFlag />,
  high: <RedFlag />
}

type AddTaskProps = {
  setAddNewTask: (isAddNewTask: boolean) => void
  setIsStatusHidden: (isStatusHidden: boolean) => void
  setTasks: (tasks: TaskType[]) => void
  tasks: TaskType[]
}

type NewTask = {
  name: string
  description: string
  priority: 'default' | 'low' | 'medium' | 'high'
  dueDate: number
}

export const AddTask = ({ setAddNewTask, setTasks, tasks, setIsStatusHidden }: AddTaskProps) => {
  const [isCancelAddTask, setIsCancelAddTask] = useState(false)
  const [task, setTask] = useState<NewTask>({
    name: '',
    description: '',
    priority: 'default',
    dueDate: new window.Date().getTime()
  })

  const inputNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputNameRef.current?.focus()

    return () => {
      setIsCancelAddTask(false)
    }
  }, [tasks])

  const handleAddTask = () => {
    if (isTaskNameEmpty) return null

    const newTask = {
      id: tasks.length + 1,
      name: task.name,
      description: task.description,
      priority: task.priority,
      dueDate: moveToEndOfDate(task.dueDate)
    }

    const newTasks = [...tasks, newTask]

    setTasks(newTasks)
    setTask({
      name: '',
      description: '',
      priority: 'default',
      dueDate: new Date().getTime()
    })
  }

  const isTaskNameEmpty = task.name.trim() === ''

  const handleCancelAddTask = () => {
    setIsCancelAddTask(true)
    setAddNewTask(false)
    setIsStatusHidden(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isTaskNameEmpty) {
      handleAddTask()
    }
  }

  return (
    <AddTaskContainer isCancelAddTask={isCancelAddTask} tabIndex={0} onKeyDown={handleKeyDown}>
      <AddTaskContent>
        <TaskName
          ref={inputNameRef}
          placeholder="Task name"
          type="text"
          value={task.name}
          onChange={(e) => setTask((prevTask) => ({ ...prevTask, name: e.target.value }))}
          onKeyDown={handleKeyDown}
        />
        <TaskDescription
          placeholder="Description"
          type="text"
          value={task.description}
          onChange={(e) => setTask((prevTask) => ({ ...prevTask, description: e.target.value }))}
        />
        <TaskProperties>
          <DatePicker
            dueDate={task.dueDate}
            setDueDate={(dueDate) => setTask((prevTask) => ({ ...prevTask, dueDate }))}
          />
          <SelectPriority
            list={PRIORITY_LIST}
            setValue={(priority) => setTask((prevTask) => ({ ...prevTask, priority }))}
            value={task.priority}
          >
            <TaskPropertiesButton>
              {MAPPING_FLAG_ICON[task.priority as keyof typeof MAPPING_FLAG_ICON]}
              <Text color="#949494">{PRIORITY_LIST.find((item) => item.value === task.priority)?.label}</Text>
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
          <Button onClick={() => handleCancelAddTask()}>
            <Text>Cancel</Text>
          </Button>
          <Button isTaskNameEmpty={isTaskNameEmpty} onClick={handleAddTask}>
            <Text>Add Task</Text>
          </Button>
        </ButtonFlex>
      </AddTaskContent>
    </AddTaskContainer>
  )
}
