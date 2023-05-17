import { useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { ReactComponent as ArrowDownIcon } from '@/assets/icons/arrow-down.svg'
import { ReactComponent as CollapseIcon } from '@/assets/icons/collapse.svg'
import { ReactComponent as FlagIcon } from '@/assets/icons/flag.svg'
import { Text } from '@/components/Common'
import { ORDERING_LIST, PRIORITY_LIST, SORTING_LIST } from '@/libs/constant'

import { CustomSelect } from './CustomSelect'

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
  const [selectedSorting, setSelectedSorting] = useState('default')
  const [selectedOrdering, setSelectedOrdering] = useState('ascending')
  const [selectedPriority, setSelectedPriority] = useState('default')

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

            <CustomSelect list={SORTING_LIST} setValue={setSelectedSorting} value={selectedSorting}>
              {selectedSorting}
            </CustomSelect>
          </Flex>

          <Flex>
            <Title>
              <ArrowDownIcon />
              <Text size={16}> Ordering</Text>
            </Title>

            <CustomSelect list={ORDERING_LIST} setValue={setSelectedOrdering} value={selectedOrdering}>
              {selectedOrdering}
            </CustomSelect>
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
              <CustomSelect list={PRIORITY_LIST} setValue={setSelectedPriority} value={selectedPriority}>
                {selectedPriority}
              </CustomSelect>
            </Flex>
          </Filter>
        </ModalContent>
      </ModalWrapper>
    </>,
    document.getElementById('portal-viewmodal') as HTMLElement
  )
}
