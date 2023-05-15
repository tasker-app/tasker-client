import { FacebookShareButton } from 'react-share'
import styled from 'styled-components'

import { ReactComponent as AddIcon } from '@/assets/icons/add.svg'
import { ReactComponent as FilterIcon } from '@/assets/icons/filter.svg'
import ChairBackgroundImage from '@/assets/images/ChairBackgroundImage.webp'
import { Text } from '@/components/Common'

const NavContentContainer = styled.section`
  width: 100%;
  margin-top: 24px;
  box-sizing: border-box;
  padding: 40px 50px 40px 10px;
  grid-area: 1 / 2 / 2 / 6;
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

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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

const ShareButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const NavContent = () => {
  const currentDateFormatted = () => {
    const currentDate = new Date()
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const dayOfWeek = daysOfWeek[currentDate.getDay()]
    const day = currentDate.getDate()
    const month = months[currentDate.getMonth()]

    return dayOfWeek + ' ' + day + ' ' + month
  }

  return (
    <NavContentContainer>
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

          <Filter>
            <FilterIcon />
            <Text color="#949494" size={16}>
              View
            </Text>
          </Filter>
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
    </NavContentContainer>
  )
}
