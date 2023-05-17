import styled from 'styled-components'

const CheckBoxCover = styled.div``
const CheckBoxContainer = styled.input`
  border-radius: 10px;
  cursor: pointer;
`

type CheckBoxProps = {
  onChecked?: (isChecked: boolean) => void
}
export const CheckBox = ({ onChecked = () => {} }: CheckBoxProps) => {
  return (
    <CheckBoxCover>
      <CheckBoxContainer type="checkbox" onChange={(e) => onChecked(e.target.checked)} />
    </CheckBoxCover>
  )
}
