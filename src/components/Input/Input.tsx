import { useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as UnViewHide } from '@/assets/icons/unview-hide.svg'
import { ReactComponent as ViewHide } from '@/assets/icons/view-hide.svg'

// TEMP FOR CODEBASE EXAMPLE
const InputCover = styled.div`
  position: relative;
`
const InputContainer = styled.input<{ status: string; width: string; height: string }>`
  width: ${({ width }) => `${width}`};
  height: ${({ height }) => `${height}`};
  line-height: 28px;
  padding: 0 1rem;
  padding-left: 1rem;
  border: ${({ status }) => `2px solid ${status === 'error' ? `#f65b5b` : `#949494`}`};
  border-radius: 8px;
  outline: none;
  background-color: #f3f3f4;
  color: ${({ status }) => `2px solid ${status === 'error' ? `#f93535` : `#0d0c22`}`};
  transition: 0.3s ease;
  &::placeholder {
    color: #9e9ea7;
  }
  &:focus,
  &:hover {
    outline: none;
    border-color: #35aafe;
    background-color: #f8f8f8;
    box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
  }
`
const Icon = styled.div`
  position: absolute;
  right: 1rem;
  fill: #9e9ea7;
  width: 1.3rem;
  height: 1.3rem;
  top: 22%;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: #d9d9d9;
  }
`

type InputProps = {
  width?: string
  height?: string
  setInput: (input: string) => void
  value?: string
  type: string
  isError?: boolean
}

export const Input = ({ width, height, setInput, value, type, isError }: InputProps) => {
  const [isView, setIsView] = useState(false)

  return (
    <InputCover>
      <InputContainer
        height={height || '36px'}
        status={isError ? 'error' : 'normal'}
        type={type == 'password' && !isView ? 'password' : type == 'password' && isView ? 'text' : 'text'}
        value={value}
        width={width || '100px'}
        onChange={(e) => {
          setInput(e.target.value)
        }}
      />
      {type === 'password' ? (
        <Icon
          onClick={() => {
            setIsView(!isView)
          }}
        >
          {isView ? <UnViewHide /> : <ViewHide />}
        </Icon>
      ) : (
        ''
      )}
    </InputCover>
  )
}
