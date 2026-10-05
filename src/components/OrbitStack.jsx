import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import CarSilhouette from './CarSilhouette'
import { images } from '../data/cars'

/*
  Editorial photo sequence for the hero.

  A scroll-driven sequence of official BMW PressClub photographs. It is
  deliberately NOT a 3D model, NOT WebGL and NOT a video: five poses over
  four one-way transitions, front to rear. Adjacent frames are different
  camera angles, so there is nothing to morph — and a straight opacity
  crossfade between two angles produces a double exposure (two cars, two
  plates) that reads as a damaged print the moment the scroll stops.

  So the transition is a rise, not a blend: the outgoing frame holds while
  the next one rides up over it behind a single hard edge — the same hard
  edge the design system uses to separate every other surface. Nothing is
  ever half-transparent, so every intermediate position is a composed image
  rather than a ghost. The frame underneath drifts up (ORBIT_EXIT) and
  pushes in slightly (ORBIT_SETTLE) as it goes, so both sides of the edge
  are moving instead of one of them sitting dead.

  Rhythm, as a fraction of the hero's pinned scroll range:

    ORBIT_LEAD    the opening frame holds while the copy is still on screen,
                  so the sequence starts as the reader finishes the masthead.
    ORBIT_TAIL    the sequence is finished here. The remaining range settles
                  on the last pose, so the rear view is complete and still
                  before the plate lets go — it does not run out of scroll
                  exactly as it resolves.
    ORBIT_DISSOLVE
                  share of one beat spent rising. The rest of the beat is a
                  hold: the frame sits crisp and still, so a slow reader
                  always has a clean photograph to look at.

  Each beat is therefore hold → rise → hold, and the whole thing is a pure
  deterministic function of scroll progress (no state, no timers), so it is
  identical forwards and backwards. It is exported so it can be verified
  outside the browser.
*/

export const ORBIT_POSES = 5
export const ORBIT_TRANSITIONS = 4

export const ORBIT_LEAD = 0.06
export const ORBIT_TAIL = 0.88
export const ORBIT_DISSOLVE = 0.6

/* The covered frame drifts up a quarter of the plate as it goes. */
export const ORBIT_EXIT = 0.25

/* The covered frame pushes in as it goes — motion on both sides of the edge. */
export const ORBIT_SETTLE = 0.04

/* One push-in across the pinned range — the plate breathes as you scroll. */
export const ORBIT_PUSH = 0.08

const ORBIT_SPAN = ORBIT_TAIL - ORBIT_LEAD

export function orbitSegment(p) {
  /* Explicit endpoints: p = 0 is pose 0, p = 1 is pose 4. */
  if (!(p > 0)) return { segment: 0, local: 0 }
  if (p >= 1) return { segment: ORBIT_TRANSITIONS - 1, local: 1 }

  const travelled = (p - ORBIT_LEAD) / ORBIT_SPAN
  if (!(travelled > 0)) return { segment: 0, local: 0 }
  if (travelled >= 1) return { segment: ORBIT_TRANSITIONS - 1, local: 1 }

  const raw = travelled * ORBIT_TRANSITIONS
  const segment = Math.min(Math.floor(raw), ORBIT_TRANSITIONS - 1)
  return { segment, local: raw - segment }
}

export function orbitEase(local) {
  return local * local * (3 - 2 * local)
}

/* Hold — rise — hold inside a single beat. */
export function orbitBlend(local) {
  const edge = (1 - ORBIT_DISSOLVE) * 0.5
  if (!(local > edge)) return 0
  if (local >= 1 - edge) return 1
  return orbitEase((local - edge) / ORBIT_DISSOLVE)
}

/*
  y is a fraction of the plate's height: 1 parks a layer exactly on the
  lower edge (clipped — fully opaque, never a ghost), 0 seats it in place.
  The frame underneath drifts up by at most ORBIT_EXIT while the next one
  covers it, which keeps the uncovered top edge fully painted at every step:
  the old frame can never retreat faster than the new one arrives. The
  arriving frame never scales — a parked layer that is not exactly its own
  height either pokes into the frame or opens a seam.
*/
export function orbitLayer(index, p) {
  const { segment, local } = orbitSegment(p)
  const blend = orbitBlend(local)

  if (index === segment)
    return {
      segment,
      opacity: 1,
      y: -ORBIT_EXIT * blend,
      scale: 1 + ORBIT_SETTLE * blend,
    }
  if (index === segment + 1)
    return { segment, opacity: 1, y: 1 - blend, scale: 1 }
  return { segment, opacity: 0, y: 1, scale: 1 }
}

/* Bounded window: at most two mounted layers, never all five. */
export function orbitWindow(segment) {
  return [segment, segment + 1].filter(
    (index) => index >= 0 && index < ORBIT_POSES
  )
}

function OrbitLayer({ index, src, progress, staticLayer, onError }) {
  const opacity = useTransform(progress, (value) =>
    staticLayer ? (index === 0 ? 1 : 0) : orbitLayer(index, value).opacity
  )
  const y = useTransform(progress, (value) =>
    staticLayer ? '0%' : `${orbitLayer(index, value).y * 100}%`
  )
  const scale = useTransform(progress, (value) =>
    staticLayer ? 1 : orbitLayer(index, value).scale
  )

  return (
    <motion.img
      className="orbit__layer"
      src={src}
      alt=""
      aria-hidden="true"
      decoding="async"
      draggable={false}
      onError={onError}
      style={{ opacity, y, scale }}
    />
  )
}

export default function OrbitStack({ progress, frames, label }) {
  const reduceMotion = useReducedMotion()
  const [segment, setSegment] = useState(() => {
    const value = progress.get()
    return Number.isFinite(value) ? orbitSegment(value).segment : 0
  })
  const [failed, setFailed] = useState(false)

  const resolved = useMemo(
    () =>
      frames.map((frame) => ({
        ...frame,
        src: images[frame.key],
      })),
    [frames]
  )

  /*
    Prefetch every unique source once the hero is on screen so a rising
    frame never arrives blank. These are the same five files the rest of
    the page already loads.
  */
  useEffect(() => {
    const urls = [...new Set(resolved.map((frame) => frame.src).filter(Boolean))]
    let cancelled = false
    let handle

    const run = () => {
      if (cancelled) return
      urls.forEach((url) => {
        const image = new Image()
        image.src = url
      })
    }

    if (typeof window.requestIdleCallback === 'function') {
      handle = window.requestIdleCallback(run)
      return () => {
        cancelled = true
        window.cancelIdleCallback(handle)
      }
    }

    handle = window.setTimeout(run, 1)
    return () => {
      cancelled = true
      window.clearTimeout(handle)
    }
  }, [resolved])

  useEffect(() => {
    if (reduceMotion) return undefined

    const unsubscribe = progress.on('change', (value) => {
      const next = orbitSegment(value).segment
      setSegment((current) => (current === next ? current : next))
    })

    return unsubscribe
  }, [progress, reduceMotion])

  const visible = reduceMotion ? [0] : orbitWindow(segment)

  /* Uniform cinematic push-in across the section's full progress. */
  const scale = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 1 + ORBIT_PUSH]
  )

  return (
    <motion.div
      className="orbit"
      role="img"
      aria-label={label}
      style={{ scale }}
    >
      {failed && (
        <div className="orbit__fallback">
          <CarSilhouette color="rgb(255 237 215 / 0.28)" cutout="var(--color-walnut)" />
        </div>
      )}

      {visible.map((index) => {
        const frame = resolved[index]
        if (!frame) return null

        return (
          <OrbitLayer
            key={index}
            index={index}
            src={frame.src}
            progress={progress}
            staticLayer={reduceMotion}
            onError={() => setFailed(true)}
          />
        )
      })}
    </motion.div>
  )
}
