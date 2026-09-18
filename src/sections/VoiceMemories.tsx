export function VoiceMemories() {
  return (
    <section id="ch-voice" className="relative w-full overflow-hidden px-6 pb-28 pt-[66vh] lg:pb-36">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="sr-only">VoiceMemories AI</h2>
        <p data-reveal data-reveal-delay="0.08" className="glow-gold font-[family-name:var(--font-display)] text-base font-semibold text-[#ffb454] sm:text-lg">
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
