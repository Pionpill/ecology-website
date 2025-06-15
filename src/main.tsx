import { FC, StrictMode, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoute from './routes'
import I18nProvider from './I18nProvider'
import useLangStore from './hooks/useLangStore'
import useThemeStore from './hooks/useThemeStore'
import useDeviceStore, { getDeviceType } from './hooks/useDeviceStore'

// eslint-disable-next-line react-refresh/only-export-components
const Root: FC = () => {
  const { lang } = useLangStore()
  const { theme } = useThemeStore()

  const html = document.querySelector('html')
  html?.setAttribute('lang', lang)
  html?.classList.remove(theme === 'dark' ? 'light' : 'dark')
  html?.classList.add(theme === 'dark' ? 'dark' : 'light')

  const { device, changeDevice } = useDeviceStore()

  useLayoutEffect(() => {
    const updateDeviceType = () => {
      const newDevice = getDeviceType()
      if (device !== newDevice) {
        changeDevice(newDevice)
      }
    }
    globalThis.addEventListener('resize', updateDeviceType)
    return () => globalThis.removeEventListener('resize', updateDeviceType)
  }, [globalThis.innerWidth])

  return (
    <StrictMode>
      <I18nProvider>
        <AppRoute />
      </I18nProvider>
    </StrictMode>
  )
}

createRoot(document.querySelector('body')!).render(<Root />)
