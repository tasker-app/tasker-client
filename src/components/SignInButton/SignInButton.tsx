import styled from 'styled-components'

// TEMP FOR CODEBASE EXAMPLE
const ButtonContainer = styled.button`
  background: linear-gradient(180deg, rgba(128, 137, 218, 0.62) 0%, rgba(53, 170, 254, 0.67) 100%);
  border-radius: 12px;
  width: 99px;
  height: 29px;
  border: none;
  cursor: pointer;

  &:active {
    transform: scale(0.9);
  }
  &:hover {
    background: linear-gradient(180deg, rgba(155, 165, 246, 0.62) 0%, rgba(71, 179, 255, 0.67) 100%);
    transition: 0.3s ease;
  }
`

type SignInButtonProps = {
  children: React.ReactNode
}
export const SignInButton = ({ children }: SignInButtonProps) => {
  return <ButtonContainer>{children}</ButtonContainer>
}
