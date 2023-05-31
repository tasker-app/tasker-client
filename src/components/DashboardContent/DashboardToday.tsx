import { useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as AddIcon } from '@/assets/icons/add.svg'
import { ReactComponent as ArrowDownIcon } from '@/assets/icons/arrow-down.svg'
import { ReactComponent as ArrowUpIcon } from '@/assets/icons/arrow-up.svg'
import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg'
import { ReactComponent as FilterIcon } from '@/assets/icons/filter.svg'
import { AddTask } from '@/components/AddTask'
import { CustomTooltip, Text } from '@/components/Common'
import { ViewModal } from '@/components/ViewModal'
import { useFilterStore } from '@/stores'
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

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 45px;
`

const FilterText = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const OrderingButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 5px;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
  }
`

const SortedBy = styled.span`
  text-transform: capitalize;
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

const TodayContent = styled.div`
  height: calc(100vh - 80px - 48px - 42px - 52px);
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
  const [
    selectedSorting,
    selectedOrdering,
    selectedPriority,
    setSelectedOrdering,
    setSelectedSorting,
    setSelectedPriority
  ] = useFilterStore((state) => [
    state.selectedSorting,
    state.selectedOrdering,
    state.selectedPriority,
    state.setSelectedOrdering,
    state.setSelectedSorting,
    state.setSelectedPriority
  ])

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

        <FilterContainer>
          {selectedSorting !== 'default' && (
            <FilterText>
              <CustomTooltip content="Reverse order">
                {selectedOrdering === 'ascending' ? (
                  <OrderingButton onClick={() => setSelectedOrdering('descending')}>
                    <ArrowDownIcon />
                  </OrderingButton>
                ) : (
                  <OrderingButton onClick={() => setSelectedOrdering('ascending')}>
                    <ArrowUpIcon />
                  </OrderingButton>
                )}
              </CustomTooltip>
              <Text size={16}>
                Sorted by <SortedBy>{`${selectedSorting}`}</SortedBy>
              </Text>
              <CustomTooltip content="Reset sorting">
                <OrderingButton
                  onClick={() => {
                    setSelectedOrdering('ascending')
                    setSelectedSorting('default')
                  }}
                >
                  <CloseIcon />
                </OrderingButton>
              </CustomTooltip>
            </FilterText>
          )}

          {selectedPriority !== 'default' && (
            <FilterText>
              <Text size={16}>
                Filtered by <SortedBy>{`${selectedPriority}`}</SortedBy>
              </Text>
              <CustomTooltip content="Reset filter">
                <OrderingButton onClick={() => setSelectedPriority('default')}>
                  <CloseIcon />
                </OrderingButton>
              </CustomTooltip>
            </FilterText>
          )}

          <FilterButton onClick={() => setIsOpenView(true)}>
            <FilterIcon />
            <Text color="#949494" size={16}>
              View
            </Text>
          </FilterButton>
        </FilterContainer>
      </Flex>

      <TodayContent>
        <ListTask />
        <AddTaskButton isHidden={addNewTask} onClick={handleAddTask}>
          <AddIcon />
          <Text size={16}>Add your task</Text>
        </AddTaskButton>
        {addNewTask && <AddTask setAddNewTask={setAddNewTask} setIsStatusHidden={setIsStatusHidden} />}
        <DashboardStatus isStatusHidden={isStatusHidden} />
      </TodayContent>
      <ViewModal handleClose={() => setIsOpenView(false)} isOpen={isOpenView} />
    </>
  )
}
