const INTRO =
  'I\u2019m Rachit Sharma — a Digital Marketing Specialist & AI builder. I build with AI — and I build AI.'

export function Hero() {
  return (
    <section id="ch-hero" className="relative flex min-h-screen w-full flex-col items-center overflow-hidden">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-[56vh] text-center sm:pt-[58vh]">
        <p
          data-reveal
          className="mb-5 animate-bob text-xs uppercase tracking-[0.4em] text-[#7cc0ff]"
        >
          Portfolio 2026
        </p>
        <h1 data-reveal className="hero-title text-5xl sm:text-7xl md:text-8xl">
          Hi, I&apos;m <span className="whitespace-nowrap">Rachit Sharma</span>
        </h1>
        <p
          data-reveal
          className="glow-text mt-6 font-[family-name:var(--font-display)] text-lg font-semibold text-[#ffb454] sm:text-2xl"
        >
          Digital Marketing Specialist <span className="text-[#8fa3c9]">|</span> AI&nbsp;Builder
        </p>
        <p data-reveal className="muted mt-5 max-w-xl text-base sm:text-lg">
          {INTRO}
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#5a6b8c]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 animate-[scroll-hint_1.8s_ease-in-out_infinite] rounded-full bg-[#7cc0ff]" />
        </span>
      </div>
    </section>
  )
}