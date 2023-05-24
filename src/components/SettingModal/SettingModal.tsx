import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { ReactComponent as ClockIcon } from '@/assets/icons/clock.svg'
import { ReactComponent as SideBarIcon } from '@/assets/icons/sidebar.svg'
import { ReactComponent as UserIcon } from '@/assets/icons/user-circle.svg'
import { ReactComponent as WalletIcon } from '@/assets/icons/wallet.svg'
import { Text } from '@/components/Common'
import { AccountSetting } from '@/components/SettingModal/AccountSetting'
import { ReminderSetting } from '@/components/SettingModal/ReminderSetting'
import { SideBarSetting } from '@/components/SettingModal/SideBarSetting'
import { SubscriptionSetting } from '@/components/SettingModal/SubscriptionSetting'

import { AlertModal } from './AlertModal'

//#region styles
const ModalOverlay = styled.div<{ isOpenSetting: boolean }>`
  ${(props) => (props.isOpenSetting ? 'display: block' : 'display: none')};
  position: fixed;
  background: rgba(32, 31, 31, 0.4);
  width: 100vw;
  height: 100vh;
`

const ModalWrapper = styled.div<{ isOpenSetting: boolean }>`
  ${(props) => (props.isOpenSetting ? 'display: block' : 'display: none')};
  width: 1000px;
  height: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 8px;
`
const ModalContent = styled.div`
  width: 100%;
  height: 100%;
`

const FlexBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const OptionBlock = styled.div`
  width: 30%;
  height: 100%;
  border-radius: 50%;
  background: #fafafa;
  box-shadow: 4px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px 0px 0px 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const ContentBlock = styled.div`
  width: 70%;
  height: 100%;
`

const NavButton = styled.button<{ isActive?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border: none;
  background-color: transparent;
  border-radius: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #e1e1e1;
  }

  ${(props) =>
    props.isActive &&
    `
    background-color: #e1e1e1;
  `}
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`
const Title = styled.div`
  position: relative;
  width: 100%;
  margin: 24px 0 15px 21px;
`
const Options = styled.div`
  position: relative;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  padding-left: 10px;
  padding-right: 10px;
  gap: 10px;
  display: grid;
`
const Tag = styled.div`
  width: 80px;
  height: 19px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
  background: #faead1;
  border-radius: 4px;
  margin-left: 10px;
`
//#endregion

type ModalProps = {
  isOpenSetting: boolean
  handleClose: () => void
}
export const SettingModal = ({ isOpenSetting, handleClose }: ModalProps) => {
  const [active, setActive] = useState('Account')
  const [value, setValue] = useState('Account')

  const [isAccountChanged, setIsAccountChanged] = useState(false)
  const [isSideBarChanged, setIsSideBarChanged] = useState(false)
  const [isAgreeSwitchTab, setIsAgreeSwitchTab] = useState(false)

  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleActive = (value: string) => {
    setValue(value)
  }

  useEffect(() => {
    if (value !== 'Account' && isAccountChanged === true) {
      setIsOpenAlert(true)
      if (isAgreeSwitchTab === true) {
        setActive(value)
      } else return
    } else setIsOpenAlert(false)
    setActive(value)
  }, [value, isAgreeSwitchTab])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        (isAccountChanged || isSideBarChanged)
      ) {
        setIsOpenAlert(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isAccountChanged, isSideBarChanged])

  useEffect(() => {
    if (isOpenSetting) setActive('Account')
  }, [isOpenSetting])

  if (!isOpenSetting) return null

  return createPortal(
    <>
      <ModalOverlay isOpenSetting={isOpenSetting} onClick={handleClose} />
      <ModalWrapper isOpenSetting={isOpenSetting}>
        <ModalContent ref={modalRef}>
          <FlexBlock>
            <OptionBlock>
              <Title>
                <Text size={25} type="bold">
                  Settings
                </Text>
              </Title>
              <Options>
                <NavButton isActive={active === 'Account'} onClick={() => handleActive('Account')}>
                  <Flex>
                    <UserIcon />
                    <Text size={16}>Account</Text>
                  </Flex>
                </NavButton>
                <NavButton isActive={active === 'Subscription'} onClick={() => handleActive('Subscription')}>
                  <Flex>
                    <WalletIcon />
                    <Text size={16}>Subscription</Text>
                  </Flex>
                </NavButton>
                <NavButton isActive={active === 'Sidebar'} onClick={() => handleActive('Sidebar')}>
                  <Flex>
                    <SideBarIcon />
                    <Text size={16}>Sidebar</Text>
                  </Flex>
                </NavButton>
                <NavButton isActive={active === 'Reminder'} onClick={() => handleActive('Reminder')}>
                  <Flex>
                    <ClockIcon />
                    <Text size={16}>Reminder</Text>
                    <Tag>
                      <Text color=" #8F4700" size={10}>
                        PREMIUM ONLY
                      </Text>
                    </Tag>
                  </Flex>
                </NavButton>
              </Options>
            </OptionBlock>
            <ContentBlock>
              {active === 'Account' ? (
                <AccountSetting isChanged={isAccountChanged} setIsChanged={setIsAccountChanged} />
              ) : active === 'Subscription' ? (
                <SubscriptionSetting />
              ) : active === 'Sidebar' ? (
                <SideBarSetting isChanged={isSideBarChanged} setIsChanged={setIsSideBarChanged} />
              ) : active === 'Reminder' ? (
                <ReminderSetting />
              ) : (
                ''
              )}
            </ContentBlock>
          </FlexBlock>
        </ModalContent>
      </ModalWrapper>
      <AlertModal
        handleAlertClose={() => {
          setIsOpenAlert(false)
          setIsAccountChanged(false)
          setIsSideBarChanged(false)
        }}
        handleClose={() => setIsAgreeSwitchTab(true)}
        isOpen={isOpenAlert}
      />
    </>,
    document.getElementById('portal-settingmodal') as HTMLElement
  )
}
