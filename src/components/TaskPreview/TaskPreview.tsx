import { useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as DefaultFlag } from '@/assets/icons/flag-default.svg'
import { ReactComponent as GreenFlag } from '@/assets/icons/flag-green.svg'
import { ReactComponent as RedFlag } from '@/assets/icons/flag-red.svg'
import { ReactComponent as YellowFlag } from '@/assets/icons/flag-yellow.svg'
import { Text } from '@/components/Common'
import { calculateRemainingDays } from '@/utils'

import { TaskDetailsModal } from '../TaskDetailsModal'
import { Checkbox } from './Checkbox'

const TaskPreviewContainer = styled.div`
  height: 60px;
  margin-top: 24px;
  display: grid;
  grid-template-columns: 40px 1fr 92px;
  border-bottom: 1px solid rgba(189, 185, 185, 0.6);
  cursor: pointer;
`

const CheckContainer = styled.div`
  display: flex;
  justify-content: center;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
`

const Priority = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  opacity: 0.8;
  user-select: none;

  span {
    text-transform: capitalize;
  }
`

type TaskProps = {
  name: string
  description: string
  dueDate: number
  priority: 'low' | 'medium' | 'high' | 'default'
}

type TaskPreviewProps = {
  name: string
  description: string
  dueDate: number
  priority: 'low' | 'medium' | 'high' | 'default'
  deleteTask: () => void
}

const MAPPING_FLAG_ICON = {
  default: <DefaultFlag />,
  low: <GreenFlag />,
  medium: <YellowFlag />,
  high: <RedFlag />
}

export const TaskPreview = ({ name, description, priority, dueDate, deleteTask }: TaskPreviewProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [task, setTask] = useState<TaskProps>({
    name: name,
    description: description,
    priority: priority,
    dueDate: dueDate
  })

  return (
    <>
      <TaskPreviewContainer>
        <CheckContainer>
          <Checkbox />
        </CheckContainer>
        <ContentContainer onClick={() => setIsOpenModal(true)}>
          <Text color="#0F0F0F" size={16} type="bold">
            {task.name}
          </Text>
          <Text color="#787878" size={14} type="regular">
            {task.description}
          </Text>
        </ContentContainer>
        <ContentContainer onClick={() => setIsOpenModal(true)}>
          <Text color="#949494" size={14} type="regular">
            {calculateRemainingDays(task.dueDate)}
          </Text>
          <Priority>
            {MAPPING_FLAG_ICON[task.priority as keyof typeof MAPPING_FLAG_ICON]}
            <Text color="#949494" size={14} type="regular">
              {task.priority}
            </Text>
          </Priority>
        </ContentContainer>
      </TaskPreviewContainer>
      <TaskDetailsModal
        deleteTask={deleteTask}
        description={task.description}
        dueDate={task.dueDate}
        handleClose={() => setIsOpenModal(false)}
        isOpen={isOpenModal}
        name={task.name}
        priority={task.priority}
        setUpdateTask={setTask}
      />
    </>
  )
}
