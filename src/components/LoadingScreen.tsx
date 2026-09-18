import { useEffect, useRef, useState } from 'react'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 1500
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDone(true)
        setTimeout(onComplete, 450)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05070d] transition-opacity duration-500 ${
        done ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="glow-text font-[family-name:var(--font-display)] text-4xl font-bold tracking-widest text-white">
        RS
      </div>
      <div className="mt-4 text-xs tracking-[0.35em] uppercase text-[#8fa3c9]">Loading the universe</div>
      <div className="mt-8 h-1 w-64 overflow-hidden rounded-full bg-[#1b2740]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#3a8dff] to-[#ffb454] transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3 font-mono text-sm text-[#7cc0ff]">{progress}%</div>
    </div>
  )
}