import { HeroContent } from '../components/hero/HeroContent'
import { HeroPortrait } from '../components/hero/HeroPortrait'
import { ScrollIndicator } from '../components/hero/ScrollIndicator'

export function HeroSection({ start }: { start: boolean }) {
  return (
    <section id="home" aria-label="Introduction" className="relative isolate flex min-h-svh flex-col">
      <div className="container-x flex flex-1 items-center pb-12 pt-28 md:pt-32">
        {start && (
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <HeroContent />
            <HeroPortrait />
          </div>
        )}
      </div>

      <div className="container-x relative z-10 pb-6 md:pb-8">
        <ScrollIndicator show={start} />
      </div>
    </section>
  )
}
