import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as AddIcon } from '@/assets/icons/add.svg'
import { ReactComponent as CalendarIcon } from '@/assets/icons/calendar.svg'
import { ReactComponent as ChartIcon } from '@/assets/icons/chart.svg'
import { ReactComponent as DateIcon } from '@/assets/icons/date.svg'
import { ReactComponent as ExpandIcon } from '@/assets/icons/expand.svg'
import { Text } from '@/components/Common'

const NavContainer = styled.nav<{ isNavOpen: boolean }>`
  width: ${(props) => (props.isNavOpen ? '300px' : '0')};
  height: 100vh;
  background-color: #fafafa;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  margin: 24px 0 0 40px;
  transition: width 0.2s ease-in-out;
`

const NavOptions = styled.div<{ isNavOpen?: boolean; isOptionDisplayed?: boolean }>`
  opacity: ${(props) => (props.isNavOpen ? '1' : '0')};
  display: ${(props) => (props.isOptionDisplayed ? 'flex' : 'none')};
  transition: opacity 0.2s ease-in-out;
  flex-direction: column;
  gap: 15px;
  padding: 35px 15px;
`

const NavButton = styled.button<{ isActive?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  background-color: transparent;
  border-radius: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

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

const YourTeams = styled.div<{ isNavOpen?: boolean; isOptionDisplayed?: boolean }>`
  display: ${(props) => (props.isOptionDisplayed ? 'flex' : 'none')};
  opacity: ${(props) => (props.isNavOpen ? '1' : '0')};
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  margin: 30px 15px 0 15px;
  transition: background-color, opacity 0.2s ease-in-out;
  cursor: pointer;
  padding: 5px 5px;

  &:hover {
    background-color: #e1e1e1;

    .FlexIcons {
      opacity: 1;
    }
  }

  .FlexIcons {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    gap: 10px;

    svg {
      cursor: pointer;
    }
  }
`

type NavProps = {
  isNavOpen: boolean
}

export const Nav = ({ isNavOpen }: NavProps) => {
  const [active, setActive] = useState('Today')
  const [isOptionDisplayed, setIsOptionDisplayed] = useState(false)

  useEffect(() => {
    if (isNavOpen) {
      setTimeout(() => {
        setIsOptionDisplayed(true)
      }, 200)
    } else {
      setIsOptionDisplayed(false)
    }
  }, [isNavOpen])

  const handleActive = (value: string) => {
    setActive(value)
  }

  return (
    <NavContainer isNavOpen={isNavOpen}>
      <NavOptions isNavOpen={isNavOpen} isOptionDisplayed={isOptionDisplayed}>
        <NavButton isActive={active === 'Today'} onClick={() => handleActive('Today')}>
          <Flex>
            <CalendarIcon />
            <Text size={16}>Today</Text>
          </Flex>
          <Text color="#787878" size={16}>
            12
          </Text>
        </NavButton>
        <NavButton isActive={active === 'Upcoming'} onClick={() => handleActive('Upcoming')}>
          <Flex>
            <DateIcon />
            <Text size={16}>Upcoming</Text>
          </Flex>
          <Text color="#787878" size={16}>
            20
          </Text>
        </NavButton>
        <NavButton isActive={active === 'Statistic'} onClick={() => handleActive('Statistic')}>
          <Flex>
            <ChartIcon />
            <Text size={16}>Statistic</Text>
          </Flex>
        </NavButton>
      </NavOptions>

      <YourTeams isNavOpen={isNavOpen} isOptionDisplayed={isOptionDisplayed}>
        <Text size={16}>Your Teams</Text>
        <div className="FlexIcons">
          <AddIcon />
          <ExpandIcon />
        </div>
      </YourTeams>
    </NavContainer>
  )
}
