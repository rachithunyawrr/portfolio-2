import * as THREE from 'three'

export const sceneState = {
  camZ: 0,
  mouseX: 0,
  mouseY: 0,
  scatter: 0,
}

export const sharedUniforms = {
  uTime: { value: 0 },
  uPixelRatio: { value: 1 },
  uScatter: { value: 0 },
}

export const clock = new THREE.Clock()

export const CHAPTER_CAM_Z = {
  hero: 0,
  portfolio: -14,
  work: -28,
  about: -42,
  story: -56,
  skills: -70,
  projects: -84,
  voice: -98,
  vision: -112,
  contact: -126,
} as const

export const FORMATION_DISTANCE = 7
export const SCATTER_RANGE = { from: -14, to: -28 }