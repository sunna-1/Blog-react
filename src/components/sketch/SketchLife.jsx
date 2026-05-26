import { motion } from 'framer-motion'

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, delay: i * 0.12, ease: [0.43, 0.13, 0.23, 0.96] },
      opacity: { duration: 0.35, delay: i * 0.12 },
    },
  }),
}

const staticDraw = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.2 },
}

function Frame({ children, className = '', viewBox = '0 0 200 200' }) {
  return (
    <svg
      className={`sketch-svg ${className}`}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function P({ d, custom = 0, w = 1.3, ...rest }) {
  return (
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={draw}
      custom={custom}
      {...staticDraw}
      {...rest}
    />
  )
}

export function SketchPeony({ className = '', animate = true }) {
  const props = animate ? staticDraw : { initial: false }
  const Path = animate ? motion.path : 'path'
  const common = {
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  }
  return (
    <Frame className={className} viewBox="0 0 200 220">
      {animate ? (
        <>
          <motion.path
            d="M100 200 Q100 140 100 100"
            strokeWidth="1.4"
            variants={draw}
            custom={0}
            {...props}
            {...common}
          />
          <motion.path
            d="M70 120 Q100 90 130 120 Q100 150 70 120"
            strokeWidth="1.3"
            variants={draw}
            custom={1}
            {...props}
            {...common}
          />
          <motion.path
            d="M55 95 Q85 70 100 95 Q115 70 145 95 Q115 120 100 95 Q85 120 55 95"
            strokeWidth="1.2"
            variants={draw}
            custom={2}
            {...props}
            {...common}
          />
          <motion.path
            d="M82 75 Q100 55 118 75 Q100 92 82 75"
            strokeWidth="1.2"
            variants={draw}
            custom={3}
            {...props}
            {...common}
          />
          <motion.ellipse
            cx="100"
            cy="68"
            rx="8"
            ry="12"
            strokeWidth="1.2"
            variants={draw}
            custom={4}
            {...props}
            {...common}
          />
        </>
      ) : (
        <>
          <path d="M100 200 Q100 140 100 100" strokeWidth="1.4" {...common} />
          <path d="M70 120 Q100 90 130 120 Q100 150 70 120" strokeWidth="1.3" {...common} />
          <path
            d="M55 95 Q85 70 100 95 Q115 70 145 95 Q115 120 100 95 Q85 120 55 95"
            strokeWidth="1.2"
            {...common}
          />
        </>
      )}
    </Frame>
  )
}

export function SketchCat({ className = '', animate = true }) {
  if (!animate) {
    return (
      <Frame className={className} viewBox="0 0 200 160">
        <path
          d="M50 70 L35 35 L65 55 M150 70 L165 35 L135 55 M60 95 Q100 130 140 95 Q155 75 140 55 Q100 40 60 55 Q45 75 60 95"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
        />
        <circle cx="82" cy="72" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="118" cy="72" r="3" fill="currentColor" opacity="0.5" />
      </Frame>
    )
  }
  return (
    <Frame className={className} viewBox="0 0 200 160">
      <P d="M50 70 L35 35 L65 55" custom={0} />
      <P d="M150 70 L165 35 L135 55" custom={1} />
      <P
        d="M60 95 Q100 130 140 95 Q155 75 140 55 Q100 40 60 55 Q45 75 60 95"
        custom={2}
        w={1.5}
      />
      <motion.circle
        cx="82"
        cy="72"
        r="3"
        fill="currentColor"
        opacity="0.4"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
      />
      <motion.circle
        cx="118"
        cy="72"
        r="3"
        fill="currentColor"
        opacity="0.4"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6 }}
      />
      <P d="M95 88 Q100 92 105 88" custom={3} w={1} />
    </Frame>
  )
}

export function SketchTeacup({ className = '', animate = true }) {
  return (
    <Frame className={className} viewBox="0 0 160 140">
      {animate ? (
        <>
          <P d="M40 70 Q40 40 80 40 Q120 40 120 70 L120 90 Q80 100 40 90 Z" custom={0} />
          <P d="M120 55 Q145 55 145 72 Q145 88 120 88" custom={1} />
          <P d="M55 100 Q80 108 105 100" custom={2} w={1} />
          <motion.path
            d="M90 25 Q95 10 100 25 Q105 35 90 30"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
            variants={draw}
            custom={3}
            {...staticDraw}
          />
        </>
      ) : (
        <>
          <path
            d="M40 70 Q40 40 80 40 Q120 40 120 70 L120 90 Q80 100 40 90 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M120 55 Q145 55 145 72 Q145 88 120 88"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
        </>
      )}
    </Frame>
  )
}

export function SketchPlant({ className = '', animate = true }) {
  const s = {
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  }
  if (!animate) {
    return (
      <Frame className={className} viewBox="0 0 140 180">
        <path d="M70 170 L70 90" strokeWidth="1.4" {...s} />
        <path d="M70 120 Q40 100 35 70 Q55 85 70 110" strokeWidth="1.2" {...s} />
        <path d="M70 100 Q100 80 105 50 Q85 75 70 95" strokeWidth="1.2" {...s} />
        <path d="M70 130 Q50 140 45 155" strokeWidth="1.1" {...s} />
        <path d="M70 125 Q95 138 98 158" strokeWidth="1.1" {...s} />
      </Frame>
    )
  }
  return (
    <Frame className={className} viewBox="0 0 140 180">
      <P d="M70 170 L70 90" custom={0} w={1.4} />
      <P d="M70 120 Q40 100 35 70 Q55 85 70 110" custom={1} />
      <P d="M70 100 Q100 80 105 50 Q85 75 70 95" custom={2} />
      <P d="M70 130 Q50 140 45 155" custom={3} w={1.1} />
      <P d="M70 125 Q95 138 98 158" custom={4} w={1.1} />
    </Frame>
  )
}

export function SketchWindow({ className = '', animate = true }) {
  const s = { stroke: 'currentColor', fill: 'none' }
  if (!animate) {
    return (
      <Frame className={className} viewBox="0 0 160 160">
        <path d="M20 30 H140 V130 H20 Z" strokeWidth="1.4" {...s} />
        <path d="M80 30 V130 M20 80 H140" strokeWidth="1.2" {...s} />
        <path d="M35 50 Q55 65 75 50" strokeWidth="1" strokeLinecap="round" {...s} />
        <circle cx="115" cy="55" r="14" strokeWidth="1.2" {...s} />
      </Frame>
    )
  }
  return (
    <Frame className={className} viewBox="0 0 160 160">
      <P d="M20 30 H140 V130 H20 Z" custom={0} w={1.4} />
      <P d="M80 30 V130 M20 80 H140" custom={1} />
      <P d="M35 50 Q55 65 75 50" custom={2} w={1} />
      <motion.circle
        cx="115"
        cy="55"
        r="14"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        variants={draw}
        custom={3}
        {...staticDraw}
      />
    </Frame>
  )
}

export function SketchBooks({ className = '', animate = true }) {
  const s = { stroke: 'currentColor', fill: 'none', strokeLinejoin: 'round' }
  if (!animate) {
    return (
      <Frame className={className} viewBox="0 0 140 120">
        <path d="M25 90 V35 H55 V90" strokeWidth="1.3" {...s} />
        <path d="M50 90 V25 H80 V90" strokeWidth="1.3" {...s} />
        <path d="M75 90 V40 H105 V90" strokeWidth="1.3" {...s} />
        <path d="M20 90 H110" strokeWidth="1.4" {...s} />
      </Frame>
    )
  }
  return (
    <Frame className={className} viewBox="0 0 140 120">
      <P d="M25 90 V35 H55 V90" custom={0} />
      <P d="M50 90 V25 H80 V90" custom={1} />
      <P d="M75 90 V40 H105 V90" custom={2} />
      <P d="M20 90 H110" custom={3} w={1.4} />
    </Frame>
  )
}
