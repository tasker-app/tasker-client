import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { ReactComponent as SettingIcon } from '@/assets/icons/setting.svg'
import { ReactComponent as SignOutIcon } from '@/assets/icons/signout.svg'
import { ReactComponent as StarIcon } from '@/assets/icons/star.svg'
import DefaultAvatar from '@/assets/images/DefaultAvatar.webp'
import { Text } from '@/components/Common'

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
  position: fixed;
  width: 100vw;
  height: 100vh;
`

const ModalWrapper = styled.div<{ isOpen: boolean }>`
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
  position: absolute;
  width: 300px;
  top: 88px;
  right: 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0px 4px 7px 5px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  padding: 20px 12px;
`
const ModalContent = styled.div``

const Flex = styled.div`
  display: flex;
  gap: 15px;
`
const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const FlexText = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 5px;
`

const ModalOptions = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`

const ModalOptionButton = styled.button<{ logOut?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  background-color: transparent;
  padding: 8px 0 8px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.logOut ? '#ECB4B4' : '#D9D9D9')};
  }
`

type ModalProps = {
  isOpen: boolean
  handleClose: () => void
}
export const UserModal = ({ isOpen, handleClose }: ModalProps) => {
  if (!isOpen) return null

  return createPortal(
    <>
      <ModalOverlay isOpen={isOpen} onClick={handleClose} />
      <ModalWrapper isOpen={isOpen}>
        <ModalContent>
          <Flex>
            <Avatar>
              <img alt="avatar" loading="lazy" src={DefaultAvatar} />
            </Avatar>
            <FlexText>
              <Text type="bold">Hoang Tien Thinh</Text>
              <Text color="#787878" type="regular">
                tienthinh@gmail.com
              </Text>
            </FlexText>
          </Flex>

          <ModalOptions>
            <ModalOptionButton>
              <SettingIcon />
              <Text>Setting</Text>
            </ModalOptionButton>
            <ModalOptionButton>
              <StarIcon />
              <Text>Upgrade to Premium</Text>
            </ModalOptionButton>
            <ModalOptionButton logOut>
              <SignOutIcon />
              <Text>Log out</Text>
            </ModalOptionButton>
          </ModalOptions>
        </ModalContent>
      </ModalWrapper>
    </>,
    document.getElementById('portal')!
  )
}
