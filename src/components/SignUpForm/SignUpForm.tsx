import { FormEvent, useState } from 'react'
import styled from 'styled-components'

import { CheckBox } from '@/components/CheckBox'
import { Text } from '@/components/Common/Text'
import { Input } from '@/components/Input'
// import { Selection } from '@/components/Selection'
import { SignInButton } from '@/components/SignInButton'

const SignUpFormContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
const FormCover = styled.div`
  text-align: -webkit-center;
  margin-top: 40px;
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
const Condition = styled.div`
  text-align: left;
  margin-left: 20px;
`
const SubmitButton = styled.div`
  margin: 20px 0 10px 0;
  text-align: center;
`
const ConditionContainer = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-top: 2px;
  }
`

export const SignUpForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [isErrorName, setIsErrorName] = useState(false)
  const [isErrorEmail, setIsErrorEmail] = useState(false)
  const [isErrorPass, setIsErrorPass] = useState(false)
  const [isErrorRePass, setIsErrorRePass] = useState(false)
  const [notDisableButton, setNotDisableButton] = useState(false)
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
    let hasPasswordError = false
    let hasNameError = false
    let hasRePasswordError = false

    if (name === '') {
      setIsErrorName(true)
      hasNameError = true
    } else {
      setIsErrorName(false)
      hasNameError = false
    }
    if (!validateEmail(email)) {
      setIsErrorEmail(true)
      hasEmailError = true
    } else {
      setIsErrorEmail(false)
      hasEmailError = false
    }
    if (password === '' || password?.length < 8) {
      setIsErrorPass(true)
      hasPasswordError = true
    } else {
      setIsErrorPass(false)
      hasPasswordError = false
    }
    if (rePassword !== password) {
      setIsErrorRePass(true)
      hasRePasswordError = true
    } else {
      setIsErrorRePass(false)
      hasRePasswordError = false
    }

    return hasEmailError || hasPasswordError || hasNameError || hasRePasswordError
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validation()) {
      return
    } else {
      console.log('submited', { name, email, password, rePassword })
    }
  }

  return (
    <SignUpFormContainer>
      <FormCover>
        <Text size={36} type="bold">
          Start your organization journey now
        </Text>
        <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <InputBlock>
            <Text size={18}>Your Name</Text>
            <Input
              height="36px"
              isError={isErrorName}
              setInput={setName}
              setOnChange={setIsErrorName}
              value={name}
              width="365px"
            />
          </InputBlock>
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
          <InputBlock>
            <Text size={18}>Password</Text>

            <Input
              height="36px"
              isError={isErrorPass}
              setInput={setPassword}
              setOnChange={setIsErrorPass}
              type="password"
              value={password}
              width="365px"
            />
          </InputBlock>
          <InputBlock>
            <Text size={18}>Re-enter Password</Text>
            <Input
              height="36px"
              isError={isErrorRePass}
              setInput={setRePassword}
              setOnChange={setIsErrorRePass}
              type="password"
              value={rePassword}
              width="365px"
            />
          </InputBlock>
          {/* <InputBlock>
            <Text size={18}>You use Tasker for</Text>
            <Selection />
          </InputBlock> */}
          <Condition>
            <ConditionContainer>
              <CheckBox onChecked={setNotDisableButton} />
              <Text color="#787878" size={14}>
                By selecting this option, I agree with Tasker’s Term and Policy
              </Text>
            </ConditionContainer>
            <ConditionContainer>
              <CheckBox />
              <Text color="#787878" size={14}>
                Subscribe for news letter
              </Text>
            </ConditionContainer>
          </Condition>
          <SubmitButton>
            <SignInButton disabled={!notDisableButton} type="submit">
              <Text size={16}>Get In</Text>
            </SignInButton>
          </SubmitButton>
        </Form>
      </FormCover>
    </SignUpFormContainer>
  )
}
