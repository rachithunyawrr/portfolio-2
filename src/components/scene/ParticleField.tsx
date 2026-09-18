import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { activateParticleFormation, registerParticleFormation } from '../../lib/particleVisibility'
import { createParticleData, type ParticleTarget } from '../../lib/textPoints'
import { particleFragmentShader, particleVertexShader } from './shader'

gsap.registerPlugin(ScrollTrigger)

interface ParticleFieldProps {
  formationId: string
  sectionId: string
  target: ParticleTarget
  count: number
  position: [number, number, number]
  rotate?: boolean
}

export function ParticleField({ formationId, sectionId, target, count, position, rotate = false }: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null)
  const material = useRef<THREE.ShaderMaterial>(null)
  const { camera, size } = useThree()
  const maxWidth = useMemo(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera
    const aspect = size.width / Math.max(1, size.height)
    return 2 * Math.tan(THREE.MathUtils.degToRad(perspectiveCamera.fov / 2)) * 10 * aspect * 0.76
  }, [camera, size.height, size.width])
  const data = useMemo(() => createParticleData(target, count, maxWidth), [count, maxWidth, target])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: formationId === 'hero' ? 1 : 0 },
      uPixelRatio: { value: 1 },
      uWave: { value: target.kind === 'wave' ? 1 : 0 },
      uOpacity: { value: formationId === 'hero' ? 1 : 0 },
    }),
    [formationId, target.kind],
  )

  useEffect(() => {
    return registerParticleFormation(formationId, (visible, delay) => {
      const opacity = material.current?.uniforms.uOpacity
      if (!opacity) return
      gsap.killTweensOf(opacity)
      gsap.to(opacity, {
        value: visible ? 1 : 0,
        duration: visible ? 0.42 : 0.28,
        delay,
        ease: 'power2.out',
      })
    })
  }, [formationId])

  useEffect(() => {
    if (formationId === 'hero') return

    const progress = material.current?.uniforms.uProgress
    if (!progress) return

    const tween = gsap.fromTo(
      progress,
      { value: 0 },
      {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: `#${sectionId}`,
          start: 'top 88%',
          end: 'top 30%',
          scrub: 0.55,
          invalidateOnRefresh: true,
          onEnter: () => activateParticleFormation(formationId),
          onEnterBack: () => activateParticleFormation(formationId),
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [formationId, sectionId])

  useFrame((state, delta) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime
      material.current.uniforms.uPixelRatio.value = state.gl.getPixelRatio()
    }
    if (rotate && points.current) {
      points.current.rotation.y += delta * 0.18
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.36) * 0.09
    }
  })

  return (
    <points ref={points} position={position} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.start, 3]} />
        <bufferAttribute attach="attributes-aStart" args={[data.start, 3]} />
        <bufferAttribute attach="attributes-aTarget" args={[data.target, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[data.color, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[data.seed, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
