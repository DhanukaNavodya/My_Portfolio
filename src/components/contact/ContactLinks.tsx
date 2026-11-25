import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { LuArrowUpRight, LuCheck, LuCopy } from 'react-icons/lu'
import { personal } from '../../data/personal'

export function ContactLinks() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${personal.email}`
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="eyebrow mb-4">Email</p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${personal.email}`}
            className="font-display text-[clamp(1.1rem,2.2vw,1.6rem)] font-medium text-fg underline decoration-line-strong decoration-1 underline-offset-8 transition-colors hover:text-lime hover:decoration-lime"
          >
            {personal.email}
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy email address"
            className="grid size-10 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-lime/50 hover:text-lime"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copied ? 'ok' : 'copy'} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                {copied ? <LuCheck className="size-4 text-lime" /> : <LuCopy className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <span aria-live="polite" className="sr-only">
            {copied ? 'Email copied' : ''}
          </span>
        </div>
      </div>

      <div>
        <p className="eyebrow mb-4">Elsewhere</p>
        <ul className="divide-y divide-line border-y border-line">
          {personal.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 py-4 transition-colors"
              >
                <span className="flex items-center gap-4">
                  <span className="grid size-10 place-items-center rounded-full border border-line text-fg/80 transition-colors group-hover:border-lime/50 group-hover:bg-lime group-hover:text-on-lime">
                    <s.icon className="size-4" />
                  </span>
                  <span>
                    <span className="block font-medium text-fg">{s.label}</span>
                    {s.handle && <span className="block text-xs text-subtle">{s.handle}</span>}
                  </span>
                </span>
                <LuArrowUpRight className="size-5 text-subtle transition-all duration-500 group-hover:rotate-45 group-hover:text-lime" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {personal.availability && (
        <p className="flex items-center gap-3 text-sm text-muted">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-lime" />
          </span>
          {personal.availability}
        </p>
      )}
    </div>
  )
}
