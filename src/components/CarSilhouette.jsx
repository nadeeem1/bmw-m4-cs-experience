export default function CarSilhouette({ color = 'currentColor', cutout = 'transparent' }) {
  return (
    <svg
      className="sil"
      viewBox="0 0 400 170"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M18 118C18 103 29 93 47 91L94 85C114 64 139 47 170 43C196 40 225 41 247 49C267 56 283 69 297 85L353 91C371 93 382 103 382 118H18Z"
        fill={color}
      />
      <path
        d="M118 86C126 68 145 57 170 53C192 50 214 51 231 57"
        stroke={cutout}
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="96" cy="118" r="27" fill={cutout} />
      <circle cx="300" cy="118" r="27" fill={cutout} />
      <circle cx="96" cy="118" r="18" fill={color} />
      <circle cx="300" cy="118" r="18" fill={color} />
      <circle cx="96" cy="118" r="6" fill={cutout} />
      <circle cx="300" cy="118" r="6" fill={cutout} />
      <path d="M0 145H400" stroke={color} strokeWidth="3" opacity="0.35" />
    </svg>
  )
}