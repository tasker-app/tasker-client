import styled from 'styled-components'

const CheckBoxCover = styled.div``
const CheckBoxContainer = styled.input<{ width: string; height: string }>`
  border-radius: 10px;
  cursor: pointer;
  width: ${({ width }) => `${width}`};
  height: ${({ height }) => `${height}`};
`

type CheckBoxProps = {
  width?: string
  height?: string
  onChecked?: (isChecked: boolean) => void
}
export const CheckBox = ({ width, height, onChecked = () => {} }: CheckBoxProps) => {
  return (
    <CheckBoxCover>
      <CheckBoxContainer
        height={height || '12px'}
        type="checkbox"
        width={width || '12px'}
        onChange={(e) => onChecked(e.target.checked)}
      />
    </CheckBoxCover>
  )
}
