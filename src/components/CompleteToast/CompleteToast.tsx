import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg'
import { Text } from '@/components/Common'
import { useTaskStore } from '@/stores'

import { UndoButton } from './UndoButton'

const Container = styled(motion.div)`
  width: 200px;
  height: 48px;
  background: #262626;
  box-shadow: 0px 5px 9px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  padding: 0 16px;

  position: absolute;
  right: 60px;
  bottom: 32px;

  display: grid;
  grid-template-columns: 113px 68px 1fr;
  align-items: center;
`

const CloseButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  &:hover {
    background: #4d4949;
  }

  svg {
    width: 40px;
    height: 40px;
    filter: brightness(0) saturate(100%) invert(100%) sepia(1%) saturate(116%) hue-rotate(169deg) brightness(113%)
      contrast(88%);
  }
`

export const CompleteToast = () => {
  const [completedTasks, undo] = useTaskStore((state) => [state.completedTasks, state.undo])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (completedTasks.length > 0) {
      if (!isOpen) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
        setTimeout(() => {
          setIsOpen(true)
        }, 200)
      }
    } else {
      setIsOpen(false)
    }
  }, [completedTasks])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isOpen])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Container animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} initial={{ opacity: 0, y: 40 }}>
          <Text color="#fff" size={14}>
            Task Completed
          </Text>
          <UndoButton handleClick={undo} />
          <CloseButton onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </CloseButton>
        </Container>
      )}
    </AnimatePresence>,
    document.getElementById('portal-toast') as HTMLElement
  )
}
