import styled from 'styled-components'

import { Text } from '@/components/Common'
import { CalendarDate } from '@/models/calendar'
import { checkIsToday, checkSameDate } from '@/utils'

const Container = styled.div`
  height: 60px;
  display: grid;
  grid-template-columns: repeat(7, 12%);
  grid-template-rows: 100%;
  align-items: center;
  justify-content: center;
  /* border: 1px solid rgba(148, 148, 148, 0.6); */
`

const Day = styled.button<{ isOver: boolean; isSelected: boolean }>`
  border: none;
  background-color: transparent;
  outline: none;
  cursor: ${({ isOver }) => (isOver ? 'not-allowed' : 'pointer')};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  opacity: ${({ isOver }) => (isOver ? 0.3 : 1)};
  border-bottom: ${({ isSelected }) => (isSelected ? '1px solid #000000' : '1px solid transparent')};
  transition: background-color 0.3s ease;

  &:hover {
    ${({ isOver }) => !isOver && 'background-color: rgba(148, 148, 148, 0.2);'}
  }
`

const Dot = styled.div<{ isToday: boolean }>`
  display: ${({ isToday }) => (isToday ? 'block' : 'none')};
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #000000;
`

type WeekProps = {
  weekDates: CalendarDate[]
  selectedDateTime: number
  setSelectedDateTime: (value: number) => void
}

export const Week = ({ weekDates, selectedDateTime, setSelectedDateTime }: WeekProps) => {
  return (
    <Container>
      {weekDates.map((date, index) => {
        return (
          <Day
            key={index}
            isOver={date.isOver}
            isSelected={checkSameDate(date.time, selectedDateTime)}
            onClick={() => (date.isOver ? null : setSelectedDateTime(date.time))}
          >
            <Text color="#000000" size={16}>
              {date.day}
            </Text>
            <Text color="#787878" size={16} type="bold">
              {date.date.toString()}
            </Text>
            <Dot isToday={checkIsToday(date.time)} />
          </Day>
        )
      })}
    </Container>
  )
}
