import styled from 'styled-components'

import SignInImage from '@/assets/images/SignInImage.webp'
import { SignInForm } from '@/components/SignInForm'

const SignInContainer = styled.div`
  width: 100vw;
  height: 100vh;
  img {
    width: 300px;
    position: fixed;
    right: 0;
    bottom: 0;
  }
`

const SignIn = () => {
  return (
    <SignInContainer>
      <SignInForm></SignInForm>
      <img alt="Sign in Illustration" src={SignInImage} />
    </SignInContainer>
  )
}

export default SignIn
