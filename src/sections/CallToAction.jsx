import Reveal from '../components/Reveal'
import { content } from '../config/content'

/*
  Closing statement. It exists so the nav's "Book a test drive" pill has a
  real destination — it pointed at #configure, which nothing rendered.

  The three controls are declared in content.js as non-interactive, and the
  caption says so on the page. They are therefore disabled buttons rather
  than anchors: correct semantics for something that looks actionable but
  deliberately is not, and correctly skipped by assistive technology.
*/
export default function CallToAction() {
  const { cta } = content

  return (
    <section
      className="cta-section"
      id={cta.id}
      aria-labelledby={`${cta.id}-heading`}
    >
      <div className="cta__inner">
        <Reveal as="p" className="void__eyebrow" variant="fade">
          {cta.eyebrow}
        </Reveal>

        <Reveal
          as="h2"
          id={`${cta.id}-heading`}
          className="cta__heading"
          variant="up"
          delay={0.08}
        >
          {cta.heading}
        </Reveal>

        <Reveal as="p" className="cta__caption" variant="up" delay={0.16}>
          {cta.caption}
        </Reveal>

        <Reveal className="cta__actions" variant="up" delay={0.24}>
          {cta.buttons.map((button) => (
            <button
              key={button.id}
              type="button"
              className={`btn btn--${button.variant}`}
              disabled
            >
              {button.label}
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
