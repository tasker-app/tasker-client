import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import { forwardRef } from 'react'
import styled from 'styled-components'

const SelectionCover = styled.div`
  button {
    all: unset;
  }

  .SelectTrigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 13px;
    line-height: 1;
    height: 35px;
    gap: 5px;
    background-color: white;
    color: rgba(71, 179, 255, 0.67);
  }
  .SelectTrigger:hover {
    background-color: #cbcbcb;
  }
  .SelectTrigger:focus {
    box-shadow: 0 0 0 2px black;
  }
  .SelectTrigger[data-placeholder] {
    color: rgba(71, 179, 255, 0.67);
  }

  .SelectIcon {
    color: rgba(71, 179, 255, 0.67);
  }

  .SelectContent {
    overflow: hidden;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  }

  .SelectViewport {
    padding: 5px;
  }

  .SelectLabel {
    padding: 0 25px;
    font-size: 12px;
    line-height: 25px;
    color: #cbcbcb;
  }

  .SelectSeparator {
    height: 1px;
    background-color: rgba(71, 179, 255, 0.67);
    margin: 5px;
  }

  .SelectScrollButton {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    background-color: white;
    color: rgba(71, 179, 255, 0.67);
    cursor: default;
  }
`
const SelectItemContainer = styled.div`
  .SelectItem {
    font-size: 13px;
    line-height: 1;
    color: rgba(71, 179, 255, 0.67);
    border-radius: 3px;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 35px 0 25px;
    position: relative;
    user-select: none;
  }
  .SelectItem[data-disabled] {
    color: #cbcbcb;
    pointer-events: none;
  }
  .SelectItem[data-highlighted] {
    outline: none;
    background-color: rgba(71, 179, 255, 0.67);
    color: rgba(71, 179, 255, 0.67);
  }

  .SelectItemIndicator {
    position: absolute;
    left: 0;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`

type SelectItemProps = {
  children: string
  value: string
}

const SelectItem = forwardRef(function SelectItem({ children, value, ...props }: SelectItemProps, forwardedRef: any) {
  return (
    <SelectItemContainer>
      <Select.Item ref={forwardedRef} {...props} className="SelectItem" value={value}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    </SelectItemContainer>
  )
})

export const Selection = () => (
  <SelectionCover>
    <Select.Root>
      <Select.Trigger aria-label="Food" className="SelectTrigger">
        <Select.Value placeholder="Select your choice" />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </SelectionCover>
)
