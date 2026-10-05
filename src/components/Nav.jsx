import { content } from '../config/content'
import MStripes from './MStripes'
import useNavScrolled from '../hooks/useNavScrolled'

export default function Nav() {
  const scrolled = useNavScrolled()

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`.trim()}>
      <nav className="nav__inner" aria-label="Primary">
        <a className="nav__brand" href="#top">
          <MStripes orientation="vertical" />
          <span className="nav__wordmark">{content.nav.wordmark}</span>
        </a>

        <ul className="nav__links">
          {content.nav.links.map((link) => (
            <li key={link.href}>
              <a className="nav__link" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a className="nav__cta" href={content.nav.cta.href}>
          {content.nav.cta.label}
        </a>
      </nav>
    </header>
  )
}