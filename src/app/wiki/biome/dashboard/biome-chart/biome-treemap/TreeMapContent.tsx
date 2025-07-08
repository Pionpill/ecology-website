import { schemeCategory10 } from 'd3-scale-chromatic'
import { FC } from 'react'
import { TreemapNode } from 'recharts/types/chart/Treemap'

const TreeMapContent: FC<TreemapNode> = (props) => {
  const { depth, x, y, width, height, index, name } = props

  const colors = schemeCategory10

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? colors[index % colors.length] : 'transparent',
          stroke: 'var(--background)',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 ? (
        <text
          x={x + 4}
          y={y + 18}
          fill="var(--background)"
          fontSize={16}
          fontWeight="bold"
        >
          {name}
        </text>
      ) : null}
      {depth === 2 && height > 32 && width > 32 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="var(--background)"
          fontSize={14}
        >
          {name}
        </text>
      ) : null}
    </g>
  )
}

export default TreeMapContent
