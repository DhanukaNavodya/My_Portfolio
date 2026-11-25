import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState, type MouseEvent } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { ease } from '../../animations/variants'
import { navItems, personal } from '../../data/personal'
import { useActiveSection } from '../../hooks/useActiveSection'
import type { SectionId } from '../../types'
import { cn, scrollToSection } from '../../utils'
import { ThemeToggle } from '../common/ThemeToggle'

const ids = navItems.map((n) => n.id)

function Logo({ onClick }: { onClick: (e: MouseEvent) => void }) {
  return (
    <a href="#home" onClick={onClick} className="group flex items-center gap-3" aria-label="Back to top">
      <span className="grid size-9 place-items-center rounded-full bg-lime font-display text-[0.72rem] font-bold text-on-lime transition-transform duration-500 group-hover:rotate-[360deg]">
        {personal.firstName[0]}
        {personal.lastName[0]}
      </span>
      <span className="hidden font-display text-[0.78rem] font-medium tracking-tight text-fg sm:block">
        {personal.firstName}
        <span className="text-muted">.dev</span>
      </span>
    </a>
  )
}

export function Navbar({ visible }: { visible: boolean }) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: SectionId) => (e: MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    // Wait for the mobile overlay to release scroll before moving.
    window.setTimeout(() => scrollToSection(id), open ? 80 : 0)
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.3 }}
        className="fixed inset-x-0 top-0 z-50 pt-4 md:pt-5"
      >
        {/* Scrim keeps the logo/controls legible over content once scrolled */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-ink via-ink/70 to-transparent transition-opacity duration-500',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
        />
        <nav
          aria-label="Primary"
          className="container-x flex items-center justify-between lg:justify-center"
        >
          <div className="lg:hidden">
            <Logo onClick={go('home')} />
          </div>

          {/* Desktop pill */}
          <ul
            className={cn(
              'glass relative hidden items-center gap-1 rounded-full p-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.7)] transition-shadow duration-500 lg:flex',
              scrolled && 'shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)]',
            )}
          >
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative z-10 block rounded-full px-4 py-2 text-[0.8rem] font-medium transition-colors duration-300',
                      isActive ? 'text-on-lime' : 'text-muted hover:text-fg',
                    )}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-lime"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              )
            })}
            <li className="ml-1 border-l border-line pl-2">
              <ThemeToggle />
            </li>
          </ul>

          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="#contact"
              onClick={go('contact')}
              className="glass hidden items-center gap-2 rounded-full px-4 py-2.5 text-[0.8rem] font-medium text-fg transition-colors hover:text-lime md:flex"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-lime" />
              </span>
              Let's talk
            </a>
            <ThemeToggle className="glass !size-11" />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="glass grid size-11 place-items-center rounded-full text-fg lg:hidden"
            >
              {open ? <LuX className="size-5" /> : <LuMenu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.6rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 2.6rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.6rem)' }}
            transition={{ duration: 0.7, ease }}
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.05 }}
                    className={cn(
                      'flex items-baseline gap-4 py-2 font-display text-[clamp(2rem,9vw,3.2rem)] font-semibold tracking-tight',
                      active === item.id ? 'text-lime' : 'text-fg',
                    )}
                  >
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {personal.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-muted"
                >
                  <s.icon className="size-4" /> {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
