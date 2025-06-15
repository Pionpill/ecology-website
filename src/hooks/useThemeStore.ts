import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  theme: 'dark' | 'light'
}

type Action = {
  switchTheme: (newTheme?: 'dark' | 'light' | 'system') => void
}

const getColorSchemePreference = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const useThemeStore = create<State & Action>()(
  persist(
    (set) => ({
      theme: getColorSchemePreference(),
      switchTheme: (newTheme) =>
        set((state) => ({
          theme:
            newTheme === 'system'
              ? getColorSchemePreference()
              : (newTheme ?? (state.theme === 'light' ? 'dark' : 'light')),
        })),
    }),
    {
      name: 'theme-storage',
    }
  )
)

export default useThemeStore
