export function ReelSection({ id, label }: { id: string; label: string }) {
  return (
    <section id={id} className="relative flex min-h-screen w-full items-end justify-center">
      <p
        data-reveal
        className="muted mb-24 text-[10px] uppercase tracking-[0.5em] text-[#5a6b8c] sm:mb-28"
      >
        {label}
      </p>
    </section>
  )
}