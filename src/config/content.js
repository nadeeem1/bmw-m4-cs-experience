/*
  All site copy. Strings marked EDITABLE are editorial prose written for
  this study — rewrite freely. Strings without the marker are fixed by the
  brief and should be treated as locked.
*/

export const content = {
  nav: {
    wordmark: 'ZERO MERCY',
    links: [
      { label: 'Overview', href: '#m4-cs' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Torque', href: '#torque' },
      { label: 'Acceleration', href: '#acceleration' },
    ],
    cta: { label: 'Book a test drive', href: '#configure' },
  },

  hero: {
    id: 'm4-cs',
    headline: 'M4 CS',
    meta: 'COUPE · 2025',
    /* EDITABLE */
    body:
      'One car, taken apart slowly. A single rotary-fed coupe in warm darkness, studied from every angle before it is ever driven.',
    scrollCue: 'Scroll',

    /*
      Scroll-driven photo sequence: an editorial rise between official BMW
      PressClub photographs, not a 3D model and not a video — adjacent frames
      are different camera angles, so each pose rides up over the last behind
      a hard edge instead of cross-dissolving into it. Five poses over four
      one-way transitions, front to rear. Frames render bottom anchored in the
      plate so every car sits grounded the same way — one continuous hero, not
      five pictures.

      `key` resolves through the images manifest in data/cars.js — these are
      the same five files the rest of the page already loads.
    */
    orbitLabel:
      'BMW M4 CS seen from the front, front three-quarter, side, rear three-quarter and rear as the page scrolls.',
    orbit: [
      { key: 'hero' },
      { key: 'galleryFront' },
      { key: 'gallerySide' },
      { key: 'torque' },
      { key: 'galleryRear' },
    ],
  },

  gallery: {
    id: 'gallery',
    /* One 100vh statement each. Ids must stay unique for reel keyframes. */
    views: [
      {
        id: 'view-front',
        label: 'Front',
        image: '/images/m4-cs-2.jpg',
        alt: 'BMW M4 CS seen from the front',
        /* EDITABLE */
        body:
          'The kidney grille reads as one dark mass until the light moves across it.',
      },
      {
        id: 'view-profile',
        label: 'Side profile',
        image: '/images/m4-cs-3.jpg',
        alt: 'BMW M4 CS side profile',
        /* EDITABLE */
        body:
          'A long roofline, short overhangs, and the greenhouse pulled tight over the rear axle.',
      },
      {
        id: 'view-rear',
        label: 'Rear',
        image: '/images/m4-cs-4.jpg',
        alt: 'BMW M4 CS seen from the rear',
        /* EDITABLE */
        body:
          'The tail sits low and wide, with the diffuser carving into the warm dark below it.',
      },
    ],
  },

  torque: {
    id: 'torque',
    eyebrow: 'TORQUE',
    heading: '650 NM OF PURE TORQUE.',
    value: 650,
    unit: 'NM',
    image: '/images/m4-cs-5.jpg',
    alt: 'BMW M4 CS rear three-quarter view',
    /* EDITABLE */
    body:
      'Everything the front axle sends forward arrives without asking for permission. Six hundred and fifty newton metres, delivered early and often.',
    footnote: 'Torque as published by BMW Group. Figures may vary by market.',
  },

  acceleration: {
    id: 'acceleration',
    eyebrow: 'ACCELERATION',
    from: 0,
    to: 3.4,
    unit: 'S',
    label: '0–100 KM/H',
    /* Announced instead of the split digits and unit. EDITABLE */
    ariaLabel: 'Zero to 100 kilometres per hour in 3.4 seconds.',
    /* EDITABLE */
    alt: 'BMW M4 CS',
    /* EDITABLE */
    body:
      'The clock is the argument. Nothing on this page is a bar chart — just the number, counting up once.',
  },

  cta: {
    id: 'configure',
    eyebrow: 'NEXT',
    heading: 'YOUR NEXT MOVE.',
    caption: 'Interface study. Controls are non-interactive in this prototype.',
    buttons: [
      { id: 'configure', label: 'Configure', variant: 'outlined' },
      { id: 'compare', label: 'Compare', variant: 'outlined' },
      { id: 'testdrive', label: 'Book a test drive', variant: 'filled' },
    ],
  },

  footer: {
    colophon:
      'Design study. Not affiliated with BMW. Figures per BMW Group PressClub.',
  },
}