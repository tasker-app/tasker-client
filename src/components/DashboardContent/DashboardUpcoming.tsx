import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as NextIcon } from '@/assets/icons/next.svg'
import { ReactComponent as PrevIcon } from '@/assets/icons/prev.svg'
import { DatePicker, Week } from '@/components/Upcoming'
import { getOffsetFromDate, getWeekDates } from '@/utils'

const DateOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
`

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`

const PrevAndNext = styled.div`
  border: 1px solid #94949499;
  border-radius: 8px;
  position: relative;
`

const OptionsButton = styled.button<{ isToday?: number }>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 7px 15px 4px 15px;
  box-sizing: border-box;

  &:first-child {
    border-radius: 7px 0 0 7px;
    transition: background-color 0.2s ease-in-out;
    border-right: 1px solid #94949499;

    &:hover {
      background-color: #a59f9f99;
    }
  }

  &:last-child {
    border-radius: 0 7px 7px 0;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #a59f9f99;
    }
  }

  svg {
    width: 20px;
    height: 20px;
    filter: ${({ isToday }) =>
      isToday === 0
        ? ' brightness(0) saturate(100%) invert(20%) sepia(7%) saturate(1124%) hue-rotate(187deg) brightness(88%) contrast(90%)'
        : ' '};
  }
`

const TodayButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 9px 20px;
  box-sizing: border-box;
  border: 1px solid #94949499;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #a59f9f99;
  }
`

export const DashboardUpcoming = () => {
  const [offset, setOffset] = useState(0)
  const [selectedDateTime, setSelectedDateTime] = useState<number>(new Date().getTime())
  const weekDates = getWeekDates(new Date(), offset)

  const handlePrev = () => {
    if (offset > 0) {
      setOffset((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    setOffset((prev) => prev + 1)
  }

  const handleGoToToday = () => {
    setOffset(0)
    setSelectedDateTime(new Date().getTime())
  }

  useEffect(() => {
    setOffset(getOffsetFromDate(selectedDateTime))
  }, [selectedDateTime])

  return (
    <>
      <DateOptions>
        <DatePicker selectedDateTime={selectedDateTime} setSelectedDateTime={setSelectedDateTime} />
        <OptionsContainer>
          <PrevAndNext>
            <OptionsButton isToday={offset} onClick={handlePrev}>
              <PrevIcon />
            </OptionsButton>
            <OptionsButton onClick={handleNext}>
              <NextIcon />
            </OptionsButton>
          </PrevAndNext>
          <TodayButton onClick={handleGoToToday}>Today</TodayButton>
        </OptionsContainer>
      </DateOptions>
      <Week selectedDateTime={selectedDateTime} setSelectedDateTime={setSelectedDateTime} weekDates={weekDates} />
    </>
  )
}
