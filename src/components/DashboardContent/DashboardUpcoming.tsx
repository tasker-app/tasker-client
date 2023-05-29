import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as AddIcon } from '@/assets/icons/add.svg'
import { ReactComponent as NextIcon } from '@/assets/icons/next.svg'
import { ReactComponent as PrevIcon } from '@/assets/icons/prev.svg'
import { Text } from '@/components//Common'
import { AddTask } from '@/components/AddTask'
import { TaskPreview } from '@/components/TaskPreview'
import { DatePicker, Week } from '@/components/Upcoming'
import { Task as TaskType } from '@/models/task'
import { useTaskStore } from '@/stores'
import { checkSameDate, fullWordDate, getOffsetFromDate, getWeekDates, monthNames } from '@/utils'

const DateOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
`

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`

const PrevAndNext = styled.div`
  border: 1px solid #94949499;
  border-radius: 8px;
  position: relative;
`

const OptionsButton = styled.button<{ isToday?: number }>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 7px 15px 4px 15px;
  box-sizing: border-box;

  &:first-child {
    border-radius: 7px 0 0 7px;
    transition: background-color 0.2s ease-in-out;
    border-right: 1px solid #94949499;

    &:hover {
      background-color: #a59f9f99;
    }
  }

  &:last-child {
    border-radius: 0 7px 7px 0;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #a59f9f99;
    }
  }

  svg {
    width: 20px;
    height: 20px;
    opacity: ${({ isToday }) => (isToday === 0 ? '0.5' : '1')};
    transition: ${({ isToday }) => (isToday === 0 ? 'none' : 'opacity 0.2s ease-in-out')};
  }
`

const TodayButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 9px 20px;
  box-sizing: border-box;
  border: 1px solid #94949499;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #a59f9f99;
  }
`
const UpcomingContent = styled.div`
  min-width: 100px;
  margin-left: 35px;
  height: calc(${window.innerHeight + 'px'} - 80px - 24px - 24px - 41px - 35px - 60px - 24px);
  overflow-y: scroll;
  overflow-x: hidden;

  &:hover {
    &::-webkit-scrollbar-thumb {
      z-index: 2;
      visibility: visible;
    }
  }
  /* width */
  &::-webkit-scrollbar {
    width: 8px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #bdbdbd;
    z-index: 1;
    visibility: hidden;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #858585;
  }
`
const Time = styled.div`
  margin: 0 0 12px 0;
  padding-bottom: 12px;
  padding-top: 37px;

  border-bottom: 1px solid rgba(148, 148, 148, 0.6);
`
const AddTaskButton = styled.button<{ isHidden: boolean }>`
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  display: ${(props) => (props.isHidden ? 'none' : 'flex')};

  &:hover {
    background-color: #e1e1e1;
  }
`
const UpcomingBlock = styled.div``
const TasksContainer = styled.div`
  padding: 0 15px 0 15px;
`

export const DashboardUpcoming = () => {
  const [offset, setOffset] = useState(0)
  const [addNewTask, setAddNewTask] = useState([false, false, false, false, false, false, false])
  const [selectedDateTime, setSelectedDateTime] = useState<number>(new Date().getTime())
  const weekDates = getWeekDates(new Date(), offset)
  const [tasks] = useTaskStore((state) => [state.tasks])

  const handlePrev = () => {
    if (offset > 0) {
      setOffset((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    setOffset((prev) => prev + 1)
  }

  const handleGoToToday = () => {
    setOffset(0)
    setSelectedDateTime(new Date().getTime())
  }
  const handleAddTask = (index: number) => {
    // setIsStatusHidden(true)
    const updatedAddNewTask = [...addNewTask]

    updatedAddNewTask[index] = true
    setAddNewTask(updatedAddNewTask)
  }

  useEffect(() => {
    setOffset(getOffsetFromDate(selectedDateTime))
  }, [selectedDateTime])

  return (
    <>
      <DateOptions>
        <DatePicker selectedDateTime={selectedDateTime} setSelectedDateTime={setSelectedDateTime} />
        <OptionsContainer>
          <PrevAndNext>
            <OptionsButton isToday={offset} onClick={handlePrev}>
              <PrevIcon />
            </OptionsButton>
            <OptionsButton onClick={handleNext}>
              <NextIcon />
            </OptionsButton>
          </PrevAndNext>
          <TodayButton onClick={handleGoToToday}>Today</TodayButton>
        </OptionsContainer>
      </DateOptions>
      <Week selectedDateTime={selectedDateTime} setSelectedDateTime={setSelectedDateTime} weekDates={weekDates} />
      <UpcomingContent>
        {weekDates.map((date, index) => (
          <UpcomingBlock key={index}>
            <Time>
              <Text size={16}>
                {date.date} {monthNames[date.month]} | {fullWordDate[date.day]}
              </Text>
            </Time>
            <TasksContainer>
              {tasks.map((task: TaskType) => (
                <>
                  {checkSameDate(task.dueDate, date.time) ? (
                    <TaskPreview
                      key={task.id}
                      description={task.description}
                      dueDate={task.dueDate}
                      id={task.id}
                      name={task.name}
                      priority={task.priority}
                    />
                  ) : (
                    ''
                  )}
                </>
              ))}
            </TasksContainer>

            <AddTaskButton isHidden={addNewTask[index]} onClick={() => handleAddTask(index)}>
              <AddIcon />
              <Text size={16}>Add your task</Text>
            </AddTaskButton>
            {addNewTask[index] && <AddTask setAddNewTask={setAddNewTask} setIsStatusHidden={() => {}} />}
          </UpcomingBlock>
        ))}
      </UpcomingContent>
    </>
  )
}
