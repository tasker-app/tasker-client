import { FormEvent, useState } from 'react'
import styled from 'styled-components'

import { Text } from '@/components/Common/Text'
import { Input } from '@/components/Input'
import { SignInButton } from '@/components/SignInButton'

const SignUpFormContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
const FormCover = styled.div`
  text-align: -webkit-center;
  margin-top: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Form = styled.form`
  text-align: left;
  width: 440px;
  background: #f9f8f8;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  margin-top: 18px;
  padding: 30px;
  margin-bottom: 50px;
`
const InputBlock = styled.div`
  justify-content: center;
  display: grid;
  height: 14%;
  margin-bottom: 20px;
  span {
    margin-bottom: 7px;
  }
`

const SubmitButton = styled.div`
  margin: 20px 0 10px 0;
  text-align: center;
`
const FormFooter = styled.div`
  text-align: center;
  .hightlight {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const [isErrorEmail, setIsErrorEmail] = useState(false)
  const validateEmail = (emailFromInput: string) => {
    const emailPattern =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.(-?[a-zA-Z0-9])+$/

    if (emailFromInput === '') {
      return false
    } else if (!emailPattern.test(emailFromInput)) {
      return false
    } else {
      return true
    }
  }
  const validation = () => {
    let hasEmailError = false

    if (!validateEmail(email)) {
      setIsErrorEmail(true)
      hasEmailError = true
    } else {
      setIsErrorEmail(false)
      hasEmailError = false
    }

    return hasEmailError
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validation()) {
      return
    } else {
      console.log('submited', { email })
    }
  }

  return (
    <SignUpFormContainer>
      <FormCover>
        <Text size={36} type="bold">
          Let Tasker help you recover the password
        </Text>
        <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <InputBlock>
            <Text size={18}>Email</Text>
            <Input
              height="36px"
              isError={isErrorEmail}
              setInput={setEmail}
              setOnChange={setIsErrorEmail}
              value={email}
              width="365px"
            />
          </InputBlock>
          <FormFooter>
            <Text color="#787878" size={16}>
              We will send you an email with a link to reset your password
            </Text>
          </FormFooter>
          <SubmitButton>
            <SignInButton type="submit">
              <Text size={16}>Get In</Text>
            </SignInButton>
          </SubmitButton>
        </Form>
      </FormCover>
    </SignUpFormContainer>
  )
}
