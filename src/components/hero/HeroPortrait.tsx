import { motion } from 'motion/react'
import { LuCode } from 'react-icons/lu'
import { ease } from '../../animations/variants'
import { personal } from '../../data/personal'
import { TiltCard } from '../common/TiltCard'

/** Framed portrait card — the hero's visual anchor. */
export function HeroPortrait() {
  const { photo } = personal
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease, delay: 0.3 }}
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:mx-0 lg:ml-auto lg:max-w-[30rem]"
    >
      {/* Soft halo behind the card */}
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.16),transparent)] blur-2xl" />

      <TiltCard max={6} className="rounded-[2.25rem] border border-line-strong bg-ink-3/80 p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur">
        <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-ink-2">
          <img
            src={photo.src}
            srcSet={photo.srcSmall ? `${photo.srcSmall} 480w, ${photo.src} 960w` : undefined}
            sizes="(min-width: 1024px) 30rem, (min-width: 640px) 26rem, 22rem"
            alt={photo.alt}
            width={960}
            height={960}
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover transition-transform duration-1000 ease-[var(--ease-expo)] group-hover:scale-[1.03]"
          />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
          <span
            aria-hidden
            className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-xl border border-fg/15 bg-ink/70 text-lime backdrop-blur-md"
          >
            <LuCode className="size-5" />
          </span>
        </div>
      </TiltCard>

      {personal.availability && (
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease, delay: 1 }}
          className="glass absolute -left-4 bottom-10 flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-fg sm:-left-8"
        >
          <span className="size-2 rounded-full bg-lime" />
          {personal.availability}
        </motion.div>
      )}
    </motion.div>
  )
}
