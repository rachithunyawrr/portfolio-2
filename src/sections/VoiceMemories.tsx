export function VoiceMemories() {
  return (
    <section id="ch-voice" className="relative w-full overflow-hidden px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <p data-reveal className="entry mb-3 text-xs uppercase tracking-[0.4em] text-[#7cc0ff]">
          Featured Project
        </p>
        <p data-reveal className="glow-text font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-white sm:text-6xl">
          VoiceMemories AI
        </p>
        <p data-reveal data-reveal-delay="0.08" className="glow-gold mt-3 font-[family-name:var(--font-display)] text-base font-semibold text-[#ffb454] sm:text-lg">
          My Own AI Product
        </p>

        <div data-reveal data-reveal-delay="0.14" className="card mx-auto mt-10 max-w-2xl px-7 py-8 text-left">
          <p className="text-base leading-relaxed text-[#c9d4ec]">
            VoiceMemories AI is a personal project I&apos;m building — an AI companion that can
            clone a loved one&apos;s voice from a voice sample and have real, live conversations in
            that voice. The idea is to help people feel close to someone they&apos;ve lost.
          </p>
          <p className="muted mt-4 text-sm leading-relaxed">
            It&apos;s still in progress, currently paused due to funding, but the core idea already
            works.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="text-xs text-[#5a6b8c]">Status:</span>
            <span className="chip text-xs">In progress</span>
            <span className="chip text-xs">Paused for funding</span>
            <span className="chip text-xs">Core idea works</span>
          </div>
        </div>
      </div>
    </section>
  )
}