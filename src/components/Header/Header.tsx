import { useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as HomeIcon } from '@/assets/icons/home.svg'
import { ReactComponent as MenuIcon } from '@/assets/icons/menu.svg'
import { ReactComponent as QuestionIcon } from '@/assets/icons/question.svg'
import { ReactComponent as StarIcon } from '@/assets/icons/star.svg'
import DefaultAvatar from '@/assets/images/DefaultAvatar.webp'
import { CustomTooltip, Text } from '@/components/Common'
import { UserModal } from '@/components/UserModal'

import { SearchBar } from './SearchBar'

const StyledHeader = styled.header`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: #efefef;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
`
const NavigationAndSearch = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
`

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`

const NavigationButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #d9d9d9;
  }

  svg {
    padding: 4px;
  }
`

const ButtonAndAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`

const Button = styled.button`
  width: 180px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(180deg, #6fb9e3 0%, rgba(137, 125, 208, 0.43) 100%);
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
    transform: scale(1.05);
  }
`

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    opacity: 0.8;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const AvatarModalButton = styled.button`
  border: none;
  position: relative;
  background-color: transparent;
`

type HeaderProps = {
  handleNavToggle?: () => void
}

export const Header = ({ handleNavToggle }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <StyledHeader>
      <NavigationAndSearch>
        <Navigation>
          <CustomTooltip content="Toggle Menu">
            <NavigationButton onClick={handleNavToggle}>
              <MenuIcon />
            </NavigationButton>
          </CustomTooltip>
          <CustomTooltip content="Home">
            <NavigationButton>
              <HomeIcon />
            </NavigationButton>
          </CustomTooltip>
          <CustomTooltip content="Help & Feedback">
            <NavigationButton>
              <QuestionIcon />
            </NavigationButton>
          </CustomTooltip>
        </Navigation>

        <SearchBar />
      </NavigationAndSearch>
      <ButtonAndAvatar>
        <Button>
          <StarIcon />
          <Text size={12}>Upgrade to Premium</Text>
        </Button>

        <AvatarModalButton onClick={() => setIsOpen(true)}>
          <Avatar>
            <img alt="Avatar" loading="lazy" src={DefaultAvatar} />
          </Avatar>
        </AvatarModalButton>
      </ButtonAndAvatar>
      <UserModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />
    </StyledHeader>
  )
}
