import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { Text } from '@/components/Common'

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
  position: fixed;
  background: rgba(32, 31, 31, 0.4);
  width: 100vw;
  height: 100vh;
`

const ModalWrapper = styled.div<{ isOpen: boolean }>`
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
  height: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 8px;
`

const ModalContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 24px;
  box-sizing: border-box;
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
    background-color: #77b3df;
    &:hover {
      background-color: #5fa8d3;
    }
  }

  &:last-child {
    background-color: #f2f2f2;
    &:hover {
      background-color: #e8e8e8;
    }
  }
`

type AlertModalProps = {
  isOpen: boolean
  handleAlertClose: () => void
  handleClose: () => void
}

export const AlertModal = ({ isOpen, handleAlertClose, handleClose }: AlertModalProps) => {
  return createPortal(
    <>
      <ModalOverlay isOpen={isOpen} onClick={handleAlertClose} />
      <ModalWrapper isOpen={isOpen}>
        <ModalContent>
          <Text size={20} type="bold">
            Unsaved Changes
          </Text>
          <Text size={16}>You have unsaved changes. Are you sure you want to leave without saving?</Text>

          <ButtonContainer>
            <Button
              onClick={() => {
                handleClose()
                handleAlertClose()
              }}
            >
              <Text>OK</Text>
            </Button>
            <Button onClick={handleAlertClose}>
              <Text>Cancel</Text>
            </Button>
          </ButtonContainer>
        </ModalContent>
      </ModalWrapper>
    </>,
    document.getElementById('portal-settingmodal') as HTMLElement
  )
}
