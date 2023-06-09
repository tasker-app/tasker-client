import { useState } from 'react'
import { createPortal } from 'react-dom'
import ReactQuill from 'react-quill'
import styled from 'styled-components'

import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg'
import { ReactComponent as DownIcon } from '@/assets/icons/down.svg'
import { ReactComponent as DefaultFlag } from '@/assets/icons/flag-default.svg'
import { ReactComponent as GreenFlag } from '@/assets/icons/flag-green.svg'
import { ReactComponent as RedFlag } from '@/assets/icons/flag-red.svg'
import { ReactComponent as YellowFlag } from '@/assets/icons/flag-yellow.svg'
import { ReactComponent as LockIcon } from '@/assets/icons/lock.svg'
import { ReactComponent as TrashIcon } from '@/assets/icons/trash.svg'
import { ReactComponent as UpIcon } from '@/assets/icons/up.svg'
import { SelectPriority } from '@/components/AddTask'
import { CustomTooltip, Text } from '@/components/Common'
import { DatePicker } from '@/components/DatePicker'
import { Checkbox } from '@/components/TaskPreview'
import { PRIORITY_LIST } from '@/libs/constant'
import { useTaskStore } from '@/stores'

import { DeleteTask } from './DeleteTask'

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
  height: fit-content;
  max-height: 500px;
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
  padding-bottom: 20px;
  overflow-y: scroll;
  max-height: 390px;

  &:hover {
    &::-webkit-scrollbar-thumb {
      z-index: 2;
      visibility: visible;
    }
  }
  /* width */
  &::-webkit-scrollbar {
    width: 8px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #bdbdbd;
    z-index: 1;
    visibility: hidden;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #858585;
  }
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

const TaskDescription = styled.div`
  width: 100%;
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  font-family: 'Regular';

  &:focus {
    outline: none;
  }
  .ql-container.ql-snow {
    border: none;
    .ql-editor {
      padding: 0;
    }
    .ql-editor.ql-blank::before {
      left: 0;
      font-style: normal;
      color: rgba(0, 0, 0, 0.4);
    }
  }
`

const TaskProperties = styled.div`
  max-height: 446.5px;
  display: flex;
  flex-direction: column;
  background-color: #f4f3f5;
  padding: 20px 22px 20px 22px;
  box-sizing: border-box;
  gap: 20px;
  border-radius: 0 0 8px 0;
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
  id: string
}

export const TaskDetailsModal = ({
  isOpen,
  handleClose,
  name,
  description,
  dueDate,
  priority,
  id
}: TaskDetailsModalProps) => {
  const [task, setTask] = useState({
    id,
    name: name,
    description: description,
    dueDate: dueDate,
    priority: priority
  })

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  const [deleteTask, updateTask] = useTaskStore((state) => [state.deleteTask, state.updateTask])

  if (!isOpen) return null

  return createPortal(
    <>
      <ModalOverlay
        isOpen={isOpen}
        onClick={() => {
          updateTask(task)
          handleClose()
        }}
      />
      <ModalWrapper isOpen={isOpen}>
        <TaskOptions>
          <CustomTooltip content="Previous">
            <OptionButton>
              <UpIcon />
            </OptionButton>
          </CustomTooltip>

          <CustomTooltip content="Next">
            <OptionButton>
              <DownIcon />
            </OptionButton>
          </CustomTooltip>

          <CustomTooltip content="Delete">
            <OptionButton onClick={() => setIsOpenDeleteModal(true)}>
              <TrashIcon />
            </OptionButton>
          </CustomTooltip>

          <CustomTooltip content="Close">
            <OptionButton onClick={handleClose}>
              <CloseIcon />
            </OptionButton>
          </CustomTooltip>
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
              <TaskDescription>
                <ReactQuill
                  formats={[]}
                  modules={{
                    toolbar: null
                  }}
                  placeholder="Description"
                  theme="snow"
                  value={task.description}
                  onChange={(value) => setTask((prevTask) => ({ ...prevTask, description: value }))}
                />
              </TaskDescription>
            </ContentContainer>
          </TaskDetails>

          <TaskProperties>
            <Property>
              <Text color="#949494" size={16} type="bold">
                Due Date
              </Text>
              <DatePicker
                dueDate={dueDate}
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
      <DeleteTask
        deleteTask={() => deleteTask(id)}
        handleClose={() => setIsOpenDeleteModal(false)}
        isOpen={isOpenDeleteModal}
      />
    </>,
    document.getElementById('portal-viewtaskdetails') as HTMLElement
  )
}
