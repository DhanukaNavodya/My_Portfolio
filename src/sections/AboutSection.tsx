import { lazy, Suspense } from 'react'
import { Stats } from '../components/about/Stats'
import { Chip } from '../components/common/Chip'
import { LazyMount } from '../components/common/LazyMount'
import { Marquee } from '../components/common/Marquee'
import { Reveal } from '../components/common/Reveal'
import { ScrollText } from '../components/common/ScrollText'
import { SectionHeading } from '../components/common/SectionHeading'
import { personal } from '../data/personal'
import { SceneErrorBoundary } from '../components/three/SceneErrorBoundary'
import { useDeviceCapabilities } from '../hooks/useDeviceCapabilities'

const AboutCanvas = lazy(() => import('../components/three/AboutCanvas'))

const marqueeItems = ['Software Engineering', 'Full-Stack Development', 'Cloud & DevOps', 'Microservices', 'Creative Engineering', 'Clean Architecture']

export function AboutSection() {
  const { tier, reducedMotion } = useDeviceCapabilities()
  const { about } = personal

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-36">
      <Marquee items={marqueeItems} className="mb-24 border-y border-line py-5 font-display text-lg font-medium text-subtle md:mb-36 md:text-2xl" />

      <div className="container-x">
        <SectionHeading index="01" eyebrow="About me" lines={['Engineering with', <span key="accent" className="text-lime">intent & craft.</span>]} />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Narrative column */}
          <div className="lg:col-span-7">
            <h3 id="about-title" className="sr-only">
              About {personal.firstName}
            </h3>
            <ScrollText text={about.headline} className="display text-[clamp(1.6rem,3.4vw,2.9rem)] font-medium !leading-[1.15] text-fg" />

            <div className="mt-12 grid gap-8 text-muted md:grid-cols-2">
              <Reveal>
                <p className="eyebrow mb-3 !text-lime">Who I am</p>
                <p className="leading-relaxed">{about.intro}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow mb-3 !text-lime">Background</p>
                <p className="leading-relaxed">{about.background}</p>
              </Reveal>
            </div>

            <Reveal className="mt-12">
              <p className="eyebrow mb-4">Technical interests</p>
              <ul className="flex flex-wrap gap-2">
                {about.interests.map((interest) => (
                  <li key={interest}>
                    <Chip className="!px-4 !py-2 !text-[0.72rem] !text-fg/80">{interest}</Chip>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* 3D + stats column */}
          <div className="flex flex-col gap-10 lg:col-span-5">
            <Reveal className="relative">
              <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.12),transparent)]" />
              <LazyMount className="aspect-square w-full">
                {tier === 'none' ? (
                  <div className="absolute inset-[18%] rotate-45 rounded-3xl border border-lime/30" />
                ) : (
                  <SceneErrorBoundary fallback={<div className="absolute inset-[18%] rotate-45 rounded-3xl border border-lime/30" />}>
                    <Suspense fallback={null}>
                      <AboutCanvas animate={!reducedMotion} lowPower={tier === 'low'} />
                    </Suspense>
                  </SceneErrorBoundary>
                )}
              </LazyMount>
              <span className="eyebrow absolute bottom-4 left-0 !text-[0.62rem]">[ move your cursor ]</span>
            </Reveal>
            <Stats />
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-24 md:mt-32">
          <Reveal className="mb-10 flex items-end justify-between gap-6">
            <h3 className="display text-2xl font-semibold text-fg md:text-3xl">Development philosophy</h3>
            <span className="eyebrow hidden md:block">How I work</span>
          </Reveal>
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
            {about.philosophy.map((p, i) => (
              <li key={p.title} className="group bg-ink p-8 transition-colors duration-500 hover:bg-ink-2 md:p-10">
                <Reveal delay={i * 0.08}>
                  <span className="font-mono text-xs text-lime">0{i + 1}</span>
                  <h4 className="mt-8 font-display text-lg font-semibold text-fg transition-colors group-hover:text-lime">{p.title}</h4>
                  <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="mt-16 grid gap-6 md:grid-cols-[auto_1fr] md:gap-16">
            <p className="eyebrow pt-2 !text-lime">Where I'm heading</p>
            <p className="max-w-3xl text-lg leading-relaxed text-fg/85 md:text-xl">{about.goals}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
