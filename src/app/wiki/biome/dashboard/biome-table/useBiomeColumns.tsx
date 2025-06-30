import { Badge } from '@/components/ui/badge'
import useLangStore from '@/hooks/useLangStore'
import { cn } from '@/lib/utils'
import {
  BiomeModel,
  BiomeTag,
  getBiomeCategoryName,
  getBiomeName,
  getBiomeTagName,
  getDimensionName,
} from '@ecology-mc/data'
import { ColumnDef } from '@tanstack/react-table'
import { Eye, Globe, Skull } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  getBiomeCatalogIcon,
  getRainfallIcon,
  getTemperatureIcon,
} from '@/utils/biome'

const useBiomeColumns = (): ColumnDef<BiomeModel>[] => {
  const { t } = useTranslation()
  const { lang } = useLangStore()

  return [
    {
      id: 'biomeName',
      header: t('data.biome.name'),
      cell: ({ row }) => (
        <div className="flex max-w-36 flex-col gap-1">
          <div
            className="truncate text-sm"
            title={getBiomeName(row.original.biomeId, lang)}
          >
            {getBiomeName(row.original.biomeId, lang)}
          </div>
          <div
            className="text-muted-foreground truncate text-xs"
            title={row.original.biomeId}
          >
            {row.original.biomeId}
          </div>
        </div>
      ),
    },
    {
      id: 'category',
      header: `${t('data.biome.category')}/${t('data.biome.tags')}`,
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <Badge variant="secondary">
            {getBiomeCatalogIcon(row.original.category)}
            {getBiomeCategoryName(row.original.category, lang)}
          </Badge>
          <div className="text-muted-foreground flex gap-1 pl-1 text-[10px]">
            {row.original.tags
              .map((tag) => getBiomeTagName(tag as BiomeTag, lang))
              .join(' | ')}
          </div>
        </div>
      ),
    },
    {
      id: 'temperature',
      header: t('data.biome.temperature'),
      cell: ({ row }) => (
        <div className={cn('flex items-center gap-1 text-sm')}>
          {getTemperatureIcon(row.original.temperature, 16)}
          {`${row.original.temperature * 20}℃`}
        </div>
      ),
    },
    {
      id: 'rainfall',
      header: t('data.biome.rainfall'),
      cell: ({ row }) => (
        <div className={cn('flex items-center gap-1 text-sm')}>
          {getRainfallIcon(row.original.rainfall, 16)}
          {`${row.original.rainfall * 100}%`}
        </div>
      ),
    },
    {
      id: 'dimension',
      header: t('data.biome.dimension'),
      cell: ({ row }) => {
        const dimension = row.original.dimension
        return (
          <Badge
            variant="secondary"
            className={cn(
              dimension === 'the_end'
                ? 'bg-purple-100 dark:bg-purple-900'
                : dimension === 'overworld'
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'bg-red-100 dark:bg-red-900'
            )}
          >
            {dimension === 'overworld' ? (
              <Globe size={16} />
            ) : dimension === 'the_end' ? (
              <Eye size={16} />
            ) : (
              <Skull size={16} />
            )}
            {getDimensionName(dimension, lang)}
          </Badge>
        )
      },
    },

    {
      id: 'generate',
      header: t('data.biome.generate'),
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.generate ? `${row.original.generate / 10}‰` : '-'}
        </div>
      ),
    },
  ]
}

export default useBiomeColumns
