import { CalendarDate, DayOfWeek } from '@/models/calendar'

const getDayAbbreviation = (day: number) => {
  const days: DayOfWeek[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return days[day]
}

const getWeekDates = (date: Date | number, offset: number) => {
  const currentDate = new Date(date)
  const currentDay = currentDate.getDay() // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

  const startDate = new Date(currentDate) // Clone the current date

  if (currentDay === 0) {
    offset -= 1
  }

  startDate.setDate(currentDate.getDate() - (currentDay - 1) + offset * 7) // Add or subtract the offset weeks

  const weekDates = []

  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(startDate)

    weekDate.setDate(startDate.getDate() + i)

    const calendarDate: CalendarDate = {
      day: getDayAbbreviation(weekDate.getDay()),
      date: weekDate.getDate(),
      time: weekDate.getTime(),
      isOver: weekDate < currentDate
    }

    weekDates.push(calendarDate)
  }

  return weekDates
}

const checkIsToday = (date: Date | number) => {
  const currentDate = new Date()
  const paramDate = new Date(date)

  return (
    currentDate.getDate() === paramDate.getDate() &&
    currentDate.getMonth() === paramDate.getMonth() &&
    currentDate.getFullYear() === paramDate.getFullYear()
  )
}

const checkSameDate = (date1: Date | number, date2: Date | number) => {
  const paramDate1 = new Date(date1)
  const paramDate2 = new Date(date2)

  return (
    paramDate1.getDate() === paramDate2.getDate() &&
    paramDate1.getMonth() === paramDate2.getMonth() &&
    paramDate1.getFullYear() === paramDate2.getFullYear()
  )
}

const getOffsetFromDate = (date: Date | number) => {
  const currentDate = new Date()
  const paramDate = new Date(date)

  const currentDay = (currentDate.getDay() + 6) % 7 // Convert Sunday (0) to 6, Monday (1) to 0, ..., Saturday (6) to 5
  const paramDay = (paramDate.getDay() + 6) % 7

  const currentWeekStartDate = new Date(currentDate)
  const paramWeekStartDate = new Date(paramDate)

  currentWeekStartDate.setDate(currentDate.getDate() - currentDay)
  paramWeekStartDate.setDate(paramDate.getDate() - paramDay)

  const currentWeekStartTime = currentWeekStartDate.getTime()
  const paramWeekStartTime = paramWeekStartDate.getTime()

  const offset = Math.floor((paramWeekStartTime - currentWeekStartTime) / (1000 * 60 * 60 * 24 * 7))

  return offset + 1
}

export { checkIsToday, checkSameDate, getOffsetFromDate, getWeekDates }
