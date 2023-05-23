import 'react-toastify/dist/ReactToastify.css'

import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import styled from 'styled-components'

import { ReactComponent as CalendarIcon } from '@/assets/icons/calendar.svg'
import { ReactComponent as ChartIcon } from '@/assets/icons/chart.svg'
import { ReactComponent as DateIcon } from '@/assets/icons/date.svg'
import { ReactComponent as OverdueIcon } from '@/assets/icons/overdue.svg'
import { CheckBox } from '@/components/CheckBox'
import { Text } from '@/components/Common/Text'
import { useNavStore } from '@/stores'
const SideBarSettingContainer = styled.div`
  height: 100%;
`
const Header = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 1px solid rgba(148, 148, 148, 0.6);
`
const HeaderContent = styled.div`
  margin: 24px 0 15px 40px;
`
const SettingSideBarContent = styled.div`
  padding: 40px;
  align-content: space-between;
  display: grid;
  height: 77%;
`
const ContentBlock = styled.div``
const SettingContainer = styled.div`
  margin-bottom: 25px;
`
const Title = styled.div``
const SideBarSettingContent = styled.div`
  margin-top: 14px;
  display: grid;
  align-items: center;
  gap: 17px;
`
const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 3px;
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

export const SideBarSetting = () => {
  const [navbar, updateNavBar] = useNavStore((state) => [state.navbar, state.updateNavBar])
  const [isLoadingSave, setIsLoadingSave] = useState(false)
  const [isCheckToday, setIsCheckToday] = useState<boolean>(navbar.includes('Today'))
  const [isCheckUpcoming, setIsCheckUpcoming] = useState<boolean>(navbar.includes('Upcoming'))
  const [isCheckOverdue, setIsCheckOverdue] = useState<boolean>(navbar.includes('Overdue'))
  const [isCheckStatistic, setIsCheckStatistic] = useState<boolean>(navbar.includes('Statistic'))
  const [isChanged, setIsChanged] = useState(false)
  const notify = () =>
    toast.error('At least one is chosen', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
  const handleSubmit = () => {
    setIsLoadingSave(true)

    const allNav: string[] = []

    if (isCheckToday) {
      allNav.push('Today')
    }
    if (isCheckUpcoming) {
      allNav.push('Upcoming')
    }
    if (isCheckOverdue) {
      allNav.push('Overdue')
    }
    if (isCheckStatistic) {
      allNav.push('Statistic')
    }
    if (allNav.length === 0) {
      notify()
    } else {
      updateNavBar(allNav)
    }
    setIsLoadingSave(false)
  }

  return (
    <SideBarSettingContainer>
      <ToastContainer />

      <Header>
        <HeaderContent>
          <Text size={25} type="bold">
            Sidebar
          </Text>
        </HeaderContent>
      </Header>
      <SettingSideBarContent>
        <ContentBlock>
          <SettingContainer>
            <Title>
              <Text size={17} type="bold">
                Show in Sidebar
              </Text>
            </Title>
            <SideBarSettingContent>
              <Nav>
                <CheckBox
                  height="16px"
                  isChecked={isCheckToday}
                  width="16px"
                  onChecked={setIsCheckToday}
                  onClick={() => setIsChanged(true)}
                />
                <CalendarIcon />
                <Text size={16}>Today</Text>
              </Nav>
              <Nav>
                <CheckBox
                  height="16px"
                  isChecked={isCheckUpcoming}
                  width="16px"
                  onChecked={setIsCheckUpcoming}
                  onClick={() => setIsChanged(true)}
                />
                <DateIcon />
                <Text size={16}>Upcoming</Text>
              </Nav>
              <Nav>
                <CheckBox
                  height="16px"
                  isChecked={isCheckOverdue}
                  width="16px"
                  onChecked={setIsCheckOverdue}
                  onClick={() => setIsChanged(true)}
                />
                <OverdueIcon />
                <Text size={16}>Overdue</Text>
              </Nav>
              <Nav>
                <CheckBox
                  height="16px"
                  isChecked={isCheckStatistic}
                  width="16px"
                  onChecked={setIsCheckStatistic}
                  onClick={() => {
                    setIsChanged(true)
                  }}
                />
                <ChartIcon />
                <Text size={16}>Statistic</Text>
              </Nav>
            </SideBarSettingContent>
          </SettingContainer>
        </ContentBlock>
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
      </SettingSideBarContent>
    </SideBarSettingContainer>
  )
}
