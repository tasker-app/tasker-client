import styled from 'styled-components'

import { CompleteToast } from '@/components/CompleteToast'

import { DashboardToday } from './DashboardToday'
import { DashboardUpcoming } from './DashboardUpcoming'

const DashboardContentContainer = styled.section<{ isNavOpen: boolean }>`
  width: ${(props) => (props.isNavOpen ? 'calc(100vw - 120px - 300px)' : 'calc(100vw - 80px)')};
  margin: 24px auto;
  box-sizing: border-box;
  transition: width 0.2s ease-in-out;
`

const Content = styled.div`
  width: 100%;
`

type DashboardContentProps = {
  isNavOpen: boolean
  activeNavbar: string
}

export const DashboardContent = ({ isNavOpen, activeNavbar }: DashboardContentProps) => {
  return (
    <DashboardContentContainer isNavOpen={isNavOpen}>
      <Content>
        {activeNavbar === 'Today' && <DashboardToday />}
        {activeNavbar === 'Upcoming' && (
          <div>
            <DashboardUpcoming />
          </div>
        )}
        {activeNavbar === 'Overdue' && <div>Completed</div>}
        {activeNavbar === 'Statistic' && <div>Statistic</div>}
      </Content>
      <CompleteToast />
    </DashboardContentContainer>
  )
}
