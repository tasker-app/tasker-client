import AirDatepicker from 'air-datepicker'
import localeEn from 'air-datepicker/locale/en'
import { useEffect, useId, useRef, useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as CalendarIcon } from '@/assets/icons/calendar.svg'

//#region style
const Date = styled.div<{ maxWidth: string | undefined }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  position: relative;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : '100%')};

  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 8px;
  }
`

const Input = styled.input`
  width: 68px;
  height: 32px;
  cursor: pointer;
  position: relative;
  padding-left: 32px;
  font-family: 'regular';
  color: #949494;
  background: #f9f8f8;
  border: 1px solid rgba(120, 120, 120, 0.5);
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: #f3f0f0;
  }

  &:focus {
    outline: none;
    background: #f3f0f0;
  }
`
//#endregion

type DatePickerProps = {
  maxWidth?: string
  dueDate: number
  addTime?: number
  setDueDate: (date: number) => void
}

export const DatePicker = ({ dueDate, setDueDate, maxWidth }: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const datepickerRef = useRef<any>(null)
  const containerId = useId()

  const [selectedDate, setSelectedDate] = useState<number>(new window.Date(dueDate).getTime())

  useEffect(() => {
    if (datepickerRef.current) {
      setSelectedDate(dueDate)
      datepickerRef.current.selectDate(new window.Date(dueDate))
    }
  }, [dueDate])

  useEffect(() => {
    if (inputRef.current) {
      datepickerRef.current = new AirDatepicker(inputRef.current, {
        container: (document.getElementById(containerId) as HTMLElement) || '.air-datepicker-global-container',
        locale: localeEn,
        firstDay: 1,
        dateFormat(date: Date) {
          const today = new window.Date()

          if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          ) {
            return 'Today'
          } else if (
            date.getDate() === today.getDate() + 1 &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          ) {
            return 'Tomorrow'
          } else {
            return date.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short'
            })
          }
        },
        minDate: new window.Date(),
        selectedDates: [new window.Date(selectedDate)],
        autoClose: true,
        onSelect({ date, datepicker }: { date: Date | Date[]; datepicker: AirDatepicker }) {
          if (date) {
            // set it to the end of the day
            const endOfDate = (date as Date).setHours(23, 59, 59, 999)

            setDueDate(endOfDate)
            setSelectedDate(endOfDate)
            datepicker.setViewDate(endOfDate)
          }
        }
      })
    }
  }, [])

  return (
    <Date id={containerId} maxWidth={maxWidth}>
      <Input ref={inputRef} readOnly />
      <CalendarIcon />
    </Date>
  )
}
