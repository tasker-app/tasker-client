import styled from 'styled-components'

import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg'
import { Text } from '@/components/Common'

import { UndoButton } from './UndoButton'

const Container = styled.div`
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
  return (
    <Container>
      <Text color="#fff" size={14}>
        Task Completed
      </Text>
      <UndoButton />
      <CloseButton>
        <CloseIcon />
      </CloseButton>
    </Container>
  )
}
