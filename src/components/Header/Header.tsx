import styled from 'styled-components'

import { ReactComponent as HomeIcon } from '@/assets/icons/home.svg'
import { ReactComponent as MenuIcon } from '@/assets/icons/menu.svg'
import { ReactComponent as QuestionIcon } from '@/assets/icons/question.svg'
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg'
import { ReactComponent as StarIcon } from '@/assets/icons/star.svg'
import DefaultAvatar from '@/assets/images/DefaultAvatar.webp'

import { Text } from '../Common'

const StyledHeader = styled.header`
  background-color: #efefef;
  height: 80px;
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

  &:hover {
    background-color: #d9d9d9;
    border-radius: 8px;
  }

  svg {
    padding: 8px;
  }
`

const SearchBar = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  input {
    width: 175px;
    height: 30px;
    border-radius: 8px;
    border: none;
    background-color: #d9d9d9;
    padding-left: 35px;
    font-family: 'Regular';

    &:focus {
      outline: none;
    }
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
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Header = () => {
  return (
    <StyledHeader>
      <NavigationAndSearch>
        <Navigation>
          <NavigationButton>
            <MenuIcon />
          </NavigationButton>
          <NavigationButton>
            <HomeIcon />
          </NavigationButton>
          <NavigationButton>
            <QuestionIcon />
          </NavigationButton>
        </Navigation>

        <SearchBar>
          <SearchIcon />
          <input placeholder="Task ABC" type="text" />
        </SearchBar>
      </NavigationAndSearch>

      <ButtonAndAvatar>
        <Button>
          <StarIcon />
          <Text size={12}>Upgrade to Premium</Text>
        </Button>

        <Avatar>
          <img alt="Avatar" loading="lazy" src={DefaultAvatar} />
        </Avatar>
      </ButtonAndAvatar>
    </StyledHeader>
  )
}
