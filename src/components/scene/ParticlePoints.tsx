import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { sharedUniforms } from '../../lib/sceneState'
import type { Formation } from '../../lib/textPoints'
import { particleFragmentShader, particleVertexShader } from './shader'

export function ParticlePoints({ formation }: { formation: Formation }) {
  const points = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      uniforms: sharedUniforms,
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    })

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('aPos', new THREE.BufferAttribute(formation.positions, 3))
    geometry.setAttribute('aColor', new THREE.BufferAttribute(formation.colors, 3))
    geometry.setAttribute('aRand', new THREE.BufferAttribute(formation.rand, 3))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(formation.sizes, 1))

    const obj = new THREE.Points(geometry, material)
    obj.frustumCulled = false
    return obj
  }, [formation])

  useEffect(() => {
    return () => {
      const mat = points.material as THREE.ShaderMaterial
      mat.dispose()
      const geo = points.geometry as THREE.BufferGeometry
      geo.dispose()
    }
  }, [points])

  return <primitive object={points} />
}