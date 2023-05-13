import styled from 'styled-components'

import { ReactComponent as Logo } from '@/assets/icons/logo.svg'

import { Text } from '../Common'
import { SignInButton } from '../SignInButton'

const StyledAuthHeader = styled.div`
  background-color: transparent;
  height: 50px;
  width: 100%;
  padding: 10px 60px 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 2;
`
const NavContainer = styled.div`
  margin-right: 40px;
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
`
const Nav = styled.div`
  margin: 15px;
  cursor: pointer;
  white-space: nowrap;

  span {
    &:hover {
      text-decoration: underline;
    }
  }
`
const StyledNavText = styled(Text)`
  /* color: red !important;
  &:hover {
    text-decoration: underline;
  } */
`
const StyledLogo = styled(Logo)`
  cursor: pointer;
`

export const AuthHeader = () => {
  return (
    <StyledAuthHeader>
      <StyledLogo />
      <NavContainer>
        <Nav>
          <StyledNavText color="#787878" size={15}>
            Pricing
          </StyledNavText>
        </Nav>
        <Nav>
          <StyledNavText color="#787878" size={15}>
            About Us
          </StyledNavText>
        </Nav>
        <Nav>
          <SignInButton>
            <Text size={15}>Sign In</Text>
          </SignInButton>
        </Nav>
      </NavContainer>
    </StyledAuthHeader>
  )
}
