import SliderSelect from '@/components/shared/SliderSelect'
import { CloudRainWind } from 'lucide-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import useBiomeFilterStore from '../../../useBiomeFilterStore'

const RainfallSelect: FC = () => {
  const { t } = useTranslation()
  const filter = useBiomeFilterStore()

  return (
    <SliderSelect
      defaultValue={filter.rainfall?.map((value) => value * 100)}
      onValueCommit={(values) =>
        filter.setBiomeFilter({
          rainfall: values.map((value) => value / 100) as [number, number],
        })
      }
      min={0}
      max={100}
      step={1}
      prefix={<CloudRainWind className="mr-1" />}
      format={(value) => `${value[0]} ~ ${value[1]}%`}
      title={t('common.rainfall')}
    />
  )
}

export default RainfallSelect
