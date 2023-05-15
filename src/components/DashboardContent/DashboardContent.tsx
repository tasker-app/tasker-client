import { FacebookShareButton } from 'react-share'
import styled from 'styled-components'

import { ReactComponent as AddIcon } from '@/assets/icons/add.svg'
import { ReactComponent as FilterIcon } from '@/assets/icons/filter.svg'
import ChairBackgroundImage from '@/assets/images/ChairBackgroundImage.webp'
import { Text } from '@/components/Common'
import { DAYS_OF_WEEK, MONTHS } from '@/libs/constant'

const DashboardContentContainer = styled.section<{ isNavOpen: boolean }>`
  width: ${(props) => (props.isNavOpen ? 'calc(100vw - 120px - 300px)' : 'calc(100vw - 80px)')};
  margin: 24px auto;
  box-sizing: border-box;
  transition: width 0.2s ease-in-out;
`

const Content = styled.div`
  width: 100%;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

const Today = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e1e1e1;
  }
`

const AddTask = styled.button`
  display: flex;
  align-items: center;
  margin-top: 40px;
  gap: 8px;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  padding-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e1e1e1;
  }
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const ImageBackground = styled.div`
  width: 400px;
  height: 270px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ShareButton = styled.div`
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

type DashboardContentProps = {
  isNavOpen: boolean
}

export const DashboardContent = ({ isNavOpen }: DashboardContentProps) => {
  const currentDateFormatted = () => {
    const currentDate = new Date()

    const dayOfWeek = DAYS_OF_WEEK[currentDate.getDay()]
    const day = currentDate.getDate()
    const month = MONTHS[currentDate.getMonth()]

    return `${dayOfWeek} ${day} ${month}`
  }

  return (
    <DashboardContentContainer isNavOpen={isNavOpen}>
      <Content>
        <Flex>
          <Today>
            <Text size={32} type="bold">
              Today
            </Text>
            <Text color="#949494" size={16}>
              {currentDateFormatted()}
            </Text>
          </Today>

          <FilterButton>
            <FilterIcon />
            <Text color="#949494" size={16}>
              View
            </Text>
          </FilterButton>
        </Flex>

        <AddTask>
          <AddIcon />
          <Text size={16}>Add your task</Text>
        </AddTask>

        <Center>
          <ImageBackground>
            <img alt="background" loading="lazy" src={ChairBackgroundImage} />
          </ImageBackground>

          <Text size={20} type="bold">
            Enjoy your day, Toan.
          </Text>

          <Text color="#949494" size={16}>
            Today you completed 20 tasks. Share your awesomeness to friend
          </Text>

          <FacebookShareButton hashtag={'#Xem task tui ne'} url={'https://www.youtube.com/watch?v=niPkap1ozUA'}>
            <ShareButton>
              <Text color="#69B578" size={16}>
                Share #TaskerComplete
              </Text>
            </ShareButton>
          </FacebookShareButton>
        </Center>
      </Content>
    </DashboardContentContainer>
  )
}
