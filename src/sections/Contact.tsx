import { useState, type FormEvent } from 'react'

const EMAIL = 'rachitsharma999088@gmail.com'
const PHONE = '8307151186'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Enquiry from ${name || 'your website'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section id="ch-contact" className="relative w-full px-6 pb-16 pt-[38vh]">
      <div className="mx-auto max-w-2xl">
        <div data-reveal className="text-center">
          <p className="muted text-xs uppercase tracking-[0.35em]">Say hello</p>
        </div>

        <form data-reveal data-reveal-delay="0.08" onSubmit={onSubmit} className="card mx-auto mt-8 space-y-5 p-7 sm:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-widest text-[#8fa3c9]">Name</span>
              <input
                className="field"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-widest text-[#8fa3c9]">Email</span>
              <input
                className="field"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-widest text-[#8fa3c9]">Message</span>
            <textarea
              className="field min-h-36 resize-y"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project…"
            />
          </label>
          <button type="submit" className="btn-primary w-full">
            Send Enquiry
          </button>
        </form>

        <div data-reveal data-reveal-delay="0.16" className="mt-10 flex flex-col items-center gap-3">
          <a href={`mailto:${EMAIL}`} className="muted text-sm transition-colors hover:text-white">
            {EMAIL}
          </a>
          <a href={`tel:${PHONE}`} className="muted text-sm transition-colors hover:text-white">
            {PHONE}
          </a>
          <div className="mt-2 flex items-center gap-4">
            <a
              href="https://github.com/digitalguru99908-dev"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#aec6ee] transition-colors hover:border-[#7cc0ff]/50 hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/rachitsharma"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#aec6ee] transition-colors hover:border-[#7cc0ff]/50 hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}