import SliderSelect from '@/components/shared/SliderSelect'
import { Percent } from 'lucide-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import useBiomeFilterStore from '../../../useBiomeFilterStore'

const TemperatureSelect: FC = () => {
  const { t } = useTranslation()
  const filter = useBiomeFilterStore()

  return (
    <SliderSelect
      defaultValue={filter.generate?.map((value) => value / 10)}
      onValueCommit={(values) =>
        filter.setBiomeFilter({
          generate: values.map((v) => v * 10) as [number, number],
        })
      }
      min={0}
      max={150}
      step={1}
      prefix={<Percent className="mr-1" />}
      format={(value) => `${value[0]} ~ ${value[1]}‰`}
      title={t('common.generate')}
    />
  )
}

export default TemperatureSelect
