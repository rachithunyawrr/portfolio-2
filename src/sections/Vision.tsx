const LINES = [
  {
    text: 'I believe AI should feel personal, not robotic.',
    delay: 0,
  },
  {
    text: 'My goal is to build tools that don\u2019t just automate — they connect.',
    delay: 0.08,
  },
  {
    text: 'Every project here is a step toward that.',
    delay: 0.16,
  },
  {
    text: 'I\u2019m just getting started.',
    delay: 0.24,
  },
]

export function Vision() {
  return (
    <section id="ch-vision" className="relative w-full px-6 pb-36 pt-[55vh] lg:pb-44">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="sr-only">My Vision</h2>
        {LINES.map((l) => (
          <p
            key={l.delay}
            data-reveal
            data-reveal-delay={`${l.delay}`}
            className="mb-6 font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug text-[#e6edfb] sm:text-4xl"
          >
            {l.text}
          </p>
        ))}
      </div>
    </section>
  )
}
