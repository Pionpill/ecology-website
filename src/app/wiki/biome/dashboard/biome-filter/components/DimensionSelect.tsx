import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import useLangStore from '@/hooks/useLangStore'
import { Dimension, getDimensionName } from '@ecology-mc/data'
import { Earth, Eye, Skull } from 'lucide-react'
import { FC } from 'react'
import useBiomeFilterStore from '../../../useBiomeFilterStore'

export type CatalogSelectProps = {
  showLabel?: boolean
  className?: string
  disabled?: boolean
  value?: Dimension[]
  onValueChange?: (newDimension: Dimension[]) => void
}

const CatalogSelect: FC<CatalogSelectProps> = (props) => {
  const { showLabel = false, className, value, disabled, onValueChange } = props

  const { lang } = useLangStore()
  const filter = useBiomeFilterStore()

  return (
    <ToggleGroup
      disabled={disabled}
      variant="outline"
      type="multiple"
      value={value ?? filter.dimension}
      className={className}
      onValueChange={(newDimension) =>
        onValueChange
          ? onValueChange(newDimension as Dimension[])
          : filter.setBiomeFilter({
              dimension: newDimension as Dimension[],
            })
      }
    >
      {[
        { value: 'overworld', icon: <Earth /> },
        { value: 'nether', icon: <Skull /> },
        { value: 'the_end', icon: <Eye /> },
      ].map((dimension) => (
        <ToggleGroupItem
          key={dimension.value}
          value={dimension.value}
          className="cursor-pointer"
          title={getDimensionName(dimension.value as Dimension, lang)}
        >
          {dimension.icon}
          {showLabel && getDimensionName(dimension.value as Dimension, lang)}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export default CatalogSelect
