export type Sort = 'default' | 'name' | 'date' | 'priority'

export type Order = 'ascending' | 'descending'

export type Priority = 'default' | 'low' | 'medium' | 'high'

export type Task = {
  id: string
  name: string
  description: string
  priority: Priority
  dueDate: number
}
