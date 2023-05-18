import { useState } from 'react'
import { FacebookShareButton } from 'react-share'
import styled from 'styled-components'

import { ReactComponent as AddIcon } from '@/assets/icons/add.svg'
import { ReactComponent as FilterIcon } from '@/assets/icons/filter.svg'
import ChairBackgroundImage from '@/assets/images/ChairBackgroundImage.webp'
import { AddTask } from '@/components/AddTask'
import { Text } from '@/components/Common'
import { TaskPreview } from '@/components/TaskPreview'
import { ViewModal } from '@/components/ViewModal'
import { DAYS_OF_WEEK, MONTHS } from '@/libs/constant'

const DashboardContentContainer = styled.section<{ isNavOpen: boolean }>`
  width: ${(props) => (props.isNavOpen ? 'calc(100vw - 120px - 300px)' : 'calc(100vw - 80px)')};
  margin: 24px auto;
  box-sizing: border-box;
  transition: width 0.2s ease-in-out;
`

const Content = styled.div`
  width: 100%;
`

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

const Center = styled.div<{ isHidden: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  display: ${(props) => (props.isHidden ? 'none' : 'flex')};
`

const ImageBackground = styled.div`
  width: 400px;
  height: 270px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ShareButton = styled.div`
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

type DashboardContentProps = {
  isNavOpen: boolean
}

export const DashboardContent = ({ isNavOpen }: DashboardContentProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [addNewTask, setAddNewTask] = useState(false)

  const currentDateFormatted = () => {
    const currentDate = new Date()

    const dayOfWeek = DAYS_OF_WEEK[currentDate.getDay()]
    const day = currentDate.getDate()
    const month = MONTHS[currentDate.getMonth()]

    return `${dayOfWeek} ${day} ${month}`
  }

  return (
    <DashboardContentContainer isNavOpen={isNavOpen}>
      <Content>
        <Flex>
          <Today>
            <Text size={32} type="bold">
              Today
            </Text>
            <Text color="#949494" size={16}>
              {currentDateFormatted()}
            </Text>
          </Today>

          <FilterButton onClick={() => setIsOpen(true)}>
            <FilterIcon />
            <Text color="#949494" size={16}>
              View
            </Text>
          </FilterButton>
        </Flex>

        <TaskPreview description="Cardio and weight" dueDate={1685059199000} name="Doing exercise" priority="high" />

        <AddTaskButton isHidden={addNewTask} onClick={() => setAddNewTask(true)}>
          <AddIcon />
          <Text size={16}>Add your task</Text>
        </AddTaskButton>

        {addNewTask && <AddTask />}
        <Center isHidden={addNewTask}>
          <ImageBackground>
            <img alt="background" loading="lazy" src={ChairBackgroundImage} />
          </ImageBackground>

          <Text size={20} type="bold">
            Enjoy your day, Toan.
          </Text>

          <Text color="#949494" size={16}>
            Today you completed 20 tasks. Share your awesomeness to friend
          </Text>

          <FacebookShareButton hashtag={'#Xem task tui ne'} url={'https://www.youtube.com/watch?v=niPkap1ozUA'}>
            <ShareButton>
              <Text color="#69B578" size={16}>
                Share #TaskerComplete
              </Text>
            </ShareButton>
          </FacebookShareButton>
        </Center>
      </Content>
      <ViewModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />
    </DashboardContentContainer>
  )
}
