import { create } from 'zustand'

import { Task as TaskType } from '@/models/task'

type TaskState = {
  tasks: TaskType[]
  addTask: (task: TaskType) => void
  deleteTask: (id: string) => void
  updateTask: (task: TaskType) => void
  completeTask: (id: string) => void
}

const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (task: TaskType) => set((state) => ({ tasks: [...state.tasks, task] })),
  deleteTask: (id: string) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    }))
  },
  updateTask: (task: TaskType) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t))
    }))
  },
  completeTask: (id: string) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    }))
  }
}))

export { useTaskStore }
