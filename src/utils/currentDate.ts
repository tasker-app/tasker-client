import { DAYS_OF_WEEK, MONTHS } from '@/libs/constant'

const currentDateFormatted = () => {
  const currentDate = new Date()

  const dayOfWeek = DAYS_OF_WEEK[currentDate.getDay()]
  const day = currentDate.getDate()
  const month = MONTHS[currentDate.getMonth()]

  return `${dayOfWeek} ${day} ${month}`
}

export { currentDateFormatted }
