/*
  Motion and shape constants, mirroring tokens.css for JS consumers.
  Motion policy: animate transform and opacity only. The pre-redesign
  clipPath wipe variants are gone — clip reveals are now translateY inside
  an overflow-hidden wrapper, which stays on the compositor.
*/

export const color = {
  walnut: '#100904',
  bark: '#382416',
  cork: '#40372e',
  driftwood: '#6c5f51',
  cream: '#ffedd7',
  muted: '#b9a894',
  mLight: '#81c4ff',
  mDark: '#16588e',
  mRed: '#e7222e',
  mRedPress: '#ce1a26',
}

export const stripeOrder = [color.mLight, color.mDark, color.mRed]

export const radius = {
  cards: 12,
  inputs: 0,
  pill: 36,
  outlined: 22.5,
  full: 9999,
}

export const ease = {
  expoOut: [0.16, 1, 0.3, 1],
  power3: [0.65, 0, 0.35, 1],
  power4In: [0.55, 0.1, 0.9, 0.2],
}

export const duration = {
  fade: 0.6,
  reveal: 0.75,
  stripes: 0.8,
}

export const stagger = {
  tight: 0.06,
  base: 0.08,
  loose: 0.12,
}

export const reveal = {
  once: true,
  amount: 0.3,
  margin: '0px 0px -8% 0px',
}

export const spring = {
  press: { type: 'spring', stiffness: 600, damping: 30 },
}

export const layout = {
  navHeight: 60,
  navHeightDesktop: 72,
  breakpoint: '48rem',
  scrubDistance: '200vh',
}

export const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.fade, ease: ease.expoOut },
  },
}

export const revealFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.fade, ease: ease.power3 },
  },
}

export const revealScaleX = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.stripes, ease: ease.expoOut },
  },
}