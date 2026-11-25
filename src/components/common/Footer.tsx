import { LuArrowUp } from 'react-icons/lu'
import { fullName, navItems, personal } from '../../data/personal'
import { scrollToSection } from '../../utils'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-sm font-semibold text-fg">{fullName}</p>
          <p className="mt-1 text-xs text-subtle">
            {personal.role} · © {YEAR}
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(n.id)
                  }}
                  className="text-xs text-muted transition-colors hover:text-lime"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="group flex items-center gap-3 self-start text-xs text-muted transition-colors hover:text-fg md:self-auto"
        >
          Back to top
          <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-lime group-hover:bg-lime group-hover:text-on-lime">
            <LuArrowUp className="size-4" />
          </span>
        </button>
      </div>
    </footer>
  )
}
