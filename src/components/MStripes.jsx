import { motion } from 'framer-motion'
import { ease, stripeOrder } from '../config/theme'

export default function MStripes({
  orientation = 'horizontal',
  animated = false,
  delay = 0,
  duration = 0.8,
  stagger = 0.09,
  className = '',
}) {
  const Tag = animated ? motion.span : 'span'
  const hidden = orientation === 'vertical' ? { scaleY: 0 } : { scaleX: 0 }
  const shown = orientation === 'vertical' ? { scaleY: 1 } : { scaleX: 1 }

  return (
    <div
      className={`mstrip mstrip--${orientation} ${className}`.trim()}
      aria-hidden="true"
    >
      {stripeOrder.map((stripe, index) => (
        <Tag
          key={stripe}
          className="mstrip__bar"
          style={{ background: stripe }}
          {...(animated
            ? {
                initial: hidden,
                animate: shown,
                transition: {
                  duration,
                  delay: delay + index * stagger,
                  ease: ease.expoOut,
                },
              }
            : {})}
        />
      ))}
    </div>
  )
}