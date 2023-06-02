import { useRef } from 'react'
import styled from 'styled-components'

import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg'
import { useNavStore, useSearchStore } from '@/stores'

const SearchBarContainer = styled.div`
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
    height: 32px;
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

export const SearchBar = () => {
  const [setActiveNavbar, setActive] = useNavStore((state) => [state.updateActiveNavbar, state.updateActive])
  const [updateSearch] = useSearchStore((state) => [state.updateSearch])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputRef.current?.value) {
      setActive('Searching')
      setActiveNavbar('Searching')
      updateSearch(inputRef.current.value)
    }
  }

  return (
    <SearchBarContainer onKeyDown={handleSearch}>
      <SearchIcon onClick={() => setActiveNavbar('Searching')} />
      <input ref={inputRef} placeholder="Task ABC" type="text" />
    </SearchBarContainer>
  )
}
