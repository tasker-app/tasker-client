import AirDatepicker from 'air-datepicker'
import localeEn from 'air-datepicker/locale/en'
import { useEffect, useRef } from 'react'
// import styled from 'styled-components'

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

  return (
    <div>
      <input ref={inputRef} readOnly />
    </div>
  )
}
