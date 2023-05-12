import styled from 'styled-components'

import { ReactComponent as AddIcon } from '@/assets/icons/add.svg'
import { ReactComponent as CalendarIcon } from '@/assets/icons/calendar.svg'
import { ReactComponent as ChartIcon } from '@/assets/icons/chart.svg'
import { ReactComponent as DateIcon } from '@/assets/icons/date.svg'
import { ReactComponent as ExpandIcon } from '@/assets/icons/expand.svg'
import { Text } from '@/components/Common'

const NavContainer = styled.nav`
  width: 300px;
  height: 100vh;
  background-color: #fafafa;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 35px 15px;
  margin-left: 40px;
`

const NavOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const NavButton = styled.button`
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
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

const YourTeams = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  margin-top: 30px;
  transition: background-color 0.2s ease-in-out;
  padding: 4px 5px 4px 10px;
  cursor: pointer;

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

export const Nav = () => {
  return (
    <NavContainer>
      <NavOptions>
        <NavButton>
          <Flex>
            <CalendarIcon />
            <Text size={16}>Today</Text>
          </Flex>
          <Text color="#787878" size={16}>
            12
          </Text>
        </NavButton>
        <NavButton>
          <Flex>
            <DateIcon />
            <Text size={16}>Upcoming</Text>
          </Flex>
          <Text color="#787878" size={16}>
            20
          </Text>
        </NavButton>
        <NavButton>
          <Flex>
            <ChartIcon />
            <Text size={16}>Statistic</Text>
          </Flex>
        </NavButton>
      </NavOptions>

      <YourTeams>
        <Text size={16}>Your Teams</Text>
        <div className="FlexIcons">
          <AddIcon />
          <ExpandIcon />
        </div>
      </YourTeams>
    </NavContainer>
  )
}
