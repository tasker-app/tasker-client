import { useMemo } from 'react'
import styled from 'styled-components'

import { TaskPreview } from '@/components/TaskPreview'
import { Task as TaskType } from '@/models/task'
import { useFilterStore, useTaskStore } from '@/stores'

const Container = styled.div`
  overflow-x: hidden;
`

export const ListTask = () => {
  const [tasks] = useTaskStore((state) => [state.tasks])
  const [selectedSorting, selectedOrdering, selectedPriority] = useFilterStore((state) => [
    state.selectedSorting,
    state.selectedOrdering,
    state.selectedPriority
  ])

  const sortTasks = useMemo(() => {
    return (tasks: TaskType[]) => {
      if (selectedSorting === 'name') {
        return tasks.slice().sort((a, b) => {
          if (selectedOrdering === 'ascending') {
            return a.name.localeCompare(b.name)
          } else {
            return b.name.localeCompare(a.name)
          }
        })
      } else if (selectedSorting === 'date') {
        return tasks.slice().sort((a, b) => {
          if (selectedOrdering === 'ascending') {
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          } else {
            return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
          }
        })
      } else if (selectedSorting === 'priority') {
        return tasks.slice().sort((a, b) => {
          const priorityOrder = {
            default: 0,
            low: 1,
            medium: 2,
            high: 3
          }

          if (selectedOrdering === 'ascending') {
            return priorityOrder[a.priority] - priorityOrder[b.priority]
          } else {
            return priorityOrder[b.priority] - priorityOrder[a.priority]
          }
        })
      }

      return tasks.slice()
    }
  }, [selectedSorting, selectedOrdering])

  const filteredTasks = tasks.filter((task) => selectedPriority === 'default' || task.priority === selectedPriority)

  const sortedTasks = sortTasks(filteredTasks)

  const displayedTasks = selectedSorting !== 'default' ? sortedTasks : filteredTasks

  return (
    <Container>
      {displayedTasks.map((task) => (
        <TaskPreview
          key={task.id}
          description={task.description}
          dueDate={task.dueDate}
          id={task.id}
          name={task.name}
          priority={task.priority}
        />
      ))}
    </Container>
  )
}
