import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

export function scrollToTarget(target: string | number, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export function scrollToTop() {
  scrollToTarget(0)
}