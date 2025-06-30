import { BiomeModel } from "@ecology-mc/data";
import { FC } from "react";
import BiomeLineChart from "./BiomeLineChart";

export type BiomeChartProps = {
    data: BiomeModel[]
  }

const BiomeChart: FC<BiomeChartProps> = props => {
    const { data } = props

    return <div className="flex flex-1 flex-col gap-4">
        <BiomeLineChart data={data} />
    </div>
}

export default BiomeChart;