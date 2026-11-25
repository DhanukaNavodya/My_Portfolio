import { MotionConfig } from 'motion/react'
import { useCallback, useState } from 'react'
import { CustomCursor } from './components/common/CustomCursor'
import { Footer } from './components/common/Footer'
import { Preloader } from './components/common/Preloader'
import { RiverBackground } from './components/common/RiverBackground'
import { Navbar } from './components/navigation/Navbar'
import { AboutSection } from './sections/AboutSection'
import { ContactSection } from './sections/ContactSection'
import { EducationSection } from './sections/EducationSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { HeroSection } from './sections/HeroSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { SkillsSection } from './sections/SkillsSection'
import { skipIntro } from './utils'

export default function App() {
  const [introDone, setIntroDone] = useState(skipIntro)
  const onIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-on-lime"
      >
        Skip to content
      </a>
      {!skipIntro() && <Preloader onDone={onIntroDone} />}
      <RiverBackground />
      <CustomCursor />
      <div className="grain" aria-hidden />
      <Navbar visible={introDone} />
      <main>
        <HeroSection start={introDone} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </MotionConfig>
  )
}
