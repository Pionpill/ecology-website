import { BiomeModel } from '@ecology-mc/data'
import { FC } from 'react'
import BiomeLineChart from './BiomeLineChart'
import BiomeTreeChart from './biome-treemap'

export type BiomeChartProps = {
  data: BiomeModel[],
  className?: string,
  containerClassName?: string,
}

const BiomeChart: FC<BiomeChartProps> = (props) => {
  const { data } = props

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <BiomeLineChart data={data} type="temperature" containerClassName="h-[300px]" />
      <BiomeLineChart data={data} type="rainfall" containerClassName="h-[300px]" />
      <BiomeTreeChart data={data} containerClassName="h-[400px]" />
    </div>
  )
}

export default BiomeChart
