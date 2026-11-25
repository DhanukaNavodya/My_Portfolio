import { Reveal } from '../components/common/Reveal'
import { SectionHeading } from '../components/common/SectionHeading'
import { CertificationCard, EducationCard } from '../components/education/EducationCards'
import { certifications, education } from '../data/education'

export function EducationSection() {
  return (
    <section id="education" aria-label="Education and certifications" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow="Education & certifications"
          lines={['Foundations &', <span key="accent" className="text-lime">continuous learning.</span>]}
        />
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-6">
            {education.map((e) => (
              <Reveal key={e.id} className="h-full [perspective:1200px]">
                <EducationCard item={e} />
              </Reveal>
            ))}
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-6">
            {certifications.map((c, i) => (
              <CertificationCard key={c.id} item={c} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
