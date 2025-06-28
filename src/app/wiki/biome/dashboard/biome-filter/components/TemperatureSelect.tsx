import SliderSelect from '@/components/shared/SliderSelect'
import { Thermometer } from 'lucide-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import useBiomeFilterStore from '../../../useBiomeFilterStore'

const TemperatureSelect: FC = () => {
  const { t } = useTranslation()
  const filter = useBiomeFilterStore()

  return (
    <SliderSelect
      defaultValue={filter.temperature?.map((value) => Math.round(value * 20))}
      onValueCommit={(newTemperature) =>
        filter.setBiomeFilter({
          temperature: newTemperature.map((value) => value / 20) as [number, number],
        })
      }
      min={-20}
      max={50}
      step={1}
      prefix={<Thermometer />}
      format={(value) => `${value[0]} ~ ${value[1]}℃`}
      title={t('common.temperature')}
    />
  )
}

export default TemperatureSelect
