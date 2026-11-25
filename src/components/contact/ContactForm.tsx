import { AnimatePresence, motion } from 'motion/react'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { LuCircleAlert, LuCheck, LuLoader, LuSend } from 'react-icons/lu'
import { personal } from '../../data/personal'
import { cn } from '../../utils'
import { isEmailConfigured, sendContactEmail } from '../../utils/email'

type Fields = { name: string; email: string; subject: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'handoff' }
  | { kind: 'error'; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (f.subject.trim().length < 3) e.subject = 'Add a short subject (3+ characters).'
  if (f.message.trim().length < 20) e.message = 'Tell me a little more (20+ characters).'
  return e
}

function mailtoHref(f: Fields) {
  const body = `${f.message.trim()}\n\n— ${f.name.trim()} (${f.email.trim()})`
  return `mailto:${personal.email}?subject=${encodeURIComponent(f.subject.trim())}&body=${encodeURIComponent(body)}`
}

const empty: Fields = { name: '', email: '', subject: '', message: '' }

function Field({
  id,
  label,
  error,
  textarea,
  ...props
}: {
  id: keyof Fields
  label: string
  error?: string
  textarea?: boolean
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  autoComplete?: string
}) {
  const shared = {
    id,
    name: id,
    placeholder: ' ',
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    className: cn(
      'peer w-full resize-none rounded-2xl border bg-ink/60 px-5 pb-3 pt-7 text-[0.95rem] text-fg outline-none transition-colors duration-300 placeholder:text-transparent focus:bg-ink',
      error ? 'border-red-400/60 focus:border-red-400' : 'border-line-strong focus:border-lime/70',
    ),
    ...props,
  }
  return (
    <div className="relative">
      {textarea ? <textarea rows={5} {...shared} /> : <input {...shared} />}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-2.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-subtle transition-all duration-300 peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:text-[0.8rem] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2.5 peer-focus:text-[0.62rem] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-lime"
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 pl-1 text-xs text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Contact form with validation and honest delivery:
 *  - EmailJS configured → sends through EmailJS and reports real success/failure.
 *  - not configured → validates, then opens the visitor's email app with everything pre-filled.
 * A hidden honeypot field silently drops most form-filling bots.
 */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [honeypot, setHoneypot] = useState('')

  const update = (key: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }

    if (honeypot) {
      // Bot filled the hidden field: pretend success, send nothing.
      if (import.meta.env.DEV) console.warn('[contact] honeypot field was filled — message NOT sent:', JSON.stringify(honeypot))
      setStatus({ kind: 'sent' })
      setFields(empty)
      return
    }

    if (!isEmailConfigured) {
      window.location.href = mailtoHref(fields)
      setStatus({ kind: 'handoff' })
      return
    }

    setStatus({ kind: 'sending' })
    try {
      await sendContactEmail({
        name: fields.name.trim(),
        email: fields.email.trim(),
        subject: fields.subject.trim(),
        message: fields.message.trim(),
      })
      if (import.meta.env.DEV) console.info('[contact] EmailJS accepted the message')
      setStatus({ kind: 'sent' })
      setFields(empty)
    } catch (err) {
      if (import.meta.env.DEV) console.error('[contact] EmailJS send failed:', err)
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' })
    }
  }

  const sending = status.kind === 'sending'

  return (
    <form onSubmit={onSubmit} noValidate className="glass relative rounded-[28px] p-5 md:p-8" aria-label="Contact form">
      {/* Honeypot: invisible to people and screen readers, tempting to bots.
          Its name/label deliberately match no autofill category (e.g. "company"), otherwise the
          browser autofills it for real visitors and their message is silently discarded. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="hp-trap">Leave this field empty</label>
        <input
          id="hp-trap"
          name="hp_trap_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore="true"
          data-form-type="other"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Your name" autoComplete="name" value={fields.name} onChange={update('name')} error={errors.name} />
        <Field id="email" label="Email address" type="email" autoComplete="email" value={fields.email} onChange={update('email')} error={errors.email} />
      </div>
      <div className="mt-4 grid gap-4">
        <Field id="subject" label="Subject" value={fields.subject} onChange={update('subject')} error={errors.subject} />
        <Field id="message" label="Message" textarea value={fields.message} onChange={update('message')} error={errors.message} />
      </div>

      <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="max-w-xs text-xs leading-relaxed text-subtle">
          {isEmailConfigured ? 'Your message is delivered straight to my inbox.' : 'Submitting opens your email app with the message ready to send.'}
        </p>
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex h-13 items-center gap-3 rounded-full bg-lime pl-6 pr-5 text-sm font-semibold text-on-lime transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? 'Sending…' : isEmailConfigured ? 'Send message' : 'Send via email app'}
          {sending ? <LuLoader className="size-4 animate-spin" /> : <LuSend className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
        </button>
      </div>

      <div aria-live="polite" className="empty:hidden">
        <AnimatePresence mode="wait">
          {status.kind === 'sent' && (
            <motion.p key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 flex items-center gap-2 rounded-xl border border-lime/30 bg-lime/10 px-4 py-3 text-sm text-lime">
              <LuCheck className="size-4 shrink-0" /> Thanks — your message was sent. I'll get back to you soon.
            </motion.p>
          )}
          {status.kind === 'handoff' && (
            <motion.p key="handoff" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 flex items-start gap-2 rounded-xl border border-line-strong bg-fg/[0.03] px-4 py-3 text-sm text-fg/80">
              <LuCheck className="mt-0.5 size-4 shrink-0 text-lime" />
              <span>
                Your email app should now be open with the message ready. If nothing happened,{' '}
                <a href={mailtoHref(fields)} className="text-lime underline underline-offset-4">
                  try again
                </a>{' '}
                or write to {personal.email}.
              </span>
            </motion.p>
          )}
          {status.kind === 'error' && (
            <motion.p key="error" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              <LuCircleAlert className="mt-0.5 size-4 shrink-0" />
              <span>
                The message couldn't be sent: {status.message} Please try again, or email{' '}
                <a href={`mailto:${personal.email}`} className="underline underline-offset-4">
                  {personal.email}
                </a>
                .
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
