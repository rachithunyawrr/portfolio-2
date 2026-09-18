import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { DPR_LIMIT, TIER } from '../../lib/performance'
import { createStarData, type ParticleTarget } from '../../lib/textPoints'
import { ParticleField } from './ParticleField'
import { starFragmentShader, starVertexShader } from './shader'

gsap.registerPlugin(ScrollTrigger)

interface CameraStop {
  sectionId: string
  z: number
}

interface Placement extends CameraStop {
  id: string
  formationId: string
  y: number
  target: ParticleTarget
  count: number
  lowCount: number
  rotate?: boolean
}

const cameraStops: CameraStop[] = [
  { sectionId: 'ch-hero', z: 0 },
  { sectionId: 'ch-work', z: 18 },
  { sectionId: 'ch-about', z: 36 },
  { sectionId: 'ch-story', z: 52 },
  { sectionId: 'ch-skills', z: 68 },
  { sectionId: 'ch-projects', z: 84 },
  { sectionId: 'ch-voice', z: 102 },
  { sectionId: 'ch-vision', z: 120 },
  { sectionId: 'ch-contact', z: 138 },
]

const placements: Placement[] = [
  { id: 'hero', formationId: 'hero', sectionId: 'ch-hero', z: -10, y: 2.85, target: { kind: 'shape', radius: 2.1 }, count: 16000, lowCount: 5500, rotate: true },
  { id: 'work', formationId: 'work', sectionId: 'ch-work', z: 8, y: 0.2, target: { kind: 'text', text: 'MY WORK', height: 4.5 }, count: 16000, lowCount: 5200 },
  { id: 'about', formationId: 'about', sectionId: 'ch-about', z: 26, y: 0.9, target: { kind: 'text', text: 'WHO IS RACHIT', height: 3.2 }, count: 16000, lowCount: 5200 },
  { id: 'skills', formationId: 'skills', sectionId: 'ch-skills', z: 58, y: 0.9, target: { kind: 'text', text: 'WHAT I WORK WITH', height: 3.05 }, count: 16000, lowCount: 5200 },
  { id: 'voice-title', formationId: 'voice', sectionId: 'ch-voice', z: 92, y: 2.15, target: { kind: 'text', text: 'VOICEMEMORIES AI', height: 2.5 }, count: 16000, lowCount: 5200 },
  { id: 'voice-wave', formationId: 'voice', sectionId: 'ch-voice', z: 92, y: -1.35, target: { kind: 'wave' }, count: 16000, lowCount: 5200 },
  { id: 'vision', formationId: 'vision', sectionId: 'ch-vision', z: 110, y: 1.1, target: { kind: 'text', text: 'MY VISION', height: 4.25 }, count: 16000, lowCount: 5200 },
  { id: 'contact', formationId: 'contact', sectionId: 'ch-contact', z: 128, y: 1.2, target: { kind: 'text', text: 'SAY HELLO', height: 4.3 }, count: 16000, lowCount: 5200 },
]

const cameraState = {
  z: 0,
  mouseX: 0,
  mouseY: 0,
}

function interpolateCamera(scrollY: number, tops: number[]): number {
  if (!tops.length || scrollY <= tops[0]) return cameraStops[0].z

  for (let i = 0; i < tops.length - 1; i++) {
    if (scrollY >= tops[i] && scrollY < tops[i + 1]) {
      const progress = (scrollY - tops[i]) / Math.max(1, tops[i + 1] - tops[i])
      return THREE.MathUtils.lerp(cameraStops[i].z, cameraStops[i + 1].z, THREE.MathUtils.smootherstep(progress, 0, 1))
    }
  }

  return cameraStops[cameraStops.length - 1].z
}

function CameraRig() {
  const { camera } = useThree()
  const cameraRef = useRef(camera)

  useEffect(() => {
    cameraRef.current = camera
  }, [camera])

  useFrame((_, delta) => {
    const x = cameraState.mouseX * 1.25
    const y = cameraState.mouseY * 0.7
    const activeCamera = cameraRef.current
    activeCamera.position.x = THREE.MathUtils.damp(activeCamera.position.x, x, 3.2, delta)
    activeCamera.position.y = THREE.MathUtils.damp(activeCamera.position.y, y, 3.2, delta)
    activeCamera.position.z = THREE.MathUtils.damp(activeCamera.position.z, cameraState.z, 4.2, delta)
    activeCamera.lookAt(x * 0.36, y * 0.34 + 0.1, activeCamera.position.z - 9.5)
  })

  return null
}

function StarField() {
  const data = useMemo(() => createStarData(TIER === 'high' ? 3200 : 1200), [])
  const material = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({ uPixelRatio: { value: 1 } }), [])

  useFrame((state) => {
    if (material.current) material.current.uniforms.uPixelRatio.value = state.gl.getPixelRatio()
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function SceneController() {
  const tops = useRef<number[]>([])

  useEffect(() => {
    const updateTops = () => {
      tops.current = cameraStops.map((stop) => {
        const element = document.getElementById(stop.sectionId)
        return element ? element.getBoundingClientRect().top + window.scrollY : 0
      })
      cameraState.z = interpolateCamera(window.scrollY, tops.current)
    }

    const onPointerMove = (event: PointerEvent) => {
      cameraState.mouseX = (event.clientX / window.innerWidth) * 2 - 1
      cameraState.mouseY = (event.clientY / window.innerHeight) * 2 - 1
    }

    updateTops()
    const refresh = () => updateTops()
    ScrollTrigger.addEventListener('refreshInit', refresh)
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight),
      onUpdate: (self) => {
        cameraState.z = interpolateCamera(self.scroll(), tops.current)
      },
    })
    window.addEventListener('pointermove', onPointerMove)
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', refresh)
      window.removeEventListener('pointermove', onPointerMove)
      trigger.kill()
    }
  }, [])

  return null
}

export default function WorldScene() {
  return (
    <Canvas
      dpr={DPR_LIMIT}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: 60, near: 0.3, far: 280, position: [0, 0, 0] }}
    >
      <SceneController />
      <CameraRig />
      <StarField />
      {placements.map((placement) => (
        <ParticleField
          key={placement.id}
          formationId={placement.formationId}
          sectionId={placement.sectionId}
          target={placement.target}
          count={TIER === 'high' ? placement.count : placement.lowCount}
          position={[0, placement.y, placement.z]}
          rotate={placement.rotate}
        />
      ))}
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.78} luminanceThreshold={0.16} luminanceSmoothing={0.38} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
