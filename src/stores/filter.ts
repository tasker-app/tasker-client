import { create } from 'zustand'

import { Order as OrderType, Priority as PriorityType, Sort as SortType } from '@/models/task'

type FilterState = {
  selectedSorting: SortType
  setSelectedSorting: (sorting: SortType) => void
  selectedOrdering: OrderType
  setSelectedOrdering: (ordering: OrderType) => void
  selectedPriority: PriorityType
  setSelectedPriority: (priority: PriorityType) => void
}

const useFilterStore = create<FilterState>((set) => ({
  selectedSorting: 'default',
  setSelectedSorting: (sorting: SortType) => set(() => ({ selectedSorting: sorting })),
  selectedOrdering: 'ascending',
  setSelectedOrdering: (ordering: OrderType) => set(() => ({ selectedOrdering: ordering })),
  selectedPriority: 'default',
  setSelectedPriority: (priority: PriorityType) => set(() => ({ selectedPriority: priority }))
}))

export { useFilterStore }
