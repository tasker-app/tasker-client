import { motion } from 'framer-motion'
import parse from 'html-react-parser'
import { useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as DefaultFlag } from '@/assets/icons/flag-default.svg'
import { ReactComponent as GreenFlag } from '@/assets/icons/flag-green.svg'
import { ReactComponent as RedFlag } from '@/assets/icons/flag-red.svg'
import { ReactComponent as YellowFlag } from '@/assets/icons/flag-yellow.svg'
import { Text } from '@/components/Common'
import { useTaskStore } from '@/stores'
import { calculateRemainingDays } from '@/utils'

import { TaskDetailsModal } from '../TaskDetailsModal'
import { Checkbox } from './Checkbox'

const TaskPreviewContainer = styled(motion.div)`
  height: fit-content;
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
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  a {
    color: #787878;

    &:hover {
      color: #0e76c0;
    }
  }
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

type TaskPreviewProps = {
  id: string
  name: string
  description: string
  dueDate: number
  priority: 'low' | 'medium' | 'high' | 'default'
}

const MAPPING_FLAG_ICON = {
  default: <DefaultFlag />,
  low: <GreenFlag />,
  medium: <YellowFlag />,
  high: <RedFlag />
}

const variants = {
  initial: {
    opacity: 1,
    x: 0
  },
  complete: {
    opacity: 0,
    x: 400,
    transition: {
      duration: 0.4
    }
  }
}

export const TaskPreview = ({ id, name, description, priority, dueDate }: TaskPreviewProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [completeTask] = useTaskStore((state) => [state.completeTask])

  const handleCheck = () => {
    setIsCompleted(true)
    setTimeout(() => {
      completeTask(id)
    }, 450)
  }

  const replaceLinks = () => {
    const linkRegex = /(<p>[^<]*?(https?:\/\/[^\s<]+)[^<]*?<\/p>)/g
    const replacedText = description.replace(linkRegex, (match, group1, group2) => {
      return `<p>${group1.replace(
        group2,
        `<a href="${group2}" target="_blank" rel="noopener noreferrer">${group2}</a>`
      )}</p>`
    })

    return replacedText
  }

  return (
    <>
      <TaskPreviewContainer animate={isCompleted ? 'complete' : 'initial'} variants={variants}>
        <CheckContainer onClick={handleCheck}>
          <Checkbox />
        </CheckContainer>
        <ContentContainer
          onClick={(event) => {
            const target = event.target as HTMLElement

            if (!target.closest('a')) {
              setIsOpenModal(true)
            }
          }}
        >
          <Text color="#0F0F0F" size={16} type="bold">
            {name}
          </Text>
          <Text color="#787878" size={14} type="regular">
            {description ? parse(replaceLinks()) : ''}
          </Text>
        </ContentContainer>
        <ContentContainer onClick={() => setIsOpenModal(true)}>
          <Text color="#949494" size={14} type="regular">
            {calculateRemainingDays(dueDate)}
          </Text>
          <Priority>
            {MAPPING_FLAG_ICON[priority as keyof typeof MAPPING_FLAG_ICON]}
            <Text color="#949494" size={14} type="regular">
              {priority}
            </Text>
          </Priority>
        </ContentContainer>
      </TaskPreviewContainer>
      <TaskDetailsModal
        description={description}
        dueDate={dueDate}
        handleClose={() => setIsOpenModal(false)}
        id={id}
        isOpen={isOpenModal}
        name={name}
        priority={priority}
      />
    </>
  )
}
