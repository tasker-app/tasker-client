const calculateRemainingDays = (dueDate: number) => {
  const now = new Date()
  const due = new Date(dueDate)
  const timeDiff = due.getTime() - now.getTime()
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)) // Convert milliseconds to days

  if (daysRemaining === 0) {
    return 'Due today'
  } else if (daysRemaining > 0) {
    return `Due in ${daysRemaining} day${daysRemaining > 1 ? 's' : ''}`
  } else {
    return `Overdue by ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) > 1 ? 's' : ''}`
  }
}

export { calculateRemainingDays }
