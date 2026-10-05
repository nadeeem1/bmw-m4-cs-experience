import CarImage from '../components/CarImage'
import Reveal from '../components/Reveal'
import VoidLayout from '../components/VoidLayout'
import { content } from '../config/content'

/*
  Void mode, object column dominant. The 650 Nm figure is part of the heading
  rather than a separate stat block, so no counter runs here — the value is
  stated, not animated. The dashed rule above the footnote matches the
  rule idiom established by the Gallery index.
*/
export default function Torque() {
  const { torque } = content

  return (
    <section
      className="void-section"
      id={torque.id}
      aria-labelledby={`${torque.id}-heading`}
    >
      <VoidLayout
        lead={
          <>
            <Reveal as="p" className="void__eyebrow" variant="fade">
              {torque.eyebrow}
            </Reveal>
            <Reveal
              as="h2"
              id={`${torque.id}-heading`}
              className="void__heading"
              variant="up"
              delay={0.08}
            >
              {torque.heading}
            </Reveal>
          </>
        }
        object={
          <Reveal variant="up" delay={0.16}>
            <div className="void__media">
              <CarImage src={torque.image} alt={torque.alt} kenBurns={false} />
            </div>
          </Reveal>
        }
        support={
          <>
            <Reveal as="p" className="void__body" variant="up" delay={0.16}>
              {torque.body}
            </Reveal>
            <Reveal
              as="p"
              className="void__note"
              variant="fade"
              delay={0.32}
            >
              {torque.footnote}
            </Reveal>
          </>
        }
      />
    </section>
  )
}