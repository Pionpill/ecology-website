import { FC } from 'react'
import { List, ListNode } from '@/components/shared/list'
import { LineTabsList, LineTabsTrigger } from '@/components/shared/trigger'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import useBiomeCategoryList from './useBiomeCategoryList'
import useBiomeTagList from './useBiomeTagList'
import useLangStore from '@/hooks/useLangStore'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { BiomeCategory, BiomeTag } from '@ecology-mc/data'
import useBiomeFilterStore from '../useBiomeFilterStore'
import { useNavigate } from 'react-router'
import useSidebarStore from '../useSidebarStore'
import { cn } from '@/lib/utils'

export type BiomeSidebarProps = {
  className?: string
}

const BiomeSidebar: FC<BiomeSidebarProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const { lang } = useLangStore()

  const { open } = useSidebarStore()

  const categoryList = useBiomeCategoryList()
  const tagList = useBiomeTagList()

  const tabs = [
    { label: t('wiki.biome.category'), value: 'category' },
    { label: t('wiki.biome.tag'), value: 'tag' },
  ]

  const { setBiomeFilter } = useBiomeFilterStore()
  const navigate = useNavigate()

  const handleCategoryClick = (node: ListNode) => {
    const isGroup = 'children' in GainNode
    if (isGroup) {
      const category = node.key.split(':')[0] as BiomeCategory
      setBiomeFilter({ category: [category] }, true)
      navigate(`/wiki/biome/dashboard?category=${category}`)
    } else {
      navigate(`/wiki/biome/${node.key}`)
    }
  }

  const handleTagClick = (node: ListNode) => {
    const isGroup = 'children' in node
    if (isGroup) {
      const tag = node.key.split(':')[0] as BiomeTag
      setBiomeFilter({ tags: [tag] }, true)
      navigate(`/wiki/biome/dashboard?tag=${tag}`)
    } else {
      navigate(`/wiki/biome/${node.key}`)
    }
  }

  return (
    <div
      className={cn(
        'bg-sidebar overflow-hidden transition-all duration-500',
        {
          'w-56': open,
          'w-0': !open,
        },
        className
      )}
    >
      <div
        className={cn(
          'flex h-full flex-col justify-between gap-2 border-r p-4'
        )}
      >
        <div className="flex flex-1 flex-col gap-2 overflow-auto">
          <div className="flex items-center justify-between truncate overflow-hidden font-semibold uppercase">
            {t('wiki.biome.title')}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="size-6 cursor-pointer"
                  onClick={() =>
                    window.open(
                      lang === 'zh'
                        ? 'https://zh.minecraft.wiki/w/%E7%94%9F%E7%89%A9%E7%BE%A4%E7%B3%BB'
                        : 'https://minecraft.fandom.com/wiki/Biome'
                    )
                  }
                >
                  <ExternalLink className="stroke-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="flex flex-col gap-1" side="right">
                <div className="w-56">{t('wiki.biome.description')}</div>
                <div className="w-56 font-semibold">
                  {t('wiki.biome.descriptionClick')}
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <Tabs
            defaultValue="category"
            className="flex w-full flex-1 overflow-hidden"
          >
            <LineTabsList>
              {tabs.map((tab) => (
                <LineTabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </LineTabsTrigger>
              ))}
            </LineTabsList>
            <TabsContent value="category" className="flex-1 overflow-auto">
              <List
                listNodes={categoryList}
                className="flex-1 overflow-x-hidden"
                onClick={handleCategoryClick}
              />
            </TabsContent>
            <TabsContent value="tag" className="flex-1 overflow-auto">
              <List
                listNodes={tagList}
                className="flex-1"
                onClick={handleTagClick}
              />
            </TabsContent>
          </Tabs>
        </div>
        <Separator />
        <div className={'text-ring max-h-[80px] overflow-hidden text-xs'}>
          {t('wiki.biome.usage')}
        </div>
      </div>
    </div>
  )
}

export default BiomeSidebar
