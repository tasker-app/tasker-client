import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type NavBarState = {
  navbar: string[]
  updateNavBar: (newNav: string[]) => void
  activeNavbar: string
  updateActiveNavbar: (newActive: string) => void
  active: string
  updateActive: (newActive: string) => void
}

const useNavStore = create<NavBarState>()(
  persist(
    (set) => ({
      navbar: ['Today', 'Upcoming', 'Overdue', 'Statistic'],

      updateNavBar: (newNav: string[]) => {
        set(() => ({
          navbar: newNav
        }))
      },

      activeNavbar: 'Today',

      updateActiveNavbar: (newActive: string) => {
        set(() => ({
          activeNavbar: newActive
        }))
      },

      active: 'Today',

      updateActive: (newActive: string) => {
        set(() => ({
          active: newActive
        }))
      }
    }),
    {
      name: 'navbar-storage'
    }
  )
)

export { useNavStore }
