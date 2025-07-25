import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LangType = 'zh' | 'en'

type LangStore = {
  lang: LangType
  switchLang: (newLang?: LangType | 'system') => void
}

const getSysLang = () => (navigator.language.startsWith('zh') ? 'zh' : 'en')

const useLangStore = create<LangStore>()(
  persist(
    (set) => ({
      lang: getSysLang(),
      switchLang: (newLang) =>
        set((state) => ({
          lang:
            newLang === 'system'
              ? getSysLang()
              : newLang || (state.lang === 'zh' ? 'en' : 'zh'),
        })),
    }),
    {
      name: 'lang-storage',
    }
  )
)

export default useLangStore
