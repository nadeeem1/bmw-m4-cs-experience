import { useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/*
  Counts a single value up once, in view.

  Performance notes:
    - The digits are written straight to the DOM through a ref. No React state
      is set per frame, so the counter triggers no re-render while running.
    - The rAF loop only exists between the element entering the viewport and
      the animation finishing, then it stops. Nothing runs off-screen.
    - Nothing runs at all when reduced motion is requested; the final value is
      rendered immediately.

  Layout stability:
    - `decimals` is fixed, so the digit string never changes length.
    - The stylesheet pins `font-variant-numeric: tabular-nums` and a min-width,
      so each glyph occupies the same advance width throughout the count.
    - The container is never animated, only its text content changes, which is
      why there is no horizontal layout shift.
*/
export default function Counter({
  from = 0,
  to,
  decimals = 1,
  duration = 1400,
  unit,
  label,
  ariaLabel,
  className = '',
}) {
  const reduceMotion = useReducedMotion()
  const wrapperRef = useRef(null)
  const digitsRef = useRef(null)
  const inView = useInView(wrapperRef, { once: true, amount: 0.4 })

  const finalText = to.toFixed(decimals)

  useEffect(() => {
    const node = digitsRef.current
    if (!node) return

    if (reduceMotion) {
      node.textContent = finalText
      return
    }

    if (!inView) return

    let frame
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      // easeOutCubic — decelerates, never overshoots.
      const eased = 1 - (1 - t) ** 3
      node.textContent = (from + (to - from) * eased).toFixed(decimals)

      if (t < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduceMotion, from, to, decimals, duration, finalText])

  return (
    <div className={`counter ${className}`.trim()} ref={wrapperRef}>
      <p className="counter__value">
        {/*
          The split digits and unit would be announced as fragments, so the
          whole reading is supplied once as visually hidden text instead.
        */}
        {ariaLabel ? (
          <span className="u-visually-hidden">{ariaLabel}</span>
        ) : null}
        <span
          className="counter__digits"
          ref={digitsRef}
          aria-hidden="true"
        >
          {reduceMotion ? finalText : from.toFixed(decimals)}
        </span>
        {unit ? (
          <span className="counter__unit" aria-hidden="true">
            {unit}
          </span>
        ) : null}
      </p>

      {label ? <p className="counter__label">{label}</p> : null}
    </div>
  )
}