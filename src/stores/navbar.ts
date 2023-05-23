import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type NavBarState = {
  navbar: string[]
  updateNavBar: (newNav: string[]) => void
}

const useNavStore = create<NavBarState>()(
  persist(
    (set) => ({
      navbar: ['Today', 'Upcoming', 'Overdue', 'Statistic'],

      updateNavBar: (newNav: string[]) => {
        set(() => ({
          navbar: newNav
        }))
      }
    }),
    {
      name: 'navbar-storage'
    }
  )
)

export { useNavStore }
