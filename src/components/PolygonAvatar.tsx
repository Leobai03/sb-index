import type { Persona } from '../types'

interface PolygonAvatarProps {
  persona: Persona
  size?: number
  className?: string
}

const mouthPaths: Record<Persona['expression'], string> = {
  strict: 'M43 72 L67 70',
  soft: 'M43 69 Q55 80 67 67',
  smug: 'M42 68 Q56 79 70 65',
  sad: 'M43 77 Q55 66 67 75',
  blank: 'M45 72 L65 72',
  nervous: 'M45 75 Q55 68 65 75',
  wild: 'M41 65 Q55 84 70 64',
  angry: 'M42 76 Q55 66 68 75',
  sleepy: 'M46 72 Q55 76 64 71',
}

function Head({ persona, x = 0, y = 0, scale = 1, rotate = 0 }: {
  persona: Persona
  x?: number
  y?: number
  scale?: number
  rotate?: number
}) {
  const angry = persona.expression === 'angry' || persona.expression === 'strict'
  const sleepy = persona.expression === 'sleepy'
  const hairKind = ['MOM', 'PAIN', 'PURE'].includes(persona.code)
    ? 'long'
    : ['DEAD', 'LATER'].includes(persona.code)
      ? 'flat'
      : ['WIND', 'RUSH', 'LOOP'].includes(persona.code)
        ? 'wild'
        : persona.code === 'OJBK'
          ? 'round'
          : 'sharp'
  const hairColor = persona.code === 'DEAD'
    ? '#555b57'
    : persona.code === 'PAIN'
      ? '#352946'
      : persona.code === 'WIND'
        ? '#493729'
        : '#2a2c29'
  const hairLight = persona.code === 'DEAD' ? '#737b76' : persona.code === 'PAIN' ? '#534066' : '#414440'
  const skin = ['WIND', 'COIN', 'BOSS'].includes(persona.code) ? '#d09670' : '#ddb18f'
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} 55 52) scale(${scale})`}>
      {hairKind === 'long' && <><polygon points="13,32 2,66 9,108 31,92 28,50" fill={hairColor} /><polygon points="85,26 107,51 101,111 80,91 83,47" fill={hairColor} /></>}
      <polygon points="8,42 22,18 55,7 87,17 104,43 93,78 58,99 24,88 3,60" fill={skin} />
      <polygon points="8,42 55,7 49,55 3,60" fill="#edc5a5" />
      <polygon points="49,55 87,17 104,43 93,78 57,68" fill="#c99070" opacity=".6" />
      <polygon points="24,88 57,68 93,78 58,99" fill="#d19b7c" opacity=".58" />
      <polygon points="3,60 10,75 23,70 18,51" fill="#c98d70" />
      <polygon points="84,55 104,43 104,65 94,72" fill="#c08365" />

      {hairKind === 'flat' ? (
        <>
          <polygon points="8,43 18,17 87,15 102,35 82,34 66,29 48,32 27,27 18,48" fill={hairColor} />
          <polygon points="18,17 55,5 87,15 48,32" fill={hairLight} />
        </>
      ) : hairKind === 'round' ? (
        <>
          <polygon points="7,43 18,18 43,3 78,6 101,34 82,34 70,25 50,30 31,24 18,48" fill={hairColor} />
          <polygon points="18,18 43,3 50,30 31,24" fill={hairLight} />
        </>
      ) : (
        <>
          <polygon points="7,43 17,17 48,0 84,10 102,35 83,32 68,21 50,29 34,19 18,48" fill={hairColor} />
          <polygon points="17,17 48,0 50,29 34,19" fill={hairLight} />
          <polygon points="50,29 84,10 102,35 73,29" fill="#181a18" opacity=".9" />
          {hairKind === 'wild' && <><polygon points="27,15 34,-12 49,10" fill={hairColor} /><polygon points="62,13 82,-8 80,22" fill={hairColor} /><polygon points="78,19 106,5 94,33" fill={hairColor} /></>}
          {hairKind === 'sharp' && <><polygon points="35,13 51,-4 61,23" fill={hairLight} /><polygon points="61,14 88,5 83,31" fill="#1b1d1b" /></>}
        </>
      )}
      <polygon points="8,42 20,39 22,70 11,62" fill={hairColor} />
      <polygon points="88,31 102,35 95,65 86,58" fill={hairColor} />

      <path d={angry ? 'M26 48 L43 55' : sleepy ? 'M27 56 Q35 62 43 56' : 'M26 54 L43 52'} stroke="#252724" strokeWidth="3.6" fill="none" strokeLinecap="square" />
      <path d={angry ? 'M64 54 L80 46' : sleepy ? 'M64 55 Q72 60 80 53' : 'M64 51 L79 49'} stroke="#252724" strokeWidth="3.6" fill="none" strokeLinecap="square" />
      {!sleepy && <><polygon points="34,53 39,55 35,59" fill="#111" /><polygon points="70,51 75,52 71,56" fill="#111" /></>}
      <polygon points="55,48 49,65 59,68 65,63" fill="#bd7c60" opacity=".78" />
      <path d={mouthPaths[persona.expression]} stroke="#6d3932" strokeWidth="3" fill="none" strokeLinecap="square" />
      {persona.expression === 'sad' && <polygon points="81,58 85,68 79,75" fill="#4c86ff" />}
      {persona.expression === 'nervous' && <polygon points="96,59 101,70 94,75" fill="#4c86ff" />}
    </g>
  )
}

function Body({ persona, transform = '', wide = false, robe = false }: {
  persona: Persona
  transform?: string
  wide?: boolean
  robe?: boolean
}) {
  const left = wide ? 66 : 76
  const right = wide ? 174 : 164
  return (
    <g transform={transform}>
      <polygon points={`${left},119 ${right},119 ${right - 8},190 ${left + 9},190`} fill={persona.color} />
      <polygon points={`${left},119 119,137 ${right},119 150,149 119,146 89,151`} fill="#fff" opacity=".22" />
      <polygon points={`${left},119 ${left + 22},126 ${left + 14},183 ${left + 9},190`} fill="#fff" opacity=".18" />
      <polygon points="99,117 120,137 140,117" fill="#f1d4bc" />
      {robe ? (
        <polygon points="86,181 153,181 175,225 63,225" fill={persona.lightColor} />
      ) : (
        <>
          <polygon points="91,187 119,187 112,222 82,222" fill="#323733" />
          <polygon points="121,187 150,187 159,222 127,222" fill="#252925" />
          <polygon points="76,218 113,218 108,229 68,229" fill="#171917" />
          <polygon points="128,218 165,218 172,229 132,229" fill="#171917" />
        </>
      )}
    </g>
  )
}

function Arm({ points, color, hand }: { points: string; color: string; hand: [number, number] }) {
  const [x, y] = hand
  return (
    <g>
      <polyline points={points} fill="none" stroke={color} strokeWidth="15" strokeLinejoin="bevel" strokeLinecap="square" />
      <polygon points={`${x - 8},${y - 4} ${x - 2},${y - 10} ${x + 8},${y - 5} ${x + 9},${y + 5} ${x},${y + 10} ${x - 8},${y + 5}`} fill="#ddb18f" />
    </g>
  )
}

function Figure({ persona }: { persona: Persona }) {
  switch (persona.pose) {
    case 'grass':
      return (
        <>
          <Body persona={persona} />
          <Arm points="82,132 52,153 38,181" color={persona.color} hand={[37, 184]} />
          <Arm points="158,132 178,157 182,180" color={persona.color} hand={[182, 183]} />
          <polygon points="12,165 49,157 57,205 18,212" fill="#5c86a2" />
          <polygon points="17,167 42,163 49,184 22,188" fill="#84aac0" />
          <path d="M49 177 Q72 158 79 132" fill="none" stroke="#668da0" strokeWidth="5" />
          <g stroke="#328235" strokeWidth="5" strokeLinecap="square"><path d="M102 29L87 5M110 27L107 0M119 28L133 4M126 31L148 16" /></g>
          <Head persona={persona} x={66} y={24} scale={1.02} rotate={-3} />
        </>
      )
    case 'hug':
      return (
        <>
          <Body persona={persona} wide robe />
          <Arm points="74,132 42,119 24,93" color={persona.color} hand={[22, 89]} />
          <Arm points="166,132 198,115 207,87" color={persona.color} hand={[209, 83]} />
          <Arm points="77,153 45,171 29,195" color={persona.color} hand={[27, 198]} />
          <Arm points="163,153 191,171 205,195" color={persona.color} hand={[207, 198]} />
          <polygon points="3,63 42,63 47,91 9,96" fill="#fff1cd" stroke="#252724" strokeWidth="2" />
          <path d="M13 70Q29 62 39 72" stroke="#d6924b" strokeWidth="4" fill="none" />
          <ellipse cx="210" cy="62" rx="18" ry="10" fill="#edf0e7" stroke="#252724" strokeWidth="2" />
          <path d="M210 62L190 43" stroke="#252724" strokeWidth="3" />
          <path d="M88 169 C88 150 110 151 120 168 C130 151 152 150 152 169 C152 189 120 207 120 207 C120 207 88 189 88 169" fill="#e94c67" />
          <Head persona={persona} x={66} y={17} scale={1.02} rotate={2} />
        </>
      )
    case 'crown':
      return (
        <>
          <polygon points="51,175 188,175 207,225 30,225" fill="#374039" />
          <polygon points="41,201 189,201 207,225 30,225" fill="#202420" />
          <path d="M60 194L92 173L118 181L151 139L181 149" fill="none" stroke="#f1c232" strokeWidth="8" />
          <polygon points="172,139 197,151 176,164" fill="#f1c232" />
          <Body persona={persona} transform="translate(0 -20) scale(.98)" />
          <Arm points="81,112 48,131 33,112" color={persona.color} hand={[30, 108]} />
          <Arm points="157,112 185,95 193,67" color={persona.color} hand={[195, 63]} />
          <polygon points="89,34 95,3 114,20 134,0 143,33" fill="#ffd52e" stroke="#252724" strokeWidth="3" />
          <Head persona={persona} x={67} y={28} scale={1.02} rotate={3} />
        </>
      )
    case 'rain':
      return (
        <>
          <Body persona={persona} transform="translate(0 3) rotate(4 120 170)" robe />
          <Arm points="80,142 48,160 35,189" color={persona.color} hand={[33, 192]} />
          <Arm points="159,142 178,164 190,188" color={persona.color} hand={[192, 191]} />
          <path d="M30 57 Q116 -5 206 57 Q164 41 121 57 Q76 40 30 57" fill={persona.color} stroke="#292b28" strokeWidth="3" />
          <path d="M121 56V192Q121 211 105 207" fill="none" stroke="#2b2d2a" strokeWidth="5" />
          <g stroke="#4c86ff" strokeWidth="4"><path d="M48 75l-9 19M71 65l-8 17M178 72l-9 19M200 93l-8 18M54 119l-9 19M185 128l-8 18" /></g>
          <Head persona={persona} x={68} y={47} scale={.98} rotate={8} />
        </>
      )
    case 'head':
      return (
        <>
          <polygon points="77,160 163,160 174,214 67,214" fill={persona.color} />
          <polygon points="87,213 114,213 107,231 75,231" fill="#242824" /><polygon points="126,213 153,213 165,231 132,231" fill="#242824" />
          <Arm points="78,170 43,187 29,211" color={persona.color} hand={[27, 214]} />
          <Arm points="162,170 187,185 201,207" color={persona.color} hand={[203, 210]} />
          <path d="M24 207L55 142" stroke="#67533f" strokeWidth="6" /><polygon points="39,144 69,137 58,156" fill="#7b8a8a" />
          <rect x="163" y="190" width="48" height="31" fill="#f3e4b9" stroke="#272927" strokeWidth="2" transform="rotate(8 187 206)" />
          <Head persona={persona} x={46} y={16} scale={1.38} rotate={-2} />
          <path d="M91 24Q121 6 150 25" fill="none" stroke="#d7b53d" strokeWidth="7" /><circle cx="121" cy="14" r="13" fill="#fff4a5" stroke="#292b28" strokeWidth="3" />
        </>
      )
    case 'shell':
      return (
        <>
          <polygon points="29,130 50,89 107,65 172,82 209,128 191,184 128,210 64,193" fill={persona.color} stroke="#252724" strokeWidth="3" />
          <polygon points="50,89 107,65 93,126 29,130" fill={persona.lightColor} opacity=".8" />
          <polygon points="107,65 172,82 150,128 93,126" fill="#1c8d86" opacity=".65" />
          <polygon points="93,126 150,128 128,210 64,193" fill="#91dfd6" opacity=".45" />
          <Head persona={persona} x={68} y={76} scale={.85} rotate={-5} />
          <g transform="translate(77 105)"><polygon points="0,0 26,-5 34,14 5,19" fill="#29302c" /><polygon points="43,-7 69,-2 64,18 35,13" fill="#29302c" /><path d="M31 5L43 4M0 8L-18 0" stroke="#29302c" strokeWidth="5" /></g>
          <polygon points="199,118 231,136 202,151" fill={persona.color} />
        </>
      )
    case 'monkey':
      return (
        <>
          <polygon points="28,196 192,180 211,200 48,220" fill="#3c5260" />
          <polygon points="160,180 196,150 190,185" fill="#ff623f" /><polygon points="190,185 220,194 201,209" fill="#ffbd29" />
          <Body persona={persona} transform="translate(1 -15) rotate(8 120 170)" />
          <Arm points="79,120 43,101 24,76" color={persona.color} hand={[22, 72]} />
          <Arm points="160,123 189,102 202,78" color={persona.color} hand={[204, 74]} />
          <path d="M177 77Q211 61 208 32Q180 33 170 56" fill="#ffd13a" stroke="#292b28" strokeWidth="3" />
          <path d="M78 174Q39 184 46 213Q52 233 22 225" fill="none" stroke="#754a31" strokeWidth="8" />
          <Head persona={persona} x={66} y={10} scale={1.02} rotate={8} />
        </>
      )
    case 'control':
      return (
        <>
          <polygon points="95,184 145,184 171,225 68,225" fill="#6a3d28" />
          <Body persona={persona} transform="translate(0 -5)" />
          <Arm points="81,127 49,105 30,77" color={persona.color} hand={[27, 73]} />
          <Arm points="80,151 44,160 22,183" color={persona.color} hand={[19, 186]} />
          <Arm points="159,127 190,104 207,76" color={persona.color} hand={[210, 72]} />
          <Arm points="160,151 197,158 218,180" color={persona.color} hand={[221, 183]} />
          <path d="M27 67V17M210 66V7M20 183V132M220 180V126" stroke="#313431" strokeWidth="2" strokeDasharray="4 4" />
          <polygon points="104,113 120,129 136,113 145,178 120,195 94,178" fill="#363a36" opacity=".46" />
          <Head persona={persona} x={67} y={17} scale={1.02} rotate={-4} />
          <path d="M72 102L58 118M168 102L181 118" stroke="#272a27" strokeWidth="5" />
        </>
      )
    case 'coffin':
      return (
        <>
          <polygon points="24,58 164,40 219,93 188,216 45,220 5,162" fill="#191b19" stroke="#080908" strokeWidth="4" />
          <polygon points="39,72 155,57 198,101 174,199 55,203 22,153" fill="#6b716d" />
          <polygon points="22,153 198,101 174,199 55,203" fill="#3b403c" opacity=".7" />
          <polygon points="48,104 145,91 172,126 149,174 64,180 34,151" fill="#b9c4cd" />
          <polygon points="45,145 164,120 149,174 64,180" fill="#82a8c4" />
          <Head persona={persona} x={48} y={82} scale={.88} rotate={-14} />
          <polygon points="111,87 160,82 174,102 124,109" fill="#e7e4db" />
          <path d="M182 61L218 51M187 72L225 75" stroke="#7d8793" strokeWidth="5" />
        </>
      )
    case 'calendar':
      return (
        <>
          <polygon points="66,107 176,107 185,211 57,211" fill="#f7f4e9" stroke="#252724" strokeWidth="3" />
          <polygon points="66,107 176,107 177,140 63,140" fill={persona.color} />
          <g stroke="#aaa69a" strokeWidth="2"><path d="M79 155H163M78 174H163M75 193H160M103 142V206M135 142V206" /></g>
          <polygon points="122,144 165,144 161,189 120,189" fill="#fff" /><path d="M128 153L153 177M153 153L128 178" stroke="#e05b52" strokeWidth="5" />
          <polygon points="84,207 111,207 101,232 69,232" fill="#2b2e2b" /><polygon points="139,207 165,207 176,231 144,231" fill="#2b2e2b" />
          <Arm points="66,127 36,147 23,178" color={persona.color} hand={[20, 182]} />
          <Arm points="176,127 200,109 212,83" color={persona.color} hand={[215, 79]} />
          <path d="M205 73L222 55" stroke="#292b28" strokeWidth="4" /><polygon points="216,50 234,47 228,66" fill="#292b28" />
          <Head persona={persona} x={68} y={11} scale={1.02} rotate={5} />
        </>
      )
    case 'shrug':
      return (
        <>
          <Body persona={persona} wide robe />
          <Arm points="70,128 42,112 20,88" color={persona.color} hand={[17, 84]} />
          <Arm points="68,148 37,152 14,143" color={persona.color} hand={[10, 141]} />
          <Arm points="72,169 45,190 27,213" color={persona.color} hand={[24, 217]} />
          <Arm points="170,128 197,112 218,88" color={persona.color} hand={[221, 84]} />
          <Arm points="171,148 204,152 227,143" color={persona.color} hand={[231, 141]} />
          <Arm points="168,169 196,190 213,213" color={persona.color} hand={[216, 217]} />
          <polygon points="7,51 51,45 56,76 13,84" fill="#fff" stroke="#292b28" strokeWidth="2" /><path d="M16 60L45 68M22 52L42 59" stroke="#e35f52" strokeWidth="4" />
          <Head persona={persona} x={67} y={15} scale={1.02} rotate={2} />
          <polygon points="103,0 120,-10 137,0 128,15 111,15" fill="#ffd43b" opacity=".85" />
        </>
      )
    case 'rocket':
      return (
        <>
          <polygon points="65,135 31,151 18,191 50,181" fill="#50585f" /><polygon points="24,185 3,211 35,203" fill="#ffcc38" />
          <Body persona={persona} transform="translate(8 -7) rotate(-12 120 170)" />
          <Arm points="91,125 57,105 30,93" color={persona.color} hand={[26, 91]} />
          <Arm points="168,113 201,91 222,62" color={persona.color} hand={[224, 58]} />
          <Head persona={persona} x={75} y={7} scale={1.02} rotate={-12} />
          <path d="M84 62Q50 39 27 55Q10 67 5 48" fill="none" stroke="#d7a98b" strokeWidth="5" />
          <polygon points="-4,28 22,26 34,48 18,66 -7,56" fill="#e2b596" /><path d="M5 44Q15 34 26 44" stroke="#82443b" strokeWidth="3" fill="none" />
          <g stroke="#ff6b38" strokeWidth="5"><path d="M42 197L18 229M53 201L41 235" /></g>
        </>
      )
    case 'loop':
      return (
        <>
          <circle cx="120" cy="130" r="92" fill="none" stroke={persona.lightColor} strokeWidth="22" />
          <path d="M45 71Q78 28 137 39Q181 47 204 88" fill="none" stroke={persona.color} strokeWidth="11" />
          <polygon points="194,69 218,101 181,101" fill={persona.color} />
          <path d="M194 188Q161 229 101 220Q53 213 30 174" fill="none" stroke={persona.color} strokeWidth="11" />
          <polygon points="43,196 19,164 56,164" fill={persona.color} />
          <Body persona={persona} transform="translate(2 -4) rotate(12 120 170)" />
          <Arm points="88,130 58,147 48,174" color={persona.color} hand={[46, 178]} />
          <Arm points="165,142 194,157 208,181" color={persona.color} hand={[211, 184]} />
          <rect x="159" y="163" width="49" height="35" fill="#f7f2db" stroke="#292b28" strokeWidth="2" transform="rotate(12 184 180)" /><path d="M169 173H197M168 182H194" stroke="#6c6f69" strokeWidth="2" />
          <Head persona={persona} x={72} y={20} scale={.98} rotate={11} />
        </>
      )
    case 'halo':
      return (
        <>
          <Body persona={persona} wide robe />
          <polygon points="62,177 178,177 201,226 39,226" fill="#f7f1d4" />
          <Arm points="72,132 39,118 21,93" color="#f7f1d4" hand={[18, 89]} />
          <Arm points="168,132 200,117 218,91" color="#f7f1d4" hand={[221, 87]} />
          <ellipse cx="120" cy="25" rx="45" ry="13" fill="none" stroke="#ffd22f" strokeWidth="8" />
          <Head persona={persona} x={67} y={33} scale={1.02} rotate={-2} />
          <polygon points="78,167 111,178 100,206 68,192" fill="#fff" stroke="#292b28" strokeWidth="2" />
          <circle cx="192" cy="185" r="18" fill="#e9b928" stroke="#292b28" strokeWidth="3" /><path d="M173 187Q154 194 149 173" stroke="#ddb18f" strokeWidth="9" fill="none" />
          <polygon points="184,181 199,181 194,194 181,193" fill="#fff4bb" />
        </>
      )
    case 'brick':
      return (
        <>
          <polygon points="45,86 192,86 203,207 35,207" fill={persona.color} stroke="#242624" strokeWidth="4" />
          <g stroke="#892d29" strokeWidth="3"><path d="M40 116H198M38 148H200M36 180H202M78 86V116M130 86V116M62 116V148M113 116V148M168 116V148M80 148V180M137 148V180M58 180V207M116 180V207M174 180V207" /></g>
          <polygon points="58,207 95,207 87,229 46,229" fill="#282b28" /><polygon points="146,207 182,207 195,229 153,229" fill="#282b28" />
          <Head persona={persona} x={67} y={4} scale={1.02} rotate={-4} />
          <g fill="#f2eddd" stroke="#303330" strokeWidth="2"><polygon points="4,48 38,42 49,66 16,75" /><polygon points="194,31 231,42 222,69 187,56" /></g>
          <path d="M39 57L20 32M195 48L214 23" stroke="#e14f45" strokeWidth="5" /><polygon points="10,23 29,24 19,39" fill="#e14f45" /><polygon points="219,15 222,35 207,25" fill="#e14f45" />
        </>
      )
    case 'money':
      return (
        <>
          <polygon points="72,119 23,142 38,221 92,184" fill="#4c3b9c" /><polygon points="168,119 217,141 201,221 149,184" fill="#4c3b9c" />
          <Body persona={persona} wide />
          <polygon points="85,125 120,144 154,125 164,189 120,207 75,189" fill="#c7d2cc" stroke="#353835" strokeWidth="3" />
          <polygon points="85,125 120,144 102,165 75,189" fill="#e9efeb" /><polygon points="120,144 154,125 164,189 138,164" fill="#87988f" />
          <Arm points="78,146 61,172 83,193" color="#aab7b0" hand={[87, 195]} />
          <Arm points="162,146 178,171 156,193" color="#aab7b0" hand={[152, 195]} />
          <circle cx="120" cy="181" r="36" fill="#ffd338" stroke="#2c2f2c" strokeWidth="4" />
          <polygon points="120,155 139,174 132,202 105,205 98,176" fill="#f6b51f" /><path d="M110 171H130M110 181H130M120 170V196" stroke="#704f14" strokeWidth="4" />
          <Head persona={persona} x={67} y={12} scale={1.02} rotate={2} />
          <g fill="#83d58a" stroke="#292b28" strokeWidth="2"><polygon points="16,62 56,51 65,76 24,86" /><polygon points="183,48 225,60 218,84 177,72" /></g>
        </>
      )
  }
}

export default function PolygonAvatar({ persona, size = 180, className = '' }: PolygonAvatarProps) {
  return (
    <svg className={`polygon-avatar ${className}`} width={size} height={size} viewBox="0 0 240 240" role="img" aria-label={`${persona.name}人格角色`}>
      <ellipse cx="120" cy="231" rx="78" ry="7" fill="#111" opacity=".12" />
      <Figure persona={persona} />
    </svg>
  )
}
