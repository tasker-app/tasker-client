import { useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg'
import { ReactComponent as DownIcon } from '@/assets/icons/down.svg'
import { ReactComponent as DefaultFlag } from '@/assets/icons/flag-default.svg'
import { ReactComponent as GreenFlag } from '@/assets/icons/flag-green.svg'
import { ReactComponent as RedFlag } from '@/assets/icons/flag-red.svg'
import { ReactComponent as YellowFlag } from '@/assets/icons/flag-yellow.svg'
import { ReactComponent as LockIcon } from '@/assets/icons/lock.svg'
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
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 7px 5px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
`
const TaskOptions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding: 10px 10px 10px 0;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(148, 148, 148, 0.6);
`
const OptionButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border-radius: 8px;
  padding: 5px;

  &:hover {
    background-color: #e3e3e3;
  }
`

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 250px;
  height: calc(100% - 54px);
`

const TaskDetails = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin: 20px 0 0 32px;
`

const CheckContainer = styled.div``

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
`

const TaskName = styled.input`
  width: 100%;
  border: none;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  font-family: 'Regular';

  &:focus {
    outline: none;
  }
`

const TaskDescription = styled.input`
  width: 100%;
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  font-family: 'Regular';

  &:focus {
    outline: none;
  }
`

const TaskProperties = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f4f3f5;
  padding: 20px 22px 0 22px;
  box-sizing: border-box;
  gap: 20px;
`

const Property = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TaskPropertiesButton = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border-radius: 8px;
  padding: 5px 9px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  box-sizing: border-box;
  border: 1px solid rgba(120, 120, 120, 0.5);

  &:hover {
    background-color: #e3e3e3;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  &:nth-child(n + 2) {
    border: none;
  }
`

const PremiumLabel = styled.div`
  margin: 0 auto;
  background-color: #faead1;
  border-radius: 4px;
  padding: 4px 8px;
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
  name: string
  description: string
  dueDate: number
  priority: 'low' | 'medium' | 'high' | 'default'
}
export const TaskDetailsModal = ({
  isOpen,
  handleClose,
  name,
  description,
  dueDate,
  priority
}: TaskDetailsModalProps) => {
  const [task, setTask] = useState({
    name: name,
    description: description,
    priority: priority,
    dueDate: dueDate
  })

  if (!isOpen) return null

  return createPortal(
    <>
      <ModalOverlay isOpen={isOpen} onClick={handleClose} />
      <ModalWrapper isOpen={isOpen}>
        <TaskOptions>
          <OptionButton>
            <UpIcon />
          </OptionButton>
          <OptionButton>
            <DownIcon />
          </OptionButton>
          <OptionButton>
            <MeatballMenuIcon />
          </OptionButton>
          <OptionButton onClick={handleClose}>
            <CloseIcon />
          </OptionButton>
        </TaskOptions>
        <ModalContent>
          <TaskDetails>
            <CheckContainer>
              <Checkbox />
            </CheckContainer>
            <ContentContainer>
              <TaskName
                placeholder="Task name"
                type="text"
                value={task.name}
                onChange={(e) => setTask((prevTask) => ({ ...prevTask, name: e.target.value }))}
              />
              <TaskDescription
                placeholder="Description"
                type="text"
                value={task.description}
                onChange={(e) => setTask((prevTask) => ({ ...prevTask, description: e.target.value }))}
              />
            </ContentContainer>
          </TaskDetails>

          <TaskProperties>
            <Property>
              <Text color="#949494" size={16} type="bold">
                Due Date
              </Text>
              <DatePicker
                maxWidth="104px"
                setDueDate={(dueDate) => setTask((prevTask) => ({ ...prevTask, dueDate }))}
              />
            </Property>

            <Property>
              <Text color="#949494" size={16} type="bold">
                Priority
              </Text>
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
            </Property>

            <TaskPropertiesButton>
              <Text color="#949494" size={16} type="bold">
                Reminder
              </Text>
              <PremiumLabel>
                <Text color="#8F4700" size={8} type="bold">
                  PREMIUM ONLY
                </Text>
              </PremiumLabel>
              <LockIcon />
            </TaskPropertiesButton>
          </TaskProperties>
        </ModalContent>
      </ModalWrapper>
    </>,
    document.getElementById('portal-viewtaskdetails')!
  )
}
