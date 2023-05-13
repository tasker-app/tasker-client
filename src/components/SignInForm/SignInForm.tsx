import { FormEvent, useState } from 'react'
import styled from 'styled-components'

import { Text } from '../Common/Text'
import { Input } from '../Input'
import { SignInButton } from '../SignInButton'

// TEMP FOR CODEBASE EXAMPLE

const SignInFormContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
const FormCover = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Form = styled.form`
  text-align: left;
  width: 438.59px;
  height: 310px;
  background: #f9f8f8;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  margin-top: 20px;
  padding: 30px;
`
const InputBlock = styled.div`
  justify-content: center;
  display: grid;
  height: 25%;
  margin-bottom: 20px;
`
const ForgotPasswordButton = styled.div`
  text-align: right;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
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

export const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isErrorEmail, setIsErrorEmail] = useState(false)
  const [isErrorPass, setIsErrorPass] = useState(false)

  const validateEmail = (emailFromInput: string) => {
    const emailPattern =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.(-?[a-zA-Z0-9])+$/

    if (emailFromInput === '') {
      setIsErrorEmail(true)

      return false
    } else if (emailPattern.test(emailFromInput)) {
      setIsErrorEmail(false)

      return true
    } else {
      setIsErrorEmail(true)

      return false
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (email === '') {
      setIsErrorEmail(true)

      return
    } else {
      setIsErrorEmail(false)
    }
    if (password === '') {
      setIsErrorPass(true)

      return
    } else {
      setIsErrorPass(false)
    }
    if (!validateEmail(email)) {
      return
    }
    console.log('submited', { email, password })
  }

  return (
    <SignInFormContainer>
      <FormCover>
        <Text size={36} type="bold">
          Get into Tasker
        </Text>
        <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <InputBlock>
            <Text size={18}>Email</Text>
            <Input
              height="36px"
              isError={isErrorEmail}
              setInput={setEmail}
              type="text"
              value={email}
              width="365px"
            ></Input>
          </InputBlock>
          <InputBlock>
            <Text size={18}>Password</Text>

            <Input
              height="36px"
              isError={isErrorPass}
              setInput={setPassword}
              type="password"
              value={password}
              width="365px"
            ></Input>
          </InputBlock>
          <ForgotPasswordButton>
            <Text color="#787878" size={14} type="italic">
              Forget your password?
            </Text>
          </ForgotPasswordButton>
          <SubmitButton>
            <SignInButton type="submit">Get In</SignInButton>
          </SubmitButton>
          <FormFooter>
            <Text color="#787878" size={13}>
              Wanna create a new account?<span className="hightlight"> Sign up here</span>
            </Text>
          </FormFooter>
        </Form>
      </FormCover>
    </SignInFormContainer>
  )
}
