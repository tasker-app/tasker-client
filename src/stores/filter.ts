import { create } from 'zustand'

type FilterState = {
  selectedSorting: string
  setSelectedSorting: (sorting: string) => void
  selectedOrdering: string
  setSelectedOrdering: (ordering: string) => void
  selectedPriority: string
  setSelectedPriority: (priority: string) => void
}

const useFilterStore = create<FilterState>((set) => ({
  selectedSorting: 'default',
  setSelectedSorting: (sorting: string) => set(() => ({ selectedSorting: sorting })),
  selectedOrdering: 'ascending',
  setSelectedOrdering: (ordering: string) => set(() => ({ selectedOrdering: ordering })),
  selectedPriority: 'default',
  setSelectedPriority: (priority: string) => set(() => ({ selectedPriority: priority }))
}))

export { useFilterStore }
