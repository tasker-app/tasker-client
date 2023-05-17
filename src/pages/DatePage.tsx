import styled from 'styled-components'

import { DatePicker } from '@/components/DatePicker'

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 20px;
  }
`

const DatePage = () => {
  return (
    <Page>
      <h1>Date Page</h1>
      <DatePicker />
    </Page>
  )
}

export default DatePage
