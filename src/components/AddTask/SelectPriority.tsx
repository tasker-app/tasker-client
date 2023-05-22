import * as Select from '@radix-ui/react-select'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { SelectItem } from './SelectItem'

const Trigger = styled(Select.Trigger)`
  all: unset;
`

const Content = styled(Select.Content)`
  overflow: hidden;
  border-radius: 6px;
  z-index: 4;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.25);
  background-color: #f9f9f9;
  width: 136px;
`

type SelectProps = {
  children: ReactNode
  list: Array<{ label: string; value: string }>
  value: string
  setValue: (value: 'default' | 'low' | 'medium' | 'high') => void
}

export const SelectPriority = (props: SelectProps) => {
  return (
    <Select.Root value={props.value} onValueChange={props.setValue}>
      <Trigger>{props.children}</Trigger>
      <Content position="popper" sideOffset={12}>
        {props.list.map((item) => (
          <SelectItem key={item.value} selectedValue={props.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Content>
    </Select.Root>
  )
}
