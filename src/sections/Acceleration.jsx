import CarImage from '../components/CarImage'
import Counter from '../components/Counter'
import Reveal from '../components/Reveal'
import VoidLayout from '../components/VoidLayout'
import { content } from '../config/content'
import { images } from '../data/cars'

/*
  Void mode, mirrored so the two specifications do not read as one block:
  Torque leads with its heading and puts the car in the object column, this
  one puts the number in the object column and demotes the car to a
  supporting plate.

  There are no comparison bars. The single figure is the whole argument.
*/
export default function Acceleration() {
  const { acceleration } = content

  return (
    <section
      className="void-section"
      id={acceleration.id}
      aria-labelledby={`${acceleration.id}-heading`}
    >
      <VoidLayout
        reverse
        lead={
          <Reveal
            as="h2"
            id={`${acceleration.id}-heading`}
            className="void__eyebrow"
            variant="fade"
          >
            {acceleration.eyebrow}
          </Reveal>
        }
        object={
          <Reveal variant="up" delay={0.08}>
            <Counter
              from={acceleration.from}
              to={acceleration.to}
              decimals={1}
              unit={acceleration.unit}
              label={acceleration.label}
              ariaLabel={acceleration.ariaLabel}
            />
          </Reveal>
        }
        support={
          <>
            <Reveal as="p" className="void__body" variant="up" delay={0.16}>
              {acceleration.body}
            </Reveal>
            <Reveal variant="up" delay={0.24}>
              <div className="void__media void__media--plate">
                <CarImage
                  src={images.acceleration}
                  alt={acceleration.alt}
                  kenBurns={false}
                />
              </div>
            </Reveal>
          </>
        }
      />
    </section>
  )
}