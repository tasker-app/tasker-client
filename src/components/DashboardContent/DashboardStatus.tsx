import { FacebookShareButton } from 'react-share'
import styled from 'styled-components'

import ChairBackgroundImage from '@/assets/images/ChairBackgroundImage.webp'
import { Text } from '@/components/Common'
import { useTaskStore } from '@/stores'

const Center = styled.div<{ isStatusHidden: boolean }>`
  display: ${(props) => (props.isStatusHidden ? 'none' : 'flex')};
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

type DashboardStatusProps = {
  isStatusHidden: boolean
}

export const DashboardStatus = ({ isStatusHidden }: DashboardStatusProps) => {
  const [tasks] = useTaskStore((state) => [state.tasks])

  if (tasks.length !== 0) return null

  return (
    <Center isStatusHidden={isStatusHidden}>
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
  )
}
