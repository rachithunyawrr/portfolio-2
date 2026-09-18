import { useMemo } from 'react'

interface Star {
  left: string
  top: string
  size: number
  delay: number
  duration: number
  gold: boolean
}

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2.2,
    delay: Math.random() * 5,
    duration: 2.5 + Math.random() * 4,
    gold: Math.random() > 0.75,
  }))
}

const STAR_COUNT = 90

export function FallbackBackground() {
  const stars = useMemo<Star[]>(() => makeStars(STAR_COUNT), [])

  return (
    <div className="fixed inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 18% 12%, rgba(58,141,255,0.14), transparent 55%), radial-gradient(110% 90% at 85% 30%, rgba(255,180,84,0.1), transparent 55%), radial-gradient(140% 120% at 50% 100%, rgba(36,64,128,0.25), transparent 60%), #05070d',
        }}
      />
      {stars.map((s, i) => (
        <span
          key={i}
          className="rounded-full"
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: s.gold ? '#ffb454' : '#7cc0ff',
            boxShadow: `0 0 ${s.size * 3}px ${s.size}px ${s.gold ? 'rgba(255,180,84,0.35)' : 'rgba(124,192,255,0.35)'}`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  )
}