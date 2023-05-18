import styled from 'styled-components'

import SignInImage from '@/assets/images/SignInImage.webp'
import { AuthHeader } from '@/components/AuthHeader'
import { ForgotPasswordForm } from '@/components/ForgotPasswordForm'

const ForgotPasswordContainer = styled.div`
  width: 100vw;
  height: 100vh;
  .background-image {
    width: 300px;
    position: fixed;
    right: 0;
    bottom: 0;
  }
`

const ForgotPassword = () => {
  return (
    <ForgotPasswordContainer>
      <AuthHeader />
      <ForgotPasswordForm />
      <img alt="Sign in Illustration" className="background-image" src={SignInImage} />
    </ForgotPasswordContainer>
  )
}

export default ForgotPassword
