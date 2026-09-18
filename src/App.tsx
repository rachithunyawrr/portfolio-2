import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { setLenis } from './lib/smoothScroll'
import { LoadingScreen } from './components/LoadingScreen'
import { Navbar } from './components/Navbar'
import { FallbackBackground } from './components/FallbackBackground'
import { SceneErrorBoundary } from './components/SceneErrorBoundary'
import { Hero } from './sections/Hero'
import { ReelSection } from './sections/ReelSection'
import { About } from './sections/About'
import { Story } from './sections/Story'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { VoiceMemories } from './sections/VoiceMemories'
import { Vision } from './sections/Vision'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

const Scene3D = lazy(() => import('./components/scene/WorldScene'))

gsap.registerPlugin(ScrollTrigger)

function RevealInit({ loaded }: { loaded: boolean }) {
  useEffect(() => {
    if (!loaded) return

    const els = gsap.utils.toArray<HTMLElement>('[data-reveal]')
    const triggers = els.map((el) => {
      const delay = parseFloat(el.dataset.revealDelay || '0')
      return gsap.fromTo(
        el,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        },
      )
    })

    return () => {
      triggers.forEach((trigger) => trigger.scrollTrigger?.kill())
    }
  }, [loaded])

  return null
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const onLoadComplete = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => setSceneReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    setLenis(lenis)
    return () => {
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <FallbackBackground />

      {sceneReady && (
        <div className="fixed inset-0 z-0">
          <SceneErrorBoundary>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </SceneErrorBoundary>
        </div>
      )}

      <main className="relative z-10 w-full">
        <Navbar />

        <Hero />
        <ReelSection id="ch-work" />
        <About />
        <Story />
        <Skills />
        <Projects />
        <VoiceMemories />
        <Vision />
        <Contact />
        <Footer />
      </main>

      <RevealInit loaded={loaded} />
      <LoadingScreen onComplete={onLoadComplete} />
    </>
  )
}
