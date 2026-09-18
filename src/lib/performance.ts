export type Tier = 'high' | 'low'

export function detectTier(): Tier {
  try {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return 'low'

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const nav = navigator as unknown as { deviceMemory?: number }
    const cores = navigator.hardwareConcurrency ?? 0
    const memory = nav.deviceMemory ?? 0

    if (cores > 0 && cores <= 4) return 'low'
    if (memory > 0 && memory <= 4) return 'low'
    if (coarse && cores === 0) return 'low'
    return 'high'
  } catch {
    return 'high'
  }
}

export const TIER: Tier = detectTier()

export const POINT_SCALE = TIER === 'high' ? 1 : 0.55

export const DPR_LIMIT = TIER === 'high' ? 1.75 : 1.25
