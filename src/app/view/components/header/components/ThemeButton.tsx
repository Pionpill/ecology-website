import { Button } from '@/components/ui/button'
import useThemeStore from '@/hooks/useThemeStore'
import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'
import { FC, ReactNode } from 'react'

export type ThemeButtonProps = {
  children?: ReactNode
  className?: string
}

const ThemeButton: FC<ThemeButtonProps> = (props) => {
  const { children, className } = props
  const { theme, switchTheme } = useThemeStore()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('size-8 cursor-pointer', className)}
      onClick={() => switchTheme()}
    >
      {theme === 'light' ? <Sun /> : <Moon />} {children}
    </Button>
  )
}

export default ThemeButton
