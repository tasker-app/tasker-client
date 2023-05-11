import styled from 'styled-components'

const TextContainer = styled.span<{ type: string; size: number; color: string }>`
  font-family: ${({ type }) => type};
  font-size: ${({ size }) => size}px;
  color: ${({ color }) => color};
`

type TextProps = {
  type?: 'bold' | 'regular' | 'bold-italic' | 'italic'
  size?: number
  color?: string
  children: React.ReactNode
}

export const Text = ({ type = 'regular', size = 14, color = '#000', children }: TextProps) => {
  return (
    <TextContainer color={color} size={size} type={type}>
      {children}
    </TextContainer>
  )
}
