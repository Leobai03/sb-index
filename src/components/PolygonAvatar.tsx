import type { Persona } from '../types'

interface PolygonAvatarProps {
  persona: Persona
  size?: number
  className?: string
}

const eyePaths: Record<Persona['expression'], { left: string; right: string; mouth: string }> = {
  strict: { left: 'M55 72 L68 75', right: 'M92 75 L105 72', mouth: 'M68 101 L92 101' },
  soft: { left: 'M56 75 Q62 70 68 75', right: 'M92 75 Q98 70 104 75', mouth: 'M69 98 Q80 108 91 98' },
  smug: { left: 'M55 76 Q62 70 69 75', right: 'M92 73 L105 76', mouth: 'M68 99 Q83 108 96 95' },
  sad: { left: 'M55 76 Q62 69 68 76', right: 'M92 76 Q98 69 105 76', mouth: 'M69 106 Q80 96 92 106' },
  blank: { left: 'M56 75 L68 75', right: 'M92 75 L104 75', mouth: 'M71 102 L89 102' },
  nervous: { left: 'M55 77 Q62 69 69 77', right: 'M91 77 Q98 69 105 77', mouth: 'M72 103 Q80 98 88 103' },
  wild: { left: 'M55 74 Q62 82 69 74', right: 'M91 74 Q98 82 105 74', mouth: 'M67 96 Q80 113 94 96' },
  angry: { left: 'M54 70 L69 76', right: 'M91 76 L106 70', mouth: 'M67 105 Q80 96 94 105' },
  sleepy: { left: 'M55 76 Q62 80 69 76', right: 'M91 76 Q98 80 105 76', mouth: 'M72 102 Q80 105 88 102' },
}

export default function PolygonAvatar({ persona, size = 180, className = '' }: PolygonAvatarProps) {
  const face = eyePaths[persona.expression]
  return (
    <svg
      className={`polygon-avatar ${className}`}
      width={size}
      height={size}
      viewBox="0 0 160 180"
      role="img"
      aria-label={`${persona.name}人格角色`}
    >
      <ellipse cx="80" cy="165" rx="48" ry="9" fill="#111" opacity="0.12" />
      <polygon points="49,116 111,116 126,157 34,157" fill={persona.color} />
      <polygon points="49,116 80,132 111,116 102,157 58,157" fill={persona.lightColor} opacity="0.88" />
      <polygon points="34,121 49,117 43,151 25,145" fill={persona.color} />
      <polygon points="111,117 126,121 135,145 117,151" fill={persona.color} />
      <polygon points="53,42 107,42 118,63 109,111 80,127 50,111 42,63" fill="#e9c7aa" />
      <polygon points="46,45 63,25 104,30 118,53 102,58 84,49 65,58 43,55" fill="#282a27" />
      <polygon points="43,55 57,54 53,91 44,79" fill="#282a27" />
      <polygon points="103,55 118,53 112,90 105,91" fill="#282a27" />
      <polygon points="59,36 72,21 82,40" fill="#333632" opacity="0.85" />
      <polygon points="83,36 103,27 101,49" fill="#20221f" opacity="0.9" />
      <path d={face.left} fill="none" stroke="#222" strokeWidth="4" strokeLinecap="round" />
      <path d={face.right} fill="none" stroke="#222" strokeWidth="4" strokeLinecap="round" />
      <polygon points="80,78 75,91 83,92" fill="#c79373" />
      <path d={face.mouth} fill="none" stroke="#7d4337" strokeWidth="3.5" strokeLinecap="round" />
      {persona.expression === 'nervous' && <circle cx="113" cy="84" r="4" fill="#4f89ff" />}
      {persona.expression === 'sad' && <path d="M104 80 L100 94" stroke="#4f89ff" strokeWidth="4" strokeLinecap="round" />}
      <g>
        <polygon points="60,125 100,125 96,153 64,153" fill="#fff" opacity="0.9" />
        <text x="80" y="146" textAnchor="middle" fontSize="18" fontWeight="900" fill="#151810" fontFamily="PingFang SC, sans-serif">
          {persona.symbol}
        </text>
      </g>
    </svg>
  )
}
