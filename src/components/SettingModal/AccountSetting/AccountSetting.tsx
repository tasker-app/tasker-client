import 'react-toastify/dist/ReactToastify.css'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import styled from 'styled-components'

import DefaultAvatar from '@/assets/images/DefaultAvatar.webp'
import { Text } from '@/components/Common/Text'
import { Input } from '@/components/Input'
const AccountSettingContainer = styled.div``
const Header = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 1px solid rgba(148, 148, 148, 0.6);
`
const HeaderContent = styled.div`
  margin: 24px 0 15px 40px;
`
const SettingAccountContent = styled.div`
  padding: 40px;
`
const ContentBlock = styled.div``
const Photo = styled.div`
  margin-bottom: 25px;
`
const Title = styled.div``
const PhotoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`
const Avatar = styled.div`
  margin-top: 12px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const ChangePhotoButton = styled.input`
  width: 123px;
  &::-webkit-file-upload-button {
    visibility: hidden;
  }

  &::before {
    content: 'Change photo';
    background: rgba(146, 166, 172, 0.25);
    display: inline-block;
    border-radius: 8px;
    border: none;
    padding: 8px 15px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-size: 15px;
    font-family: 'regular';
    font-style: normal;
    font-weight: 400;
    color: #0f0f0f;
  }

  &:hover::before {
    background: rgba(146, 166, 172, 0.5);
  }

  &:active::before {
    background: rgba(146, 166, 172, 0.75);
  }
`
const ChangePhoto = styled.div`
  align-items: center;
  display: grid;
  gap: 5px;
`
const Notice = styled.div``
const Name = styled.div`
  margin-bottom: 25px;
`
const NameInputContainer = styled.div`
  margin-top: 15px;
`
const Email = styled.div`
  margin-bottom: 25px;
`

const EmailContainer = styled.div`
  margin-top: 12px;
`
const Password = styled.div`
  margin-bottom: 19px;
`

const PasswordContainer = styled.div`
  margin-top: 15px;
`
const SettingButton = styled.div`
  position: relative;
  width: 476px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  button {
    cursor: pointer;
  }
`
const SaveContainer = styled.div``
const SaveButton = styled.button`
  width: 123px;
  height: 32px;
  background: linear-gradient(180deg, rgba(119, 179, 223, 0.51) 0%, rgba(66, 208, 227, 0.2601) 100%);
  border-radius: 8px;
  border: none;
  outline: none;

  &:active:not([disabled]) {
    transform: scale(0.9);
  }
  &:hover {
    background: linear-gradient(180deg, rgba(51, 114, 145, 0.51) 0%, rgba(99, 146, 247, 0.26) 100%);
    transition: 0.3s ease;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const DeleteButton = styled.button`
  width: 123px;
  height: 32px;
  background: rgba(185, 90, 90, 0.8);
  border-radius: 8px;
  border: none;
  outline: none;
  &:active:not([disabled]) {
    transform: scale(0.9);
  }
  &:hover {
    background: rgba(185, 90, 90, 1);
    transition: 0.3s ease;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
const DangerZone = styled.div`
  height: 70px;
  display: grid;
  justify-content: space-between;
  align-items: flex-end;
`
const LoaderContainer = styled.div`
  width: 123px;
  height: 32px;
  border-radius: 8px;
  position: absolute;
  background: #373737a6;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Loader = styled.div`
  --uib-size: 20px;
  --uib-speed: 1s;
  --uib-color: rgb(255, 255, 255);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--uib-size);
  width: var(--uib-size);
  animation: rotate01561 var(--uib-speed) linear infinite;
  position: absolute;
  &::before,
  &::after {
    content: '';
    height: 25%;
    width: 25%;
    border-radius: 50%;
    background-color: var(--uib-color);
  }
  &::before {
    animation: wobble290123 calc(var(--uib-speed) * 1.25) ease-in-out infinite;
  }

  &::after {
    animation: wobble9123 calc(var(--uib-speed) * 1.25) ease-in-out infinite;
  }

  &::before {
    margin-right: 10%;
  }

  @keyframes wobble9123 {
    0%,
    100% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(calc(var(--uib-size) * 0.2)) scale(1.1);
    }
  }

  @keyframes wobble290123 {
    0%,
    100% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(calc(var(--uib-size) * -0.2)) scale(1.1);
    }
  }

  @keyframes rotate01561 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`

export const AccountSetting = () => {
  const [name, setName] = useState('Hoang Tien Thinh')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('••••••••••••')
  const [isChanged, setIsChanged] = useState(false)
  const [isErrorName, setIsErrorName] = useState(false)
  const [isErrorPass, setIsErrorPass] = useState(false)
  const [isLoadingSave, setIsLoadingSave] = useState(false)

  const [previewImage, setPreviewImage] = useState('')
  const [fileImage, setFileImage] = useState<File | null>(null)

  const notify = () =>
    toast.error('Please select files under 4MB', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })

  useEffect(() => {
    setEmail('tienthinh@gmail.com')
  }, [])
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const reader = new FileReader()

    if (file?.size && file.size > 4 * 1024 * 1024) {
      notify()
      event.target.value = ''

      return
    }

    reader.onloadend = () => {
      setPreviewImage(reader.result as string)
    }
    if (file) {
      reader.readAsDataURL(file)
      setFileImage(file)
    }
  }
  const handleUploadCloud = async () => {
    const data = new FormData()

    if (fileImage) {
      data.append('file', fileImage)
      data.append('upload_preset', 'buje35xy')
      data.append('cloud_name', 'dyd8bu6vc')

      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dyd8bu6vc/image/upload', {
          method: 'post',
          body: data
        })
        const resData = await res.json()

        return resData.url
      } catch (error) {
        console.log(error)
      }
    } else return ''
  }
  const validation = () => {
    let hasNameError = false
    let hasPasswordError = false

    if (name === '') {
      setIsErrorName(true)
      hasNameError = true
    } else {
      setIsErrorName(false)
      hasNameError = false
    }
    if (password !== '' && password?.length < 8) {
      setIsErrorPass(true)
      hasPasswordError = true
    } else {
      setIsErrorPass(false)
      hasPasswordError = false
    }

    return hasNameError || hasPasswordError
  }
  const handleSubmit = async () => {
    setIsLoadingSave(true)
    if (validation()) {
      setIsLoadingSave(false)

      return
    } else {
      let pass = ''

      if (password === '' || password === '••••••••••••') {
        pass = ''
      } else {
        pass = password
      }
      const avatar = await handleUploadCloud()

      setFileImage(null)
      console.log('submited', { name, pass, avatar })
      setIsLoadingSave(false)
    }
  }

  return (
    <AccountSettingContainer>
      <ToastContainer />
      <Header>
        <HeaderContent>
          <Text size={25} type="bold">
            Account
          </Text>
        </HeaderContent>
      </Header>
      <SettingAccountContent>
        <ContentBlock>
          <Photo>
            <Title>
              <Text size={17} type="bold">
                Photo
              </Text>
            </Title>
            <PhotoContent>
              <Avatar>
                <img
                  alt="Avatar"
                  loading="lazy"
                  src={previewImage}
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = DefaultAvatar)}
                />
              </Avatar>
              <ChangePhoto>
                <ChangePhotoButton
                  accept=".png,.jpg,.jpeg"
                  type="file"
                  onChange={(e) => {
                    handleImageUpload(e)
                    setIsChanged(true)
                  }}
                />
                <Notice>
                  <Text color="#787878" size={12}>
                    * Choose a photo up to 4MB. The format should be PNG or JPG
                  </Text>
                </Notice>
              </ChangePhoto>
            </PhotoContent>
          </Photo>
          <Name>
            <Title>
              <Text size={17} type="bold">
                Name
              </Text>
            </Title>
            <NameInputContainer>
              <Input
                handleKeyDown={() => {
                  setIsChanged(true)
                }}
                isError={isErrorName}
                setInput={setName}
                value={name}
                width="436px"
              />
            </NameInputContainer>
          </Name>
          <Email>
            <Title>
              <Text size={17} type="bold">
                Email
              </Text>
            </Title>
            <EmailContainer>
              <Text>{email}</Text>
            </EmailContainer>
          </Email>
          <Password>
            <Title>
              <Text size={17} type="bold">
                Password
              </Text>
            </Title>
            <PasswordContainer>
              <Input
                handleKeyDown={() => {
                  if (password === '••••••••••••') {
                    setPassword('')
                    setIsChanged(true)
                  }
                }}
                isError={isErrorPass}
                setInput={setPassword}
                type="password"
                value={password}
                width="436px"
              />
            </PasswordContainer>
          </Password>
        </ContentBlock>
        <SettingButton>
          <SaveContainer>
            {isLoadingSave ? (
              <LoaderContainer>
                <Loader>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                </Loader>
              </LoaderContainer>
            ) : (
              ''
            )}

            <SaveButton disabled={!isChanged} onClick={handleSubmit}>
              <Text color="#0F0F0F" size={15}>
                Save change
              </Text>
            </SaveButton>
          </SaveContainer>

          <DangerZone>
            <Text color="rgba(185, 90, 90, 0.8);" type="bold">
              Danger zone
            </Text>
            <DeleteButton>
              <Text color="rgba(255, 255, 255, 0.8)" size={15}>
                Delete account
              </Text>
            </DeleteButton>
          </DangerZone>
        </SettingButton>
      </SettingAccountContent>
    </AccountSettingContainer>
  )
}
