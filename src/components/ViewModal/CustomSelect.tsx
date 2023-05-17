import * as Select from '@radix-ui/react-select'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { ReactComponent as ExpandIcon } from '@/assets/icons/expand.svg'
import { Text } from '@/components/Common'

import { SelectItem } from './SelectItem'

const Trigger = styled(Select.Trigger)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 4px;
  padding: 6px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e1e1e1;
  }

  span {
    text-transform: capitalize;
  }

  svg {
    filter: brightness(0) saturate(100%) invert(47%) sepia(0%) saturate(1802%) hue-rotate(152deg) brightness(97%)
      contrast(69%);
    width: 20px;
    height: 20px;
  }
`

const Content = styled(Select.Content)`
  overflow: hidden;
  border-radius: 6px;
  z-index: 4;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.25);
  background-color: #f9f9f9;
  width: 200px;
`

type SelectProps = {
  children: ReactNode
  list: Array<{ label: string; value: string }>
  value: string
  setValue: (value: string) => void
}

export const CustomSelect = (props: SelectProps) => {
  return (
    <Select.Root value={props.value} onValueChange={props.setValue}>
      <Trigger>
        <Text color="#787878" size={16}>
          {props.children}
        </Text>
        <ExpandIcon />
      </Trigger>
      <Select.Portal>
        <Content position="popper">
          <Select.Viewport>
            <Select.Group>
              {props.list.map((item) => (
                <SelectItem key={item.value} selectedValue={props.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Content>
      </Select.Portal>
    </Select.Root>
  )
}
