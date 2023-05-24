import styled from 'styled-components'

import { ReactComponent as DoneIcon } from '@/assets/icons/done.svg'

const CheckboxContainer = styled.button`
  height: 20px;
  width: 20px;
  background: #ffffff;
  border: 1px solid #afafaf;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  svg {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:is(:hover),
  &:is(:active) {
    border-color: #b1aeae;
    background: #e6e6e6;

    svg {
      opacity: 0.5;
    }
  }
`

type CheckboxProps = {
  handleClick: () => void
}

export const Checkbox = ({ handleClick }: CheckboxProps) => {
  return (
    <CheckboxContainer onClick={handleClick}>
      <DoneIcon />
    </CheckboxContainer>
  )
}
