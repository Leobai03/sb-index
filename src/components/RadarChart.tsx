import type { GapDimension } from '../types'

interface RadarChartProps {
  values: Record<GapDimension, number>
}

const labels: GapDimension[] = ['目标诚实', '行动兑现', '反馈修正', '长期一致', '责任承担', '自我诚实']

function pointAt(index: number, value: number, radius: number, center = 130) {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / labels.length
  return {
    x: center + Math.cos(angle) * radius * value,
    y: center + Math.sin(angle) * radius * value,
  }
}

export default function RadarChart({ values }: RadarChartProps) {
  const radius = 82
  const rings = [0.25, 0.5, 0.75, 1]
  const dataPoints = labels.map((label, index) => pointAt(index, Math.max(values[label], 4) / 100, radius))

  return (
    <svg className="radar-chart" viewBox="0 0 260 260" role="img" aria-label="六维知行偏离雷达图">
      {rings.map((ring) => {
        const points = labels.map((_, index) => pointAt(index, ring, radius)).map(({ x, y }) => `${x},${y}`).join(' ')
        return <polygon key={ring} points={points} fill="none" stroke="#d8d5cc" strokeWidth="1.2" />
      })}
      {labels.map((_, index) => {
        const edge = pointAt(index, 1, radius)
        return <line key={index} x1="130" y1="130" x2={edge.x} y2={edge.y} stroke="#dedbd2" strokeWidth="1" />
      })}
      <polygon
        points={dataPoints.map(({ x, y }) => `${x},${y}`).join(' ')}
        fill="rgba(93, 228, 61, 0.28)"
        stroke="#38b51f"
        strokeWidth="3"
      />
      {dataPoints.map(({ x, y }, index) => <circle key={index} cx={x} cy={y} r="4.5" fill="#151810" />)}
      {labels.map((label, index) => {
        const pos = pointAt(index, 1.34, radius)
        return (
          <g key={label}>
            <text x={pos.x} y={pos.y - 2} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3f433b">
              {label}
            </text>
            <text x={pos.x} y={pos.y + 12} textAnchor="middle" fontSize="10" fontWeight="900" fill="#36a720">
              {values[label]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
