import styled from 'styled-components'

import { TaskPreview } from '@/components/TaskPreview'
import { useTaskStore } from '@/stores'

const Container = styled.div`
  overflow-x: hidden;
`

export const ListTask = () => {
  const [tasks] = useTaskStore((state) => [state.tasks])

  return (
    <Container>
      {tasks.map((task) => (
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
