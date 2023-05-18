import { Item, ItemText } from '@radix-ui/react-select'
import styled from 'styled-components'

import { ReactComponent as DefaultFlag } from '@/assets/icons/flag-default.svg'
import { ReactComponent as GreenFlag } from '@/assets/icons/flag-green.svg'
import { ReactComponent as RedFlag } from '@/assets/icons/flag-red.svg'
import { ReactComponent as YellowFlag } from '@/assets/icons/flag-yellow.svg'

const CustomItem = styled(Item)<{ selected: boolean }>`
  font-size: 14px;
  font-weight: 500;
  font-family: 'regular';
  color: #0f0f0f;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: ${({ selected }) => (selected ? '#e1e1e1' : 'transparent')};
  transition: background-color 0.2s ease;
  border-radius: 6px;
  margin: 4px 8px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 14px;
    height: 14px;
  }

  span {
    text-transform: capitalize;
    color: #787878;
  }

  &:hover {
    background-color: #e1e1e1;
  }

  &:focus {
    background-color: #e1e1e1;
  }
`

type SelectItemProps = {
  children: React.ReactNode
  value: string
  selectedValue: string
}

const MAPPING_FLAG_ICON = {
  default: <DefaultFlag />,
  low: <GreenFlag />,
  medium: <YellowFlag />,
  high: <RedFlag />
}

export const SelectItem = ({ children, value, selectedValue }: SelectItemProps) => {
  return (
    <CustomItem selected={value === selectedValue} value={value.toString()}>
      {MAPPING_FLAG_ICON[value as keyof typeof MAPPING_FLAG_ICON]}
      <ItemText>{children}</ItemText>
    </CustomItem>
  )
}
