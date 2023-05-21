import { useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg'
import { ReactComponent as DownIcon } from '@/assets/icons/down.svg'
import { ReactComponent as DefaultFlag } from '@/assets/icons/flag-default.svg'
import { ReactComponent as GreenFlag } from '@/assets/icons/flag-green.svg'
import { ReactComponent as RedFlag } from '@/assets/icons/flag-red.svg'
import { ReactComponent as YellowFlag } from '@/assets/icons/flag-yellow.svg'
import { ReactComponent as MeatballMenuIcon } from '@/assets/icons/meatball-menu.svg'
import { ReactComponent as UpIcon } from '@/assets/icons/up.svg'
import { SelectPriority } from '@/components/AddTask'
import { Text } from '@/components/Common'
import { DatePicker } from '@/components/DatePicker'
import { Checkbox } from '@/components/TaskPreview'
import { PRIORITY_LIST } from '@/libs/constant'

//#region styles
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(32, 31, 31, 0.4);
`

const ModalWrapper = styled.div<{ isOpen: boolean }>`
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
  position: fixed;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0px 4px 7px 5px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
`
const ModalContent = styled.div``

const TaskProperties = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const TaskPropertiesButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f9f8f8;
  border: 1px solid rgba(120, 120, 120, 0.5);
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f1f1f1;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

const PremiumLabel = styled.div`
  margin: 0 auto;
  background-color: #faead1;
  padding: 4px 10px 5px 10px;
  border-radius: 4px;
  box-sizing: border-box;
`

//#endregion
const MAPPING_FLAG_ICON = {
  default: <DefaultFlag />,
  low: <GreenFlag />,
  medium: <YellowFlag />,
  high: <RedFlag />
}

type TaskDetailsModalProps = {
  isOpen: boolean
  handleClose: () => void
}
export const TaskDetailsModal = ({ isOpen, handleClose }: TaskDetailsModalProps) => {
  const [task, setTask] = useState({
    taskName: '',
    taskDescription: '',
    priority: 'default',
    dueDate: 0
  })

  if (!isOpen) return null

  return createPortal(
    <>
      <ModalOverlay isOpen={isOpen} onClick={handleClose} />
      <ModalWrapper isOpen={isOpen}>
        <div>
          <UpIcon />
          <DownIcon />
          <MeatballMenuIcon />
          <CloseIcon />
        </div>
        <ModalContent>
          <div>
            <Checkbox />
            <input placeholder="Task name" type="text" />
            <input placeholder="Description" type="text" />
          </div>

          <TaskProperties>
            <DatePicker setDueDate={(dueDate) => setTask((prevTask) => ({ ...prevTask, dueDate }))} />
            <SelectPriority
              list={PRIORITY_LIST}
              setValue={(priority) => setTask((prevTask) => ({ ...prevTask, priority }))}
              value={task.priority}
            >
              <TaskPropertiesButton>
                {MAPPING_FLAG_ICON[task.priority as keyof typeof MAPPING_FLAG_ICON]}
                <Text color="#949494">{PRIORITY_LIST.find((item) => item.value === task.priority)?.label}</Text>
              </TaskPropertiesButton>
            </SelectPriority>
            <TaskPropertiesButton>
              <Text color="#949494">Reminder</Text>
              <PremiumLabel>
                <Text color="#8F4700" size={10} type="bold">
                  PREMIUM ONLY
                </Text>
              </PremiumLabel>
            </TaskPropertiesButton>
          </TaskProperties>
        </ModalContent>
      </ModalWrapper>
    </>,
    document.getElementById('portal-viewtaskdetails')!
  )
}
