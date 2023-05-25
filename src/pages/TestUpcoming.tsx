import { useState } from 'react'

import { Week } from '@/components/Upcoming'
import { getWeekDates } from '@/utils'

const TestUpcoming = () => {
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

  return (
    <div>
      <Week selectedDateTime={selectedDateTime} setSelectedDateTime={setSelectedDateTime} weekDates={weekDates} />
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default TestUpcoming
