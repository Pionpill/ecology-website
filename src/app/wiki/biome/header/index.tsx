import TooltipButton from '@/components/shared/TooltipButton'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useLangStore from '@/hooks/useLangStore'
import {
  BiomeCategory,
  BiomeId,
  BiomeTag,
  getBiomeCategoryName,
  getBiomeName,
  getBiomeTagName,
} from '@ecology-mc/data'
import { Link as LinkIcon, PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useParams, useSearchParams } from 'react-router'
import useBiomeFilterStore from '../useBiomeFilterStore'
import useSidebarStore from '../useSidebarStore'

const BiomeHeader: FC = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()
  const { lang } = useLangStore()

  const { open, setOpen } = useSidebarStore()
  const { setBiomeFilter } = useBiomeFilterStore()

  const category = searchParams.get('category')
  const tag = searchParams.get('tag')
  const biomeId = useParams().biomeId

  const isDashboard = location.pathname.includes('dashboard')

  return (
    <div className="flex items-center bg-sidebar justify-between gap-2 p-2">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          className="size-6 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <PanelRightOpen /> : <PanelLeftOpen />}
        </Button>
        <Separator orientation="vertical" className="mr-1 !h-4 !w-[1.5px]" />
        <Breadcrumb className="flex gap-1">
          {isDashboard ? (
            <>
              <BreadcrumbItem className="text-sm opacity-60">
                {t('wiki.biome.name')}
              </BreadcrumbItem>
              <div className="text-sm opacity-60">/</div>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    className="text-sm opacity-80 transition-all hover:opacity-100"
                    to="/wiki/biome/dashboard"
                  >
                    {t('common.dashboard')}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {getBiomeCategoryName(category as BiomeCategory, lang) ? (
                <>
                  <div className="text-sm opacity-60">/</div>
                  <BreadcrumbItem className="text-sm opacity-60">
                    {t('common.category')}
                  </BreadcrumbItem>
                  <div className="text-sm opacity-60">/</div>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        className="text-sm lowercase opacity-80 transition-all hover:opacity-100"
                        to={`/wiki/biome/dashboard?category=${category}`}
                        onClick={() =>
                          setBiomeFilter(
                            { category: [category as BiomeCategory] },
                            true
                          )
                        }
                      >
                        {getBiomeCategoryName(category as BiomeCategory, lang)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              ) : null}
              {getBiomeTagName(tag as BiomeTag, lang) ? (
                <>
                  <div className="text-sm opacity-60">/</div>
                  <BreadcrumbItem className="text-sm opacity-60">
                    {t('common.tag')}
                  </BreadcrumbItem>
                  <div className="text-sm opacity-60">/</div>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        className="text-sm lowercase opacity-80 transition-all hover:opacity-100"
                        to={`/wiki/biome/dashboard?tag=${tag}`}
                        onClick={() =>
                          setBiomeFilter({ tags: [tag as BiomeTag] }, true)
                        }
                      >
                        {getBiomeTagName(tag as BiomeTag, lang)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              ) : null}
            </>
          ) : (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    className="text-sm lowercase opacity-80 transition-all hover:opacity-100"
                    to={`/wiki/biome/dashboard`}
                  >
                    {t('wiki.biome.name')}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <div className="text-sm opacity-60">/</div>
              <BreadcrumbItem className="text-sm lowercase opacity-60">
                {getBiomeName(biomeId as BiomeId, lang)}
              </BreadcrumbItem>
            </>
          )}
        </Breadcrumb>
      </div>
      <TooltipButton
        variant="outline"
        tooltipContent={t('common.copyRoute')}
        onClick={() => navigator.clipboard.writeText(window.location.href)}
      >
        <LinkIcon />
      </TooltipButton>
    </div>
  )
}

export default BiomeHeader
