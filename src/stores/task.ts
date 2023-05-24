import { create } from 'zustand'

import { Task as TaskType } from '@/models/task'

type TaskState = {
  tasks: TaskType[]
  addTask: (task: TaskType) => void
  deleteTask: (id: string) => void
  updateTask: (task: TaskType) => void
  completeTask: (id: string) => void

  completedTasks: TaskType[]
  undo: () => void
}

const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  completedTasks: [],
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
    set((state) => {
      const task = state.tasks.find((task) => task.id === id)

      if (task) {
        return {
          tasks: state.tasks.filter((task) => task.id !== id),
          completedTasks: [...state.completedTasks, task]
        }
      }

      return state
    })
  },
  undo: () => {
    set((state) => {
      const task = state.completedTasks[state.completedTasks.length - 1]

      if (task) {
        return {
          tasks: [...state.tasks, task],
          completedTasks: state.completedTasks.filter((t) => t.id !== task.id)
        }
      }

      return state
    })
  }
}))

export { useTaskStore }
