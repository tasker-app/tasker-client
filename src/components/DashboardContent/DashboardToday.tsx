import { useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as AddIcon } from '@/assets/icons/add.svg'
import { ReactComponent as FilterIcon } from '@/assets/icons/filter.svg'
import { AddTask } from '@/components/AddTask'
import { Text } from '@/components/Common'
import { ViewModal } from '@/components/ViewModal'
import { currentDateFormatted } from '@/utils'

import { DashboardStatus } from './DashboardStatus'
import { ListTask } from './ListTask'

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

const Today = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e1e1e1;
  }
`

const AddTaskButton = styled.button<{ isHidden: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  padding-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  display: ${(props) => (props.isHidden ? 'none' : 'flex')};

  &:hover {
    background-color: #e1e1e1;
  }
`

export const DashboardToday = () => {
  const [addNewTask, setAddNewTask] = useState(false)
  const [isStatusHidden, setIsStatusHidden] = useState(false)
  const [isOpenView, setIsOpenView] = useState(false)

  const handleAddTask = () => {
    setIsStatusHidden(true)
    setAddNewTask(true)
  }

  return (
    <>
      <Flex>
        <Today>
          <Text size={32} type="bold">
            Today
          </Text>
          <Text color="#949494" size={16}>
            {currentDateFormatted()}
          </Text>
        </Today>

        <FilterButton onClick={() => setIsOpenView(true)}>
          <FilterIcon />
          <Text color="#949494" size={16}>
            View
          </Text>
        </FilterButton>
      </Flex>

      <ListTask />

      <AddTaskButton isHidden={addNewTask} onClick={handleAddTask}>
        <AddIcon />
        <Text size={16}>Add your task</Text>
      </AddTaskButton>

      {addNewTask && <AddTask setAddNewTask={setAddNewTask} setIsStatusHidden={setIsStatusHidden} />}
      <DashboardStatus isStatusHidden={isStatusHidden} />
      <ViewModal handleClose={() => setIsOpenView(false)} isOpen={isOpenView} />
    </>
  )
}
