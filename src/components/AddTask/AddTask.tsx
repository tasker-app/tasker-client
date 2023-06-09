import 'react-quill/dist/quill.snow.css'

import { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import styled from 'styled-components'

import { ReactComponent as ClockIcon } from '@/assets/icons/clock.svg'
import { ReactComponent as DefaultFlag } from '@/assets/icons/flag-default.svg'
import { ReactComponent as GreenFlag } from '@/assets/icons/flag-green.svg'
import { ReactComponent as RedFlag } from '@/assets/icons/flag-red.svg'
import { ReactComponent as YellowFlag } from '@/assets/icons/flag-yellow.svg'
import { Text } from '@/components/Common'
import { DatePicker } from '@/components/DatePicker'
import { PRIORITY_LIST } from '@/libs/constant'
import { useTaskStore } from '@/stores'
import { moveToEndOfDate } from '@/utils'

import { SelectPriority } from './SelectPriority'

// #region Styles
const AddTaskContainer = styled.div<{ isCancelAddTask: boolean }>`
  opacity: 1;
  height: fit-content;
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

const TaskDescription = styled.div`
  width: 100%;
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  font-family: 'Regular';

  &:focus {
    outline: none;
  }
  .ql-container.ql-snow {
    border: none;
    .ql-editor {
      padding: 0;
    }
    .ql-editor.ql-blank::before {
      left: 0;
      font-style: normal;
      color: rgba(0, 0, 0, 0.4);
    }
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
  setAddNewTask?: (isAddNewTask: boolean | any) => void
  setIsStatusHidden?: (isStatusHidden: boolean) => void
  handleCancel?: () => void
  addTime?: number
}

type NewTask = {
  name: string
  description: string
  priority: 'default' | 'low' | 'medium' | 'high'
  dueDate: number
}

export const AddTask = ({
  addTime = 0,
  setAddNewTask = () => {},
  setIsStatusHidden = () => {},
  handleCancel = () => {}
}: AddTaskProps) => {
  const [isCancelAddTask, setIsCancelAddTask] = useState(false)
  const [task, setTask] = useState<NewTask>({
    name: '',
    description: '',
    priority: 'default',
    dueDate: new window.Date().getTime()
  })
  const [tasks, addTask] = useTaskStore((state) => [state.tasks, state.addTask])

  const inputNameRef = useRef<HTMLInputElement>(null)
  const addTaskRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (addTime !== 0) {
      setTask((prevTask) => ({ ...prevTask, dueDate: addTime }))
    }
  }, [])
  useEffect(() => {
    inputNameRef.current?.focus()

    return () => {
      setIsCancelAddTask(false)
    }
  }, [tasks])

  const handleAddTask = () => {
    if (isTaskNameEmpty) return null
    const newTask = {
      id: Math.random().toString(36),
      name: task.name,
      description: task.description,
      priority: task.priority,
      dueDate: moveToEndOfDate(task.dueDate)
    }

    addTask(newTask)
    if (addTime !== 0) {
      setTask({
        name: '',
        description: '',
        priority: 'default',
        dueDate: new Date(addTime).getTime()
      })
    } else
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
    handleCancel()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isTaskNameEmpty) {
      handleAddTask()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target) {
        if (addTaskRef.current && !addTaskRef.current.contains(event.target as HTMLElement)) {
          // User clicked outside the AddTask component
          handleCancel()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleCancel])

  return (
    <AddTaskContainer ref={addTaskRef} isCancelAddTask={isCancelAddTask} tabIndex={0}>
      <AddTaskContent>
        <TaskName
          ref={inputNameRef}
          placeholder="Task name"
          type="text"
          value={task.name}
          onChange={(e) => setTask((prevTask) => ({ ...prevTask, name: e.target.value }))}
          onKeyDown={handleKeyDown}
        />
        <TaskDescription>
          <ReactQuill
            formats={[]}
            modules={{
              toolbar: null
            }}
            placeholder="Description"
            theme="snow"
            value={task.description}
            onChange={(value) => setTask((prevTask) => ({ ...prevTask, description: value }))}
          />
        </TaskDescription>
        <TaskProperties>
          <DatePicker
            addTime={addTime}
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
