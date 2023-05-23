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
  isChecked?: boolean
  onChange?: () => void
  onClick?: () => void
}
export const CheckBox = ({ onClick = () => {}, isChecked, width, height, onChange = () => {} }: CheckBoxProps) => {
  return (
    <CheckBoxCover>
      <CheckBoxContainer
        checked={isChecked}
        height={height || '12px'}
        type="checkbox"
        width={width || '12px'}
        onChange={() => onChange()}
        onClick={() => onClick()}
      />
    </CheckBoxCover>
  )
}
