export type Task = {
  id: string
  name: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'default'
  dueDate: number
}
