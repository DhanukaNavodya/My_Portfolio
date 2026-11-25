import { LuArrowUpRight, LuGithub } from 'react-icons/lu'
import type { Project } from '../../types'
import { SampleBadge } from '../common/Chip'

/** Renders only the links that exist — never a dead button. */
export function ProjectLinks({ project }: { project: Project }) {
  const { github, demo } = project.links
  if (!github && !demo) return <SampleBadge show={project.isSample} />
  return (
    <div className="flex flex-wrap items-center gap-2">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-xs font-medium text-fg transition-colors hover:border-lime/60 hover:text-lime"
        >
          <LuGithub className="size-3.5" /> Source
        </a>
      )}
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-xs font-semibold text-on-lime transition-colors hover:brightness-110"
        >
          Live demo <LuArrowUpRight className="size-3.5" />
        </a>
      )}
      <SampleBadge show={project.isSample} />
    </div>
  )
}
