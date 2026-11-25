import { personal } from '../../data/personal'
import { resolveStat } from '../../utils'
import { CountUp } from '../common/CountUp'
import { Reveal } from '../common/Reveal'

export function Stats() {
  return (
    <dl className="grid grid-cols-3 divide-x divide-line border-y border-line">
      {personal.stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.1} className="flex flex-col gap-2 px-3 py-6 first:pl-0 sm:px-6">
          <dd className="display order-1 text-[clamp(2rem,5vw,3.6rem)] font-semibold text-fg">
            <CountUp to={resolveStat(stat.value)} suffix={stat.suffix} />
          </dd>
          <dt className="order-2 font-mono text-[0.66rem] uppercase leading-snug tracking-[0.16em] text-muted">{stat.label}</dt>
        </Reveal>
      ))}
    </dl>
  )
}
