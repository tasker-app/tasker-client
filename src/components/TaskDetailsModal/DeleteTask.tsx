import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { Text } from '@/components/Common'

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(32, 31, 31, 0.4);
`

const ModalWrapper = styled.div<{ isOpen: boolean }>`
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
  position: fixed;
  width: 30%;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 7px 5px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
`

const ModalContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 24px;
  box-sizing: border-box;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 8px;
  box-sizing: border-box;
  transition: background-color 0.2s ease-in-out;

  &:first-child {
    background-color: #efefef;

    &:hover {
      background-color: #e3e3e3;
    }
  }

  &:last-child {
    background-color: #96312c;

    &:hover {
      background-color: #be2727;
    }
  }
`

type DeleteTaskProps = {
  isOpen: boolean
  handleClose: () => void
  deleteTask: () => void
}

export const DeleteTask = ({ isOpen, handleClose, deleteTask }: DeleteTaskProps) => {
  if (!isOpen) return null

  return createPortal(
    <>
      <ModalOverlay isOpen={isOpen} onClick={handleClose} />
      <ModalWrapper isOpen={isOpen}>
        <ModalContent>
          <TextContainer>
            <Text size={20} type="bold">
              Are you sure to delete this task
            </Text>
            <Text color="#B56A6A">This action cannot be undo.</Text>
          </TextContainer>
          <ButtonContainer>
            <Button onClick={handleClose}>
              <Text>Cancel</Text>
            </Button>
            <Button onClick={deleteTask}>
              <Text color="#E9E9E9">Delete</Text>
            </Button>
          </ButtonContainer>
        </ModalContent>
      </ModalWrapper>
    </>,
    document.getElementById('portal-viewtaskdetails')!
  )
}
