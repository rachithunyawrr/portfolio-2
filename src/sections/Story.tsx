import { PhotoFrame } from '../components/PhotoFrame'

export function Story() {
  return (
    <section id="ch-story" className="relative w-full px-6 py-28 lg:py-36">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-reveal className="mx-auto w-full max-w-sm lg:max-w-none">
          <PhotoFrame />
        </div>

        <div>
          <p data-reveal className="glow-text font-[family-name:var(--font-display)] text-4xl font-bold text-white sm:text-5xl">
            My Story
          </p>

          <div className="mt-7 space-y-5 text-base leading-relaxed text-[#c9d4ec] sm:text-lg">
            <p data-reveal>
              In 2025 I discovered AI, and it completely changed how I think about building things.
              It wasn&apos;t just another trend for me — it was the first time technology felt
              personal, like something I could shape.
            </p>
            <p data-reveal>
              After 12th grade, my family wanted me to take a more conventional path. Choosing my
              own direction meant going against that — the harder choice. I don&apos;t regret it.
              I followed my interest, completed the Digital Marketing with AI course on my own path,
              and kept going.
            </p>
            <p data-reveal>
              Today I build real projects and work hands-on with 25+ AI tools — from coding agents
              to voice and image models. Every project below is something I actually built, not a
              tutorial copy. And I&apos;m only getting started.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}