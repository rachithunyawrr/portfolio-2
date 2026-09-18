const TOOLS: { name: string; tag: string }[] = [
  { name: 'OpenCode', tag: 'AI coding agent' },
  { name: 'OpenAI GPT', tag: 'LLMs & APIs' },
  { name: 'ElevenLabs', tag: 'Voice synthesis' },
  { name: 'Cartesia AI', tag: 'Real-time voices' },
  { name: 'Claude', tag: 'AI assistant' },
]

export function Skills() {
  return (
    <section id="ch-skills" className="relative w-full px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-5xl text-center">
        <p data-reveal className="glow-text font-[family-name:var(--font-display)] text-4xl font-bold text-white sm:text-5xl">
          What I Work With
        </p>
        <p data-reveal data-reveal-delay="0.1" className="muted mt-4 text-sm sm:text-base">
          A few of my daily tools across 25+ AI tools
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {TOOLS.map((t, i) => (
            <div
              key={t.name}
              data-reveal
              data-reveal-delay={`${i * 0.06}`}
              className="card flex flex-col items-center justify-center gap-1 px-4 py-7"
            >
              <span className="font-[family-name:var(--font-display)] text-base font-semibold text-white">
                {t.name}
              </span>
              <span className="text-xs text-[#8fa3c9]">{t.tag}</span>
            </div>
          ))}
        </div>

        <p data-reveal data-reveal-delay="0.2" className="muted mt-8 text-xs uppercase tracking-[0.3em]">
          and 25+ AI tools in total
        </p>
        <p data-reveal data-reveal-delay="0.26" className="glow-gold mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-[#ffb454]">
          I don&apos;t just use AI tools — I build with them.
        </p>
      </div>
    </section>
  )
}