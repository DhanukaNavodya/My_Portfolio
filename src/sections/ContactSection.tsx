import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from '../components/common/Reveal'
import { SectionHeading } from '../components/common/SectionHeading'
import { SplitHeading } from '../components/common/SplitHeading'
import { ContactForm } from '../components/contact/ContactForm'
import { ContactLinks } from '../components/contact/ContactLinks'

export function ContactSection() {
  const ctaRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ctaRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-10%'])

  return (
    <section id="contact" aria-label="Contact" className="relative overflow-hidden pb-16 pt-24 md:pt-36">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[40rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgb(var(--glow)/0.09),transparent_60%)]" />

      <div className="container-x">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          lines={['Have a project', <span key="accent" className="text-lime">in mind?</span>]}
          description="Whether it's a role, a collaboration or a product idea — I'd love to hear about it."
          align="split"
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <ContactLinks />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>

      {/* Final CTA */}
      <div ref={ctaRef} className="mt-32 border-t border-line pt-20 md:mt-44 md:pt-28">
        <motion.div style={{ x }} className="whitespace-nowrap">
          <SplitHeading
            as="p"
            lines={[
              <>
                Let's build something <span className="text-lime">great</span> together.
              </>,
            ]}
            className="text-[clamp(2.6rem,9vw,9.5rem)] font-bold uppercase text-fg"
          />
        </motion.div>
      </div>
    </section>
  )
}
