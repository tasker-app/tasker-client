import styled from 'styled-components'

import SearchNotFoundImage from '@/assets/images/SearchNotFound.webp'
import { Text } from '@/components/Common'
import { TaskPreview } from '@/components/TaskPreview'
import { useNavStore, useSearchStore, useTaskStore } from '@/stores'

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const TextResultContainer = styled.div`
  background-color: #d9d9d9;
  border-radius: 12px;
  width: fit-content;
  padding: 9px 31px;
  box-sizing: border-box;
`

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`

const HomeButton = styled.button`
  margin-top: 35px;
  width: fit-content;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const DashboardSearching = () => {
  const [search] = useSearchStore((state) => [state.search])
  const [tasks] = useTaskStore((state) => [state.tasks])
  const [setActiveNavbar, setActive] = useNavStore((state) => [state.updateActiveNavbar, state.updateActive])

  const matchedTasks = tasks.filter((task) => task.name.includes(search))

  const handleHomeButtonClick = () => {
    setActive('Today')
    setActiveNavbar('Today')
  }

  return (
    <SearchContainer>
      <Text size={32} type="bold">
        Search results for “{search}”
      </Text>
      {matchedTasks.length > 0 ? (
        <>
          <TextResultContainer>
            <Text size={16}>Found</Text>
            <Text color="#B95A5A" size={16}>
              {' '}
              {matchedTasks.length === 1 ? '1 task' : `${matchedTasks.length} tasks`}
            </Text>
          </TextResultContainer>
          {matchedTasks.map((task) => (
            <TaskPreview
              key={task.id}
              description={task.description}
              dueDate={task.dueDate}
              id={task.id}
              name={task.name}
              priority={task.priority}
            />
          ))}
        </>
      ) : (
        <NotFoundContainer>
          <NotFound>
            <div>
              <img alt="Search not found" src={SearchNotFoundImage} />
            </div>
            <Text size={20} type="bold">
              No matches for “{search}”
            </Text>
          </NotFound>

          <HomeButton onClick={handleHomeButtonClick}>
            <Text color="#787878">Return Home</Text>
          </HomeButton>
        </NotFoundContainer>
      )}
    </SearchContainer>
  )
}
