import { FC } from 'react'

export const SNOW_PATTERN_ID = 'snowPattern'

const SnowPattern: FC = () => (
  <pattern
    id={SNOW_PATTERN_ID}
    x="0"
    y="0"
    width="3660"
    height="244"
    patternUnits="userSpaceOnUse"
  >
    <image
      href="https://assets.msn.cn/weathermapdata/1/static/img/animation/snow-low.png"
      width="3660"
    ></image>
    <animate
      attributeType="XML"
      attributeName="x"
      calcMode="discrete"
      values="0;-244;-488;-732;-976;-1220;-1464;-1708;-1952;-2196;-2440;-2684;-2928;-3172;-3416;"
      dur="1s"
      repeatCount="indefinite"
    ></animate>
  </pattern>
)

export default SnowPattern
