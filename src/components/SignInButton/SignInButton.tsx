import styled from 'styled-components'

const ButtonContainer = styled.button<{ width: string; height: string }>`
  background: linear-gradient(180deg, rgba(128, 137, 218, 0.62) 0%, rgba(53, 170, 254, 0.67) 100%);
  border-radius: 12px;
  width: ${({ width }) => `${width}`};
  height: ${({ height }) => `${height}`};
  border: none;
  cursor: pointer;

  &:active:not([disabled]) {
    transform: scale(0.9);
  }
  &:hover {
    background: linear-gradient(180deg, rgba(155, 165, 246, 0.62) 0%, rgba(71, 179, 255, 0.67) 100%);
    transition: 0.3s ease;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

type SignInButtonProps = {
  type?: 'button' | 'submit'
  disabled?: true | false
  width?: string
  height?: string
  children: React.ReactNode
  onClick?: () => void
}
export const SignInButton = ({
  onClick = () => {},
  type,
  disabled,
  children,
  width = '99px',
  height = '29px'
}: SignInButtonProps) => {
  return (
    <ButtonContainer disabled={disabled} height={height} type={type} width={width} onClick={onClick}>
      {children}
    </ButtonContainer>
  )
}
