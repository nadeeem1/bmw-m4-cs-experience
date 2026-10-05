import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import MStripes from '../components/MStripes'
import OrbitStack from '../components/OrbitStack'
import { content } from '../config/content'
import { duration, ease } from '../config/theme'

/*
  One editorial hero, two compositions of the same idea.

  Narrow screens: the media plate owns the whole viewport and the copy
  overlays the frames' pale sky band in walnut ink (never over the car, no
  scrim, no gradient). Wide screens: a walnut type field on the left, the
  plate full-bleed on the right.

  Both plates are sticky over the section's first screen — on wide screens
  the type field pins with the media plate, so the composition never empties
  out while the orbit plays — and both release on the same line exactly as
  the hero ends, with the Gallery immediately behind. While pinned, the type
  field trails the wheel by ~72px so the column is demonstrably moving with
  the scroll instead of sitting still for a whole screen. The cue retires as
  soon as scrolling starts: it is a prompt to begin, not a label for the
  whole sequence. Native scrolling only — no lock, no interception, no
  scroll-to. All copy here is unchanged.
*/
export default function Hero() {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  /* Gone by ~110px, as the first frame of the orbit begins to give way. */
  const cueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  /*
    The type field is only pinned where the split layout applies (>=64rem).
    Below that it scrolls away on its own, so it must not be lagged twice.
  */
  const [pinnedField, setPinnedField] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 64rem)')
    const sync = () => setPinnedField(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const textY = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0, pinnedField && !reduceMotion ? -72 : 0]
  )

  const headlineProps = reduceMotion
    ? {}
    : {
        initial: { y: '110%' },
        animate: { y: '0%' },
        transition: {
          duration: duration.reveal,
          delay: 0.1,
          ease: ease.expoOut,
        },
      }

  const riseProps = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: duration.fade, delay, ease: ease.power3 },
        }

  return (
    <section className="hero" id={content.hero.id} ref={ref}>
      <motion.div className="hero__text" style={{ y: textY }}>
        <motion.p className="hero__meta" {...riseProps(0)}>
          {content.hero.meta}
        </motion.p>

        <h1 className="hero__headline">
          <span className="hero__line">
            <motion.span {...headlineProps}>{content.hero.headline}</motion.span>
          </span>
        </h1>

        <MStripes
          className="hero__stripes"
          animated={!reduceMotion}
          delay={0.5}
          duration={duration.stripes}
        />

        <motion.p className="hero__body" {...riseProps(0.7)}>
          {content.hero.body}
        </motion.p>

        <motion.div
          className="hero__cue-slot"
          style={reduceMotion ? undefined : { opacity: cueOpacity }}
        >
          <motion.p className="hero__cue" {...riseProps(0.9)}>
            {content.hero.scrollCue}
          </motion.p>
        </motion.div>
      </motion.div>

      <div className="hero__media">
        <OrbitStack
          progress={scrollYProgress}
          frames={content.hero.orbit}
          label={content.hero.orbitLabel}
        />
      </div>
    </section>
  )
}
