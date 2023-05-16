const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const SORTING_LIST = [
  { value: 'default', label: 'Default' },
  { value: 'name', label: 'Name' },
  { value: 'priority', label: 'Priority' },
  { value: 'date', label: 'Date' }
]

const ORDERING_LIST = [
  { value: 'ascending', label: 'Ascending' },
  { value: 'descending', label: 'Descending' }
]

const PRIORITY_LIST = [
  { value: 'default', label: 'Default' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
]

export { DAYS_OF_WEEK, MONTHS, ORDERING_LIST, PRIORITY_LIST, SORTING_LIST }
