import * as THREE from 'three'

export type ParticleTarget =
  | { kind: 'text'; text: string; height?: number }
  | { kind: 'shape'; radius?: number }
  | { kind: 'wave' }

export interface ParticleData {
  start: Float32Array
  target: Float32Array
  color: Float32Array
  seed: Float32Array
}

interface StarData {
  positions: Float32Array
  colors: Float32Array
  sizes: Float32Array
}

function randomCloudPoint(radius = 10): [number, number, number] {
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(1 - Math.random() * 2)
  const distance = radius * Math.cbrt(Math.random())
  return [
    distance * Math.sin(phi) * Math.cos(theta),
    distance * Math.sin(phi) * Math.sin(theta) * 0.72,
    distance * Math.cos(phi),
  ]
}

function takePoints(points: [number, number, number][], count: number): Float32Array {
  const target = new Float32Array(count * 3)
  if (!points.length) {
    for (let i = 0; i < count; i++) {
      const point = randomCloudPoint(2.5)
      target.set(point, i * 3)
    }
    return target
  }

  for (let i = 0; i < count; i++) {
    const point = points[Math.floor(Math.random() * points.length)]
    target[i * 3] = point[0]
    target[i * 3 + 1] = point[1]
    target[i * 3 + 2] = point[2]
  }
  return target
}

function sampleTextTarget(text: string, count: number, height = 3.7, maxWidth = Number.POSITIVE_INFINITY): Float32Array {
  const width = 2048
  const canvasHeight = 512
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = canvasHeight
  const context = canvas.getContext('2d', { willReadFrequently: true })

  if (!context) return takePoints([], count)

  let fontSize = 350
  const fontFamily = 'Arial Black, Arial, sans-serif'
  context.font = `900 ${fontSize}px ${fontFamily}`
  while (context.measureText(text).width > width - 120 && fontSize > 52) {
    fontSize -= 8
    context.font = `900 ${fontSize}px ${fontFamily}`
  }

  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = '#ffffff'
  context.fillText(text, width / 2, canvasHeight / 2 + fontSize * 0.03)

  const pixels = context.getImageData(0, 0, width, canvasHeight).data
  const candidates: [number, number, number][] = []
  const step = 2
  const fittedHeight = Math.min(height, (maxWidth / width) * canvasHeight)
  const scale = canvasHeight / fittedHeight

  for (let y = 0; y < canvasHeight; y += step) {
    for (let x = 0; x < width; x += step) {
      const alpha = pixels[(y * width + x) * 4 + 3]
      if (alpha > 100) {
        candidates.push([
          (x - width / 2) / scale + (Math.random() - 0.5) * 0.035,
          (canvasHeight / 2 - y) / scale + (Math.random() - 0.5) * 0.035,
          (Math.random() - 0.5) * 0.24,
        ])
      }
    }
  }

  return takePoints(candidates, count)
}

function sampleShapeTarget(count: number, radius = 3.15): Float32Array {
  const geometry = new THREE.IcosahedronGeometry(radius, 5)
  const positions = geometry.getAttribute('position')
  const points: [number, number, number][] = []

  for (let i = 0; i < positions.count; i++) {
    points.push([positions.getX(i), positions.getY(i), positions.getZ(i)])
  }

  geometry.dispose()
  return takePoints(points, count)
}

function sampleWaveTarget(count: number): Float32Array {
  const points: [number, number, number][] = []

  for (let i = 0; i < count; i++) {
    const x = -5.8 + Math.random() * 11.6
    const amplitude = 0.16 + Math.pow(Math.random(), 0.52) * 1.7
    const y = Math.sin(x * 1.72) * amplitude + (Math.random() - 0.5) * 0.08
    points.push([x, y, (Math.random() - 0.5) * 0.38])
  }

  return takePoints(points, count)
}

function targetPositions(target: ParticleTarget, count: number, maxWidth?: number): Float32Array {
  switch (target.kind) {
    case 'text':
      return sampleTextTarget(target.text, count, target.height, maxWidth)
    case 'shape':
      return sampleShapeTarget(count, target.radius)
    case 'wave':
      return sampleWaveTarget(count)
  }
}

export function createParticleData(target: ParticleTarget, count: number, maxWidth?: number): ParticleData {
  const start = new Float32Array(count * 3)
  const color = new Float32Array(count * 3)
  const seed = new Float32Array(count * 3)
  const blue: [number, number, number] = [74 / 255, 158 / 255, 1]
  const gold: [number, number, number] = [245 / 255, 166 / 255, 35 / 255]

  for (let i = 0; i < count; i++) {
    const offset = i * 3
    const point = randomCloudPoint(10.5)
    const warmth = Math.min(1, (i / Math.max(1, count - 1)) * 0.68 + Math.random() * 0.42)
    start.set(point, offset)
    color[offset] = blue[0] + (gold[0] - blue[0]) * warmth
    color[offset + 1] = blue[1] + (gold[1] - blue[1]) * warmth
    color[offset + 2] = blue[2] + (gold[2] - blue[2]) * warmth
    seed[offset] = Math.random()
    seed[offset + 1] = Math.random()
    seed[offset + 2] = Math.random()
  }

  return { start, target: targetPositions(target, count, maxWidth), color, seed }
}

export function createStarData(count: number): StarData {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const offset = i * 3
    const point = randomCloudPoint(135)
    positions[offset] = point[0]
    positions[offset + 1] = point[1]
    positions[offset + 2] = point[2] - 66
    const warm = Math.random() > 0.84
    colors[offset] = warm ? 0.96 : 0.38
    colors[offset + 1] = warm ? 0.66 : 0.67
    colors[offset + 2] = warm ? 0.28 : 1
    sizes[i] = 0.55 + Math.random() * 1.1
  }

  return { positions, colors, sizes }
}
