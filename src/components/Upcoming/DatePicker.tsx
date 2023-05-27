import AirDatepicker from 'air-datepicker'
import localeEn from 'air-datepicker/locale/en'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { ReactComponent as ArrowDownIcon } from '@/assets/icons/down.svg'

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  svg {
    position: absolute;
    left: 160px;
    cursor: pointer;
  }
`

const DateInput = styled.input`
  border: none;
  width: 40%;
  font-size: 32px;
  font-family: bold;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

type DatePickerProps = {
  selectedDateTime: number
  setSelectedDateTime: (value: number) => void
}

export const DatePicker = ({ selectedDateTime, setSelectedDateTime }: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const datepickerRef = useRef<any>(null)

  useEffect(() => {
    if (inputRef.current) {
      datepickerRef.current = new AirDatepicker(inputRef.current, {
        locale: localeEn,
        firstDay: 1,
        dateFormat: 'MMM yyyy',
        minDate: new window.Date(),
        selectedDates: [new window.Date(selectedDateTime)],
        autoClose: true,
        onSelect({ date, datepicker }: { date: Date | Date[]; datepicker: AirDatepicker }) {
          if (date) {
            setSelectedDateTime((date as Date).getTime())
            datepicker.setViewDate(date as Date)
          }
        }
      })
    }
  }, [selectedDateTime])

  const toggleDatePicker = () => {
    if (datepickerRef.current) {
      datepickerRef.current.show() // Show/hide the date picker based on the state
    }
  }

  return (
    <DatePickerContainer>
      <DateInput ref={inputRef} readOnly />
      <ArrowDownIcon onClick={toggleDatePicker} />
    </DatePickerContainer>
  )
}
