import { Item, ItemText } from '@radix-ui/react-select'
import styled from 'styled-components'

const CustomItem = styled(Item)<{ selected: boolean }>`
  font-size: 16px;
  font-weight: 500;
  position: relative;
  user-select: none;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: ${({ selected }) => (selected ? '#e1e1e1' : 'transparent')};
  transition: background-color 0.2s ease;
  border-radius: 6px;
  margin: 10px 12px;
  padding: 8px 12px;

  span {
    text-transform: capitalize;
    color: #787878;
  }

  &:hover {
    background-color: #e1e1e1;
  }
`

type SelectItemProps = {
  children: React.ReactNode
  value: string
  selectedValue: string
}

export const SelectItem = ({ children, value, selectedValue }: SelectItemProps) => {
  return (
    <CustomItem selected={value === selectedValue} value={value.toString()}>
      <ItemText>{children}</ItemText>
    </CustomItem>
  )
}
