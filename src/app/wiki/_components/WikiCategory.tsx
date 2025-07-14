import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Grid2x2, MountainSnow, Package, Sprout } from 'lucide-react'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'

const WikiCategory: FC = () => {
  const { t } = useTranslation()

  const location = useLocation()

  const sideItems = useMemo(
    () => [
      {
        path: '/wiki/biome',
        defaultPath: '/wiki/biome/dashboard',
        icon: <MountainSnow />,
        title: t('wiki.biome.name'),
      },
      {
        path: '/wiki/plant',
        icon: <Sprout />,
        title: t('wiki.plant.name'),
      },
      {
        path: '/wiki/item',
        icon: <Package />,
        title: t('wiki.item.name'),
      },
      {
        path: '/wiki/land',
        icon: <Grid2x2 />,
        title: t('wiki.land.name'),
      },
    ],
    []
  )

  return (
    <div className="bg-
     flex bg-sidebar-accent h-full w-14 flex-col items-center gap-1 py-4 border-r">
      {sideItems.map((item) => (
        <Tooltip key={item.path}>
          <TooltipTrigger asChild>
            <Link to={item.defaultPath || item.path}>
              <Button
                variant={
                  location.pathname.includes(item.path) ? 'default' : 'ghost'
                }
                className="size-8 cursor-pointer"
              >
                {item.icon}
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export default WikiCategory
