export function FallbackBackground() {
  return (
    <div
      className="fixed inset-0"
      aria-hidden
      style={{
        background:
          'radial-gradient(100% 75% at 12% 6%, rgba(74,158,255,0.12), transparent 58%), radial-gradient(95% 80% at 88% 24%, rgba(245,166,35,0.08), transparent 60%), radial-gradient(100% 75% at 48% 100%, rgba(35,69,142,0.18), transparent 66%), #05070d',
      }}
    />
  )
}
