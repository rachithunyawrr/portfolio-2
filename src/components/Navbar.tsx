import { useEffect, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { scrollToTarget, scrollToTop } from '../lib/smoothScroll'

const LINKS = [
  { label: 'Work', href: '#ch-work' },
  { label: 'About', href: '#ch-about' },
  { label: 'Contact', href: '#ch-contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      setOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href: string) => (e: ReactMouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(href, -4)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/5 bg-[#05070d]/70 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            scrollToTop()
          }}
          className="glow-text font-[family-name:var(--font-display)] text-xl font-bold text-white"
        >
          RS<span className="text-[#7cc0ff]">.</span>
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={go(l.href)}
                  className="text-sm font-medium text-[#aec6ee] transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span className={`block h-0.5 w-5 rounded bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
              <span
                className={`block h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </div>
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 sm:hidden ${
          open ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 border-t border-white/5 bg-[#05070d]/90 px-5 py-3 backdrop-blur-md">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={go(l.href)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#aec6ee] transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
