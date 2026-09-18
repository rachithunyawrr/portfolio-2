interface Project {
  title: string
  desc: string
  href?: string
  soon?: boolean
}

const PROJECTS: Project[] = [
  {
    title: 'Fitness Website',
    desc: 'A clean, modern fitness landing site with workout & nutrition sections.',
    href: 'https://github.com/digitalguru99908-dev/Fitness-website',
  },
  {
    title: 'Neon Car Racing Game',
    desc: 'A fast-paced neon racer built for the browser with glowing tracks.',
    href: 'https://github.com/digitalguru99908-dev/neon-car-racing-game-',
  },
  {
    title: 'Second Game',
    desc: 'Coming soon.',
    soon: true,
  },
  {
    title: 'Video Editing Project',
    desc: 'Coming soon.',
    soon: true,
  },
  {
    title: 'Second Video Editing Project',
    desc: 'Coming soon.',
    soon: true,
  },
]

export function Projects() {
  return (
    <section id="ch-projects" className="relative w-full px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p data-reveal className="glow-text font-[family-name:var(--font-display)] text-4xl font-bold text-white sm:text-5xl">
            Selected Projects
          </p>
          <p data-reveal data-reveal-delay="0.1" className="muted mt-4 text-sm sm:text-base">
            Real projects, built by hand with AI.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              data-reveal
              data-reveal-delay={`${(i % 3) * 0.08}`}
              className={`card flex flex-col justify-between p-6 ${p.soon ? 'opacity-70' : ''}`}
            >
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="muted mt-2 text-sm leading-relaxed">{p.desc}</p>
              </div>
              <div className="mt-6">
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#7cc0ff] transition-colors hover:text-white"
                  >
                    View on GitHub →
                  </a>
                ) : (
                  <span className="chip">Coming soon</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
