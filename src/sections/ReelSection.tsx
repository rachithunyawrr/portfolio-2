export function ReelSection({ id }: { id: string }) {
  return (
    <section id={id} className="relative flex min-h-screen w-full items-end justify-center">
      <h2 className="sr-only">My Work</h2>
      <p data-reveal className="muted mb-24 text-[10px] uppercase tracking-[0.5em] text-[#5a6b8c] sm:mb-28">
        Scroll to assemble the work archive
      </p>
    </section>
  )
}
