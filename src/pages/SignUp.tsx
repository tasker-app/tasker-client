import styled from 'styled-components'

import SignUpImage from '@/assets/images/SignUpImage.webp'
import { AuthHeader } from '@/components/AuthHeader'
import { SignUpForm } from '@/components/SignUpForm'

const SignInContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  .background-image {
    width: 300px;
    position: fixed;
    right: 0;
    bottom: 0;
  }
`

const SignUp = () => {
  return (
    <SignInContainer>
      <AuthHeader />
      <SignUpForm />
      <img alt="Sign up Illustration" className="background-image" src={SignUpImage} />
    </SignInContainer>
  )
}

export default SignUp
