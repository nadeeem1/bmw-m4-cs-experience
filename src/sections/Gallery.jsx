import CarImage from '../components/CarImage'
import Reveal from '../components/Reveal'
import { content } from '../config/content'

/*
  Three independent 100vh statements. Each keeps its own id because the
  reel timeline in Phase B addresses views individually.

  The media side alternates left/right/left so three consecutive full-bleed
  photographs do not read as one long strip.

  kenBurns is off here: three concurrent CSS scale animations would run even
  off-screen, and the drift is decorative. The modifier stays available in
  CarImage for wherever a still plate genuinely wants movement.
*/
export default function Gallery() {
  const total = content.gallery.views.length
  const totalPadded = String(total).padStart(2, '0')

  return (
    <div className="gallery" id={content.gallery.id}>
      {content.gallery.views.map((view, index) => {
        const side = index % 2 === 0 ? 'left' : 'right'

        return (
          <section
            key={view.id}
            id={view.id}
            className={`gallery__view gallery__view--${side}`}
            aria-labelledby={`${view.id}-label`}
          >
            <div className="gallery__text">
              <Reveal as="p" className="gallery__index" variant="fade">
                {String(index + 1).padStart(2, '0')} / {totalPadded}
              </Reveal>

              <Reveal
                as="h2"
                id={`${view.id}-label`}
                className="gallery__label"
                variant="up"
                delay={0.08}
              >
                {view.label}
              </Reveal>

              <Reveal
                as="p"
                className="gallery__body"
                variant="up"
                delay={0.16}
              >
                {view.body}
              </Reveal>
            </div>

            <div className="gallery__media">
              <CarImage src={view.image} alt={view.alt} kenBurns={false} />
            </div>
          </section>
        )
      })}
    </div>
  )
}