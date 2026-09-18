import { useState } from 'react'

interface Sparkle {
  left: string
  top: string
  delay: number
}

const SPARKLES: Sparkle[] = [
  { left: '8%', top: '12%', delay: 0 },
  { left: '86%', top: '18%', delay: 0.4 },
  { left: '14%', top: '78%', delay: 0.9 },
  { left: '80%', top: '82%', delay: 0.2 },
  { left: '48%', top: '6%', delay: 1.2 },
  { left: '92%', top: '52%', delay: 0.7 },
  { left: '4%', top: '44%', delay: 1.5 },
  { left: '60%', top: '94%', delay: 0.5 },
]

export function PhotoFrame() {
  const [failed, setFailed] = useState(false)

  return (
    <div className="group relative">
      <div className="ring-glow relative overflow-hidden rounded-3xl border border-[#1b2740]">
        {failed ? (
          <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#0a0f1c] to-[#0d1424] p-8 text-center">
            <span className="glow-gold font-[family-name:var(--font-display)] text-3xl font-bold text-white">RS</span>
            <span className="text-sm text-[#8fa3c9]">Your photo goes here</span>
            <span className="chip">Drop photo.jpg into /public</span>
          </div>
        ) : (
          <img
            src="/photo.jpg"
            alt="Rachit Sharma"
            onError={() => setFailed(true)}
            className="aspect-[4/5] w-full object-cover"
          />
        )}
      </div>

      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="sparkle opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ left: s.left, top: s.top, animationDelay: `${s.delay}s` }}
        />
      ))}
    </div>
  )
}