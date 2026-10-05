import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CarSilhouette from './CarSilhouette'

export default function CarImage({
  src,
  alt = '',
  cutout = 'var(--color-bark)',
  silhouetteColor = 'rgb(255 237 215 / 0.28)',
  kenBurns = true,
  className = '',
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setLoaded(false)
    setFailed(false)
  }, [src])

  return (
    <div className={`carimg ${className}`.trim()}>
      <div className="carimg__fallback">
        <CarSilhouette color={silhouetteColor} cutout={cutout} />
      </div>

      {!failed && (
        <motion.img
          key={src}
          className={`carimg__img ${kenBurns ? 'carimg__img--drift' : ''}`.trim()}
          src={src}
          alt={alt}
          initial={false}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}