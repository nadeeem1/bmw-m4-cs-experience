import MStripes from './MStripes'
import { content } from '../config/content'

/*
  Page terminus. Carries the design-study disclaimer, which matters on a
  site built around manufacturer photography, and doubles as the way back
  to the top.
*/
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a className="site-footer__brand" href="#top">
          <MStripes orientation="vertical" />
          <span className="site-footer__wordmark">{content.nav.wordmark}</span>
        </a>

        <p className="site-footer__colophon">{content.footer.colophon}</p>
      </div>
    </footer>
  )
}
