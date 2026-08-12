import type { Persona } from '../types'

interface PolygonAvatarProps {
  persona: Persona
  size?: number
  className?: string
}

const faces: Record<Persona['expression'], { left: string; right: string; mouth: string }> = {
  strict: { left: 'M38 48 L48 51', right: 'M62 51 L72 48', mouth: 'M48 69 L62 69' },
  soft: { left: 'M38 51 Q43 46 48 51', right: 'M62 51 Q67 46 72 51', mouth: 'M47 66 Q55 74 63 66' },
  smug: { left: 'M38 51 Q43 46 49 50', right: 'M62 49 L72 51', mouth: 'M47 67 Q57 75 66 64' },
  sad: { left: 'M38 51 Q43 45 48 51', right: 'M62 51 Q67 45 72 51', mouth: 'M47 72 Q55 65 64 72' },
  blank: { left: 'M38 51 L48 51', right: 'M62 51 L72 51', mouth: 'M49 69 L61 69' },
  nervous: { left: 'M38 52 Q43 45 49 52', right: 'M61 52 Q67 45 72 52', mouth: 'M49 70 Q55 66 61 70' },
  wild: { left: 'M38 50 Q43 57 49 50', right: 'M61 50 Q67 57 72 50', mouth: 'M46 65 Q55 78 65 65' },
  angry: { left: 'M37 46 L49 52', right: 'M61 52 L73 46', mouth: 'M46 71 Q55 64 65 71' },
  sleepy: { left: 'M38 52 Q43 56 49 52', right: 'M61 52 Q67 56 72 52', mouth: 'M49 69 Q55 72 61 69' },
}

function Face({ persona, transform = '' }: { persona: Persona; transform?: string }) {
  const face = faces[persona.expression]
  return (
    <g transform={transform}>
      <polygon points="28,25 77,25 84,42 76,77 55,89 33,77 23,42" fill="#e8c5a7" />
      <polygon points="25,29 38,12 72,16 84,35 70,39 57,31 40,39 22,36" fill="#292b28" />
      <polygon points="22,36 34,36 31,62 24,55" fill="#292b28" />
      <polygon points="72,36 84,35 79,62 73,63" fill="#292b28" />
      <polygon points="35,22 46,7 54,28" fill="#343733" />
      <polygon points="55,22 73,14 71,35" fill="#20221f" />
      <path d={face.left} fill="none" stroke="#222" strokeWidth="3.2" strokeLinecap="round" />
      <path d={face.right} fill="none" stroke="#222" strokeWidth="3.2" strokeLinecap="round" />
      <polygon points="55,53 51,63 58,64" fill="#c28d70" />
      <path d={face.mouth} fill="none" stroke="#774037" strokeWidth="2.8" strokeLinecap="round" />
      {persona.expression === 'nervous' && <circle cx="81" cy="52" r="3.5" fill="#4f89ff" />}
      {persona.expression === 'sad' && <path d="M73 55 L69 68" stroke="#4f89ff" strokeWidth="3.5" strokeLinecap="round" />}
    </g>
  )
}

function Shirt({ persona, x = 43, y = 104, width = 74, height = 49 }: { persona: Persona; x?: number; y?: number; width?: number; height?: number }) {
  return (
    <g>
      <polygon points={`${x},${y} ${x + width},${y} ${x + width + 10},${y + height} ${x - 10},${y + height}`} fill={persona.color} />
      <polygon points={`${x + 19},${y + 4} ${x + width - 19},${y + 4} ${x + width - 24},${y + height - 5} ${x + 24},${y + height - 5}`} fill="#fff" opacity=".9" />
      <text x={x + width / 2} y={y + 35} textAnchor="middle" fontSize="15" fontWeight="900" fill="#151810" fontFamily="PingFang SC, sans-serif">{persona.symbol}</text>
    </g>
  )
}

function Figure({ persona }: { persona: Persona }) {
  switch (persona.pose) {
    case 'grass':
      return <><Shirt persona={persona} /><Face persona={persona} transform="translate(25 21)" /><g stroke="#368b27" strokeWidth="4"><path d="M72 27L61 5M79 27L78 2M86 27L98 6M91 28L110 16" /></g></>
    case 'hug':
      return <><Shirt persona={persona} /><Face persona={persona} transform="translate(25 18)" /><polygon points="44,115 21,131 51,142" fill={persona.color} /><polygon points="116,115 139,131 109,142" fill={persona.color} /><path d="M58 129 C58 116 76 118 80 128 C84 118 102 116 102 129 C102 142 80 153 80 153 C80 153 58 142 58 129" fill="#f24b64" /></>
    case 'crown':
      return <><Shirt persona={persona} /><Face persona={persona} transform="translate(25 21)" /><polygon points="56,27 61,4 76,17 90,2 102,25" fill="#ffd33d" stroke="#151810" strokeWidth="2" /><polygon points="120,120 151,99 141,136" fill={persona.color} /><circle cx="151" cy="97" r="6" fill="#e8c5a7" /></>
    case 'rain':
      return <><path d="M16 45 Q80 -5 144 45" fill={persona.color} stroke="#151810" strokeWidth="3" /><path d="M80 44V155Q80 167 68 163" fill="none" stroke="#151810" strokeWidth="4" /><Shirt persona={persona} y={110} /><Face persona={persona} transform="translate(25 27)" /><g stroke="#4f89ff" strokeWidth="3"><path d="M24 63l-7 14M137 61l-7 14M20 95l-7 14M143 91l-7 14" /></g></>
    case 'head':
      return <><polygon points="57,139 103,139 111,167 49,167" fill={persona.color} /><Face persona={persona} transform="translate(10 14) scale(1.28)" /><g fill="#ffb321"><circle cx="25" cy="51" r="5" /><circle cx="140" cy="49" r="5" /><circle cx="146" cy="83" r="4" /></g></>
    case 'shell':
      return <><ellipse cx="82" cy="129" rx="64" ry="43" fill={persona.color} stroke="#151810" strokeWidth="3" /><path d="M44 129Q81 85 119 129Q82 166 44 129" fill={persona.lightColor} stroke="#151810" strokeWidth="3" /><Face persona={persona} transform="translate(35 54) scale(.82)" /><polygon points="132,129 157,115 151,144" fill={persona.color} /></>
    case 'monkey':
      return <><path d="M44 108Q23 139 43 161M116 108Q139 134 125 160" fill="none" stroke={persona.color} strokeWidth="15" strokeLinecap="round" /><Shirt persona={persona} y={103} /><Face persona={persona} transform="translate(25 18)" /><path d="M124 42Q153 33 154 10Q133 8 121 27" fill="#ffd238" stroke="#151810" strokeWidth="2.5" /></>
    case 'control':
      return <><Shirt persona={persona} /><Face persona={persona} transform="translate(25 19)" /><g stroke="#151810" strokeWidth="2"><path d="M39 112L15 75M121 112L145 73" /><path d="M15 75L9 53M15 75L28 58M145 73L151 50M145 73L132 56" /></g><g fill="#e8c5a7"><circle cx="10" cy="51" r="7" /><circle cx="152" cy="49" r="7" /></g></>
    case 'coffin':
      return <><polygon points="45,18 115,18 137,49 123,166 37,166 23,49" fill="#262826" stroke="#151810" strokeWidth="3" /><polygon points="35,38 125,38 113,151 47,151" fill="#d5d8db" /><Face persona={persona} transform="translate(25 47)" /><text x="80" y="145" textAnchor="middle" fontSize="13" fontWeight="900">体验中</text></>
    case 'calendar':
      return <><rect x="24" y="53" width="132" height="105" rx="3" fill="#fff" stroke="#151810" strokeWidth="3" /><rect x="24" y="53" width="132" height="27" fill={persona.color} /><Face persona={persona} transform="translate(26 2) scale(.72)" /><text x="90" y="122" textAnchor="middle" fontSize="28" fontWeight="950" fill="#151810">改天</text><path d="M44 142H136" stroke="#151810" strokeWidth="3" /></>
    case 'shrug':
      return <><Shirt persona={persona} y={106} /><Face persona={persona} transform="translate(25 21)" /><path d="M46 116L9 98M114 116L151 96" stroke={persona.color} strokeWidth="16" strokeLinecap="round" /><g fill="#e8c5a7"><circle cx="10" cy="98" r="8" /><circle cx="150" cy="96" r="8" /></g><text x="80" y="174" textAnchor="middle" fontSize="11" fontWeight="900">都行吧</text></>
    case 'rocket':
      return <><polygon points="80,82 119,141 80,167 41,141" fill={persona.color} stroke="#151810" strokeWidth="3" /><polygon points="80,167 66,139 94,139" fill="#ffd33d" /><polygon points="41,141 21,152 40,119" fill={persona.lightColor} /><polygon points="119,141 139,152 120,119" fill={persona.lightColor} /><Face persona={persona} transform="translate(25 2) scale(.95)" /></>
    case 'loop':
      return <><Shirt persona={persona} y={109} /><Face persona={persona} transform="translate(25 24)" /><path d="M24 58Q4 99 32 131M137 129Q158 87 132 52" fill="none" stroke={persona.color} strokeWidth="8" /><polygon points="25,132 20,113 40,127" fill={persona.color} /><polygon points="135,51 141,70 121,56" fill={persona.color} /></>
    case 'halo':
      return <><ellipse cx="80" cy="20" rx="34" ry="10" fill="none" stroke="#ffd33d" strokeWidth="7" /><polygon points="45,112 115,112 132,165 28,165" fill="#fff" stroke="#151810" strokeWidth="2" /><Face persona={persona} transform="translate(25 22)" /><text x="80" y="146" textAnchor="middle" fontSize="15" fontWeight="900">不为钱</text><text x="80" y="160" textAnchor="middle" fontSize="9" fontWeight="900" fill="#888">（看余额中）</text></>
    case 'brick':
      return <><rect x="23" y="81" width="134" height="83" fill={persona.color} stroke="#151810" strokeWidth="3" /><path d="M23 108H157M23 136H157M66 81V108M113 81V108M48 108V136M95 108V136M137 108V136M66 136V164M113 136V164" stroke="#8f302b" strokeWidth="2" /><Face persona={persona} transform="translate(25 1) scale(.82)" /></>
    case 'money':
      return <><Shirt persona={persona} y={106} /><Face persona={persona} transform="translate(25 20)" /><g transform="rotate(-12 25 65)"><rect x="7" y="48" width="35" height="20" fill="#85db85" stroke="#151810" strokeWidth="2" /><text x="24" y="63" textAnchor="middle" fontSize="10" fontWeight="900">￥</text></g><g transform="rotate(15 140 52)"><rect x="122" y="42" width="35" height="20" fill="#85db85" stroke="#151810" strokeWidth="2" /><text x="139" y="57" textAnchor="middle" fontSize="10" fontWeight="900">￥</text></g><circle cx="126" cy="128" r="23" fill="#ffd33d" stroke="#151810" strokeWidth="3" /><text x="126" y="135" textAnchor="middle" fontSize="20" fontWeight="900">¥</text></>
  }
}

export default function PolygonAvatar({ persona, size = 180, className = '' }: PolygonAvatarProps) {
  return (
    <svg className={`polygon-avatar ${className}`} width={size} height={size} viewBox="0 0 180 180" role="img" aria-label={`${persona.name}人格角色`}>
      <ellipse cx="90" cy="170" rx="55" ry="8" fill="#111" opacity=".12" />
      <Figure persona={persona} />
    </svg>
  )
}
