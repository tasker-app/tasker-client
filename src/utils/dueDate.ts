const calculateRemainingDays = (dueDate: number) => {
  const now = new Date()
  const due = new Date(dueDate)
  const timeDiff = due.getTime() - now.getTime()
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)) // Convert milliseconds to days

  if (daysRemaining <= 1) {
    return 'Due today'
  } else if (daysRemaining === 2) {
    return 'Due tomorrow'
  } else if (daysRemaining > 2) {
    return `Due in ${daysRemaining} days`
  } else {
    return `Overdue by ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) > 1 ? 's' : ''}`
  }
}

const moveToEndOfDate = (dueDate: number) => {
  // move to the end of day: 23:59:59
  const due = new Date(dueDate)

  due.setHours(23)
  due.setMinutes(59)
  due.setSeconds(59)

  return due.getTime()
}

export { calculateRemainingDays, moveToEndOfDate }
