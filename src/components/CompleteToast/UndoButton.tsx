import styled from 'styled-components'

import { Text } from '@/components/Common'

const Container = styled.button`
  width: 60px;
  height: 28px;
  background: #393838;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  transition: background, scale 0.3s ease;

  &:hover {
    background: #4d4949;
  }

  &:active {
    background: #393838;
    scale: 0.9;
  }
`

export const UndoButton = () => {
  return (
    <Container>
      <Text color="#B95A5A" size={14}>
        Undo
      </Text>
    </Container>
  )
}
