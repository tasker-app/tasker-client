export type DayOfWeek = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

export type CalendarDate = {
  day: DayOfWeek
  date: number
  time: number
  isOver: boolean
}
