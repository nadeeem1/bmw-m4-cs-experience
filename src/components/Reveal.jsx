import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  reveal as revealDefaults,
  revealFade,
  revealScaleX,
  revealUp,
} from '../config/theme'

/*
  Transform-and-opacity only. The clipPath wipe variants were removed: line
  reveals use translateY inside an overflow-hidden wrapper instead, which
  keeps the work on the compositor for low-end GPUs.
*/
const VARIANTS = {
  fade: revealFade,
  scaleX: revealScaleX,
  up: revealUp,
}

export default function Reveal({
  as = 'div',
  variant = 'up',
  delay = 0,
  stagger = 0,
  once = revealDefaults.once,
  amount = revealDefaults.amount,
  margin = revealDefaults.margin,
  className,
  style,
  children,
  ...rest
}) {
  const reduceMotion = useReducedMotion()
  const base = VARIANTS[variant] ?? revealUp
  const Component = motion[as] ?? motion.div

  const resolved = useMemo(() => {
    const visible = { ...base.visible }
    const transition = { ...visible.transition }

    if (stagger) {
      transition.staggerChildren = stagger
      if (delay) transition.delayChildren = delay
    } else if (delay) {
      transition.delay = delay
    }

    visible.transition = transition
    return { ...base, visible }
  }, [base, delay, stagger])

  return (
    <Component
      className={className}
      style={style}
      initial={reduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once, amount, margin }}
      variants={resolved}
      {...rest}
    >
      {children}
    </Component>
  )
}