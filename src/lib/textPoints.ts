import { POINT_SCALE } from './performance'

export interface Formation {
  positions: Float32Array
  colors: Float32Array
  rand: Float32Array
  sizes: Float32Array
}

type RGB = [number, number, number]

const BLUE_A: RGB = [58, 141, 255]
const BLUE_B: RGB = [124, 192, 255]
const WHITE: RGB = [215, 230, 255]
const GOLD: RGB = [255, 180, 84]
const DIM_BLUE: RGB = [84, 130, 214]
const DIM_GOLD: RGB = [200, 145, 96]

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function mixColor(a: RGB, b: RGB, t: number): RGB {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

function norm(c: RGB, dim = 1): RGB {
  return [(c[0] / 255) * dim, (c[1] / 255) * dim, (c[2] / 255) * dim]
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}

function finishFormation(pts: number[][], colors: number[][], target: number): Formation {
  const n = Math.min(pts.length, target)
  const positions = new Float32Array(n * 3)
  const cols = new Float32Array(n * 3)
  const rand = new Float32Array(n * 3)
  const sizes = new Float32Array(n)

  for (let i = 0; i < n; i++) {
    positions[i * 3] = pts[i][0]
    positions[i * 3 + 1] = pts[i][1]
    positions[i * 3 + 2] = pts[i][2]
    cols[i * 3] = colors[i][0]
    cols[i * 3 + 1] = colors[i][1]
    cols[i * 3 + 2] = colors[i][2]
    rand[i * 3] = Math.random()
    rand[i * 3 + 1] = Math.random()
    rand[i * 3 + 2] = Math.random()
    sizes[i] = 0.55 + Math.random() * 0.75
  }
  return { positions, colors: cols, rand, sizes }
}

export function sampleTextPoints(
  text: string,
  target: number,
  opts: { height?: number; thickness?: number; dim?: number } = {},
): Formation {
  const height = opts.height ?? 3.6
  const thickness = opts.thickness ?? 0.55
  const dim = opts.dim ?? 1
  const W = 2048
  const H = 512

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, W, H)

  let fontSize = 360
  const family = '"Arial Black", "Space Grotesk", Arial, sans-serif'
  const fitText = () => {
    ctx.font = `bold ${fontSize}px ${family}`
    while (ctx.measureText(text).width > W - 170 && fontSize > 40) {
      fontSize -= 6
      ctx.font = `bold ${fontSize}px ${family}`
    }
  }
  fitText()
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fff'
  ctx.fillText(text, W / 2, H / 2)

  const data = ctx.getImageData(0, 0, W, H).data
  const eligible: number[] = []
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 128) eligible.push(i / 4)
  }
  const sampleCount = Math.min(eligible.length, target)
  const prob = eligible.length > 0 ? sampleCount / eligible.length : 0
  const picked: number[] = []
  if (prob >= 0.85) {
    for (let k = 0; k < sampleCount; k++) picked.push(eligible[Math.floor(Math.random() * eligible.length)])
  } else {
    for (const px of eligible) {
      if (Math.random() < prob) picked.push(px)
    }
    let k = picked.length
    while (k < sampleCount) {
      picked.push(eligible[Math.floor(Math.random() * eligible.length)])
      k++
    }
  }

  const scale = H / height
  const pts: [number, number, number][] = []
  const colors: RGB[] = []

  for (let i = 0; i < picked.length; i++) {
    const idx = picked[i]
    const px = idx % W
    const py = Math.floor(idx / W)
    const x = (px - W / 2) / scale
    const y = (H / 2 - py) / scale
    const z = (Math.random() - 0.5) * thickness * 2
    pts.push([x + (Math.random() - 0.5) * 0.06, y + (Math.random() - 0.5) * 0.06, z])
    const frac = px / W
    const side = mixColor(BLUE_A, GOLD, frac)
    const glow = mixColor(side, WHITE, 0.22 + Math.random() * 0.25)
    colors.push(norm(glow, dim))
  }

  const extra = target - picked.length
  if (extra > 0) {
    const cx = 0
    const cy = 0
    const r = Math.max(height * 1.6, 3.2)
    for (let i = 0; i < extra; i++) {
      pts.push([cx + (Math.random() - 0.5) * r * 2, cy + (Math.random() - 0.5) * r * 2, (Math.random() - 0.5) * thickness * 4])
      const c = Math.random() > 0.5 ? DIM_BLUE : DIM_GOLD
      colors.push(norm(c, dim * 0.8))
    }
  }

  return finishFormation(shuffle(pts), shuffle(colors), target)
}

export function neuralSpherePoints(target: number): Formation {
  const n = target
  const pts: [number, number, number][] = []
  const colors: RGB[] = []
  const baseR = 3.05

  for (let i = 0; i < n; i++) {
    const t = i / n
    const theta = Math.acos(1 - 2 * t)
    const phi = (1 + Math.sqrt(5)) * Math.PI * i

    let r = baseR
    r *= 1 + 0.16 * Math.sin(theta * 2.2 + phi * 1.3) * Math.cos(theta * 2)
    r *= 1 + 0.12 * Math.sin(phi * 2.4 + theta * 1.8)
    if (Math.random() < 0.09) r *= 1 + Math.random() * 3.2

    const x = r * Math.sin(theta) * Math.cos(phi)
    const y = r * Math.sin(theta) * Math.sin(phi)
    const z = r * Math.cos(theta)

    pts.push([x, y, z])

    const frac = (y / baseR + 1) / 2
    const warm = mixColor(BLUE_A, GOLD, frac)
    const whiteMix = Math.random() < 0.12 ? WHITE : warm
    colors.push(norm(mixColor(whiteMix, WHITE, 0.12 + Math.random() * 0.18)))
  }

  return finishFormation(shuffle(pts), colors, n)
}

export function cloudPoints(target: number): Formation {
  const n = target
  const pts: [number, number, number][] = []
  const colors: RGB[] = []

  for (let i = 0; i < n; i++) {
    const r = 3.6 + Math.pow(Math.random(), 0.75) * 11
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.6 + (Math.random() - 0.5) * 2.2
    const z = r * Math.cos(phi)
    pts.push([x, y, z])
    const warm = Math.random() > 0.5
    const c = mixColor(DIM_BLUE, warm ? GOLD : BLUE_B, Math.random() * 0.7)
    colors.push(norm(c, 0.5 + Math.random() * 0.4))
  }

  return finishFormation(shuffle(pts), colors, n)
}

export function waveformPoints(target: number): Formation {
  const n = target
  const pts: [number, number, number][] = []
  const colors: RGB[] = []
  const rings = 7
  const perRing = Math.max(40, Math.floor(n / (rings + 1)))

  for (let ring = 0; ring < rings; ring++) {
    const baseR = 1.3 + ring * 0.62
    for (let i = 0; i < perRing; i++) {
      const a = (i / perRing) * Math.PI * 2
      const pulse = 0.32 * Math.sin(a * 3 + ring * 1.4)
      const r = baseR + pulse
      pts.push([r * Math.cos(a), r * Math.sin(a) * 0.42, (Math.random() - 0.5) * 0.5])
      const frac = ring / rings
      const c = mixColor(BLUE_A, GOLD, frac)
      colors.push(norm(c, 0.8 + Math.random() * 0.35))
    }
  }

  while (pts.length < n) {
    const a = Math.random() * Math.PI * 2
    const r = 1 + Math.random() * 5
    pts.push([Math.cos(a) * r, Math.sin(a) * r * 0.42, (Math.random() - 0.5) * 0.6])
    colors.push(norm(BLUE_B, 0.5))
  }

  return finishFormation(shuffle(pts), colors, n)
}

export function starPoints(target: number): Formation {
  const n = target
  const pts: [number, number, number][] = []
  const colors: RGB[] = []

  for (let i = 0; i < n; i++) {
    const r = 60 + Math.random() * 90
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    pts.push([r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)])
    const c = Math.random() > 0.8 ? WHITE : BLUE_B
    colors.push(norm(c, 0.35 + Math.random() * 0.5))
  }

  const result = finishFormation(shuffle(pts), colors, n)
  for (let i = 0; i < result.sizes.length; i++) result.sizes[i] *= 0.55
  return result
}

export interface FormationPlan {
  kind: 'shape' | 'text' | 'cloud' | 'wave' | 'stars'
  text?: string
  height?: number
  dim?: number
  count: number
}

export function buildFormation(plan: FormationPlan): Formation {
  const scale = Math.max(POINT_SCALE, 0.55)
  const count = Math.max(800, Math.round(plan.count * scale))
  switch (plan.kind) {
    case 'shape':
      return neuralSpherePoints(count)
    case 'text':
      return sampleTextPoints(plan.text!, count, { height: plan.height ?? 3.6, dim: plan.dim ?? 1 })
    case 'cloud':
      return cloudPoints(count)
    case 'wave':
      return waveformPoints(count)
    case 'stars':
      return starPoints(count)
  }
}