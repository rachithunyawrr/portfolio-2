import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DPR_LIMIT } from '../../lib/performance'
import { CHAPTER_CAM_Z, FORMATION_DISTANCE, SCATTER_RANGE, clock, sceneState, sharedUniforms } from '../../lib/sceneState'
import { buildFormation, type Formation, type FormationPlan } from '../../lib/textPoints'
import { ParticlePoints } from './ParticlePoints'

type ChapterKey = keyof typeof CHAPTER_CAM_Z

interface Placement {
  id: ChapterKey
  y: number
  plan: FormationPlan
}

const placements: Placement[] = [
  { id: 'hero', y: 0.25, plan: { kind: 'shape', count: 3200 } },
  { id: 'portfolio', y: 1.15, plan: { kind: 'text', text: 'PORTFOLIO', height: 4.0, count: 2600 } },
  { id: 'work', y: 1.15, plan: { kind: 'text', text: 'MY WORK', height: 4.4, count: 2400 } },
  { id: 'about', y: 1.2, plan: { kind: 'text', text: 'WHO IS RACHIT', height: 3.0, count: 3200 } },
  { id: 'story', y: 0, plan: { kind: 'cloud', count: 2600 } },
  { id: 'skills', y: 0, plan: { kind: 'cloud', count: 2600 } },
  { id: 'projects', y: 0, plan: { kind: 'cloud', count: 2600 } },
  { id: 'voice', y: 0.95, plan: { kind: 'wave', count: 1800 } },
  { id: 'vision', y: 1.2, plan: { kind: 'text', text: 'MY VISION', height: 4.2, count: 2400 } },
  { id: 'contact', y: 1.2, plan: { kind: 'text', text: 'hello@rachitsharma', height: 2.9, count: 3000 } },
]

const camZKey = Object.keys(CHAPTER_CAM_Z) as (keyof typeof CHAPTER_CAM_Z)[]

function computeTops(): number[] {
  return camZKey.map((id) => {
    const el = document.getElementById(`ch-${id}`)
    return el ? el.getBoundingClientRect().top + window.scrollY : 0
  })
}

function mapCamZ(scrollY: number): number {
  const tops = computeTops()
  const vals = camZKey.map((id) => CHAPTER_CAM_Z[id])
  if (scrollY <= tops[0]) return vals[0]
  for (let i = 0; i < tops.length - 1; i++) {
    const a = tops[i]
    const b = tops[i + 1]
    if (scrollY >= a && scrollY < b) {
      const t = (scrollY - a) / Math.max(1, b - a)
      const e = t * t * (3 - 2 * t)
      return vals[i] + (vals[i + 1] - vals[i]) * e
    }
  }
  const lastTop = tops[tops.length - 1]
  const lastVal = vals[vals.length - 1]
  const tail = scrollY - lastTop
  return tail > 0 ? lastVal - Math.min(tail / 90, 18) : lastVal
}

function computeScatter(cam: number): number {
  const { from, to } = SCATTER_RANGE
  const t = THREE.MathUtils.clamp((cam - from) / (to - from), 0, 1)
  return Math.sin(t * Math.PI) * 0.55
}

function StarField({ formation }: { formation: Formation }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (group.current) group.current.position.z = state.camera.position.z
  })
  return (
    <group ref={group}>
      <ParticlePoints formation={formation} />
    </group>
  )
}

function CameraRig() {
  const { camera } = useThree()
  useFrame((_, delta) => {
    const damp = THREE.MathUtils.damp
    const tx = sceneState.mouseX * 2.2
    const ty = -0.15 + sceneState.mouseY * 1.1
    // oxlint-disable-next-line react/immutability
    camera.position.x = damp(camera.position.x, tx, 3, delta)
    // oxlint-disable-next-line react/immutability
    camera.position.y = damp(camera.position.y, ty, 3, delta)
    // oxlint-disable-next-line react/immutability
    camera.position.z = damp(camera.position.z, sceneState.camZ, 5, delta)
    camera.lookAt(tx * 0.55, ty * 0.55 + 0.3, camera.position.z + 9)
  })
  return null
}

function ClockDriver() {
  useFrame(() => {
    sharedUniforms.uTime.value = clock.getElapsedTime()
    sharedUniforms.uScatter.value = sceneState.scatter
  })
  return null
}

export default function WorldScene() {
  const stars: Formation = useMemo(() => buildFormation({ kind: 'stars', count: 1400 }), [])
  const formations = useMemo(
    () =>
      placements.map((p) => ({
        ...p,
        formation: buildFormation(p.plan),
      })),
    [],
  )

  useEffect(() => {
    sceneState.camZ = 0
    sceneState.scatter = 0

    const onMove = (e: PointerEvent) => {
      sceneState.mouseX = (e.clientX / window.innerWidth) * 2 - 1
      sceneState.mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        const cam = mapCamZ(self.scroll())
        sceneState.camZ = cam
        sceneState.scatter = computeScatter(cam)
      },
    })

    gsap.registerPlugin(ScrollTrigger)
    return () => {
      window.removeEventListener('pointermove', onMove)
      trigger.kill()
    }
  }, [])

  return (
    <Canvas
      dpr={DPR_LIMIT}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: 60, near: 0.3, far: 200, position: [0, 0, 0] }}
      onCreated={({ gl }) => {
        sharedUniforms.uPixelRatio.value = gl.getPixelRatio()
      }}
    >
      <CameraRig />
      <ClockDriver />
      {formations.map(({ id, y, formation }) => (
        <group key={id} position={[0, y, CHAPTER_CAM_Z[id] + FORMATION_DISTANCE]}>
          <ParticlePoints formation={formation} />
        </group>
      ))}
      <StarField formation={stars} />
    </Canvas>
  )
}