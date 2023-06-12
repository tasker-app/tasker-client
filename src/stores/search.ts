import { create } from 'zustand'

type SearchState = {
  search: string
  updateSearch: (newSearch: string) => void
}

const useSearchStore = create<SearchState>((set) => ({
  search: '',

  updateSearch: (newSearch: string) => {
    set(() => ({
      search: newSearch
    }))
  }
}))

export { useSearchStore }
