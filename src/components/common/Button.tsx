import { motion, useMotionValue, useSpring } from 'motion/react'
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react'
import { LuArrowUpRight } from 'react-icons/lu'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { cn } from '../../utils'

type Variant = 'primary' | 'ghost'

interface BaseProps {
  variant?: Variant
  icon?: ReactNode | false
  children: ReactNode
  className?: string
  /** Pulls toward the cursor on desktop. */
  magnetic?: boolean
}

type ButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps>)
    | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, keyof BaseProps>)
  )

const styles: Record<Variant, string> = {
  primary: 'bg-lime text-on-lime hover:brightness-110 shadow-[0_0_0_1px_rgb(var(--glow)/0.4),0_10px_40px_-12px_rgb(var(--glow)/0.55)]',
  ghost: 'border border-line-strong text-fg hover:border-lime/60 hover:text-lime bg-ink/40 backdrop-blur-md',
}

export function Button({ variant = 'primary', icon, children, className, magnetic = true, ...rest }: ButtonProps) {
  const fine = useFinePointer()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!magnetic || !fine) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon !== false && (
        <span className="relative z-10 grid size-7 place-items-center overflow-hidden rounded-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-45">
          {icon ?? <LuArrowUpRight className="size-4" />}
        </span>
      )}
    </>
  )

  const classes = cn(
    'group relative inline-flex h-13 items-center justify-center gap-2 rounded-full pl-6 pr-4 text-sm font-semibold tracking-wide transition-colors duration-300 select-none',
    styles[variant],
    className,
  )

  if (rest.href !== undefined) {
    const { href, ...anchorRest } = rest
    return (
      <motion.a
        href={href}
        className={classes}
        style={{ x, y }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="hover"
        {...(anchorRest as ComponentPropsWithoutRef<typeof motion.a>)}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      className={classes}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      {...(rest as ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {content}
    </motion.button>
  )
}
