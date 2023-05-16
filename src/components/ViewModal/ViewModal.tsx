import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { ReactComponent as ArrowDownIcon } from '@/assets/icons/arrow-down.svg'
import { ReactComponent as CollapseIcon } from '@/assets/icons/collapse.svg'
import { ReactComponent as ExpandIcon } from '@/assets/icons/expand.svg'
import { ReactComponent as FlagIcon } from '@/assets/icons/flag.svg'
import { Text } from '@/components/Common'

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
  position: fixed;
  width: 100vw;
  height: 100vh;
`

const ModalWrapper = styled.div<{ isOpen: boolean }>`
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
  position: absolute;
  width: 350px;
  top: 175px;
  right: 45px;
  box-sizing: border-box;
  padding: 20px 18px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.25);

  &::after {
    content: '';
    position: absolute;
    top: 145px;
    right: 0px;
    width: 100%;
    border: 1px solid rgba(148, 148, 148, 0.6);
  }
`
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const SelectionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 4px;
  padding: 5px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e1e1e1;
  }

  svg {
    filter: brightness(0) saturate(100%) invert(47%) sepia(0%) saturate(1802%) hue-rotate(152deg) brightness(97%)
      contrast(69%);
    width: 20px;
    height: 20px;
  }
`

const Filter = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

type ModalProps = {
  isOpen: boolean
  handleClose: () => void
}
export const ViewModal = ({ isOpen, handleClose }: ModalProps) => {
  if (!isOpen) return null

  return createPortal(
    <>
      <ModalOverlay isOpen={isOpen} onClick={handleClose} />
      <ModalWrapper isOpen={isOpen}>
        <ModalContent>
          <Text size={16} type="bold">
            Sort
          </Text>
          <Flex>
            <Title>
              <CollapseIcon />
              <Text size={16}> Sorting</Text>
            </Title>

            <SelectionButton>
              <Text color="#787878" size={16}>
                Default
              </Text>
              <ExpandIcon />
            </SelectionButton>
          </Flex>

          <Flex>
            <Title>
              <ArrowDownIcon />
              <Text size={16}> Ordering</Text>
            </Title>

            <SelectionButton>
              <Text color="#787878" size={16}>
                Ascending
              </Text>
              <ExpandIcon />
            </SelectionButton>
          </Flex>

          <Filter>
            <Text size={16} type="bold">
              Filter
            </Text>

            <Flex>
              <Title>
                <FlagIcon />
                <Text size={16}> Priority</Text>
              </Title>
              <SelectionButton>
                <Text color="#787878" size={16}>
                  Default
                </Text>
                <ExpandIcon />
              </SelectionButton>
            </Flex>
          </Filter>
        </ModalContent>
      </ModalWrapper>
    </>,
    document.getElementById('portal-viewmodal')!
  )
}
