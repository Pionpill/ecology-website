import { List } from '@/components/shared/list'
import { LineTabsList, LineTabsTrigger } from '@/components/shared/trigger'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { ExternalLink } from 'lucide-react'
import { FC } from 'react'
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

const Biome: FC = () => {
  const { t } = useTranslation()
  const { lang } = useLangStore()

  const categoryList = useBiomeCategoryList()
  const tagList = useBiomeTagList()

  const tabs = [
    { label: t('wiki.biome.category'), value: 'category' },
    { label: t('wiki.biome.tag'), value: 'tag' },
  ]

  return (
    <div className="flex flex-1 gap-2 border-r">
      <div className="flex h-full w-56 flex-col justify-between border-r p-4 gap-2">
        <div className="flex flex-1 overflow-auto flex-col gap-2">
          <div className="flex items-center justify-between font-semibold uppercase">
            {t('wiki.biome.title')}
            <Tooltip>
              <TooltipTrigger>
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
                <div className="w-56 font-semibold">{t('wiki.biome.descriptionClick')}</div>
              </TooltipContent>
            </Tooltip>
          </div>
          <Tabs
            defaultValue="category"
            className="flex w-full flex-1 overflow-hidden"
          >
            <LineTabsList>
              {tabs.map((tab) => (
                <LineTabsTrigger value={tab.value}>{tab.label}</LineTabsTrigger>
              ))}
            </LineTabsList>
            <TabsContent value="category" className="flex-1 overflow-auto">
              <List listNodes={categoryList} className="flex-1" />
            </TabsContent>
            <TabsContent value="tag" className="flex-1 overflow-auto">
              <List
                listNodes={tagList}
                className="flex-1"
                expandType="multiple"
              />
            </TabsContent>
          </Tabs>
        </div>
        <Separator />
        <div>
          <div className="text-xs text-ring">{t('wiki.biome.usage')}</div>
        </div>
      </div>
    </div>
  )
}

export default Biome
