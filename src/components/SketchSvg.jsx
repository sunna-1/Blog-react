import { motion } from 'framer-motion'

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.8, delay: i * 0.15, ease: [0.43, 0.13, 0.23, 0.96] },
      opacity: { duration: 0.3, delay: i * 0.15 },
    },
  }),
}

function SketchFrame({ children, className = '', viewBox = '0 0 200 200' }) {
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

export function SketchLogo({ className = '' }) {
  return (
    <SketchFrame className={className} viewBox="0 0 48 48">
      <motion.ellipse
        cx="24"
        cy="24"
        rx="18"
        ry="12"
        stroke="currentColor"
        strokeWidth="1.4"
        variants={draw}
        initial="hidden"
        animate="visible"
        custom={0}
      />
      <motion.circle
        cx="24"
        cy="24"
        r="5"
        stroke="currentColor"
        strokeWidth="1.4"
        variants={draw}
        initial="hidden"
        animate="visible"
        custom={1}
      />
      <motion.path
        d="M8 24 Q24 8 40 24"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        variants={draw}
        initial="hidden"
        animate="visible"
        custom={2}
      />
    </SketchFrame>
  )
}

export function SketchEye({ className = '' }) {
  return (
    <SketchFrame className={className} viewBox="0 0 320 280">
      <motion.path
        d="M40 140 C80 60, 240 60, 280 140 C240 220, 80 220, 40 140 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      />
      <motion.circle
        cx="160"
        cy="140"
        r="42"
        stroke="currentColor"
        strokeWidth="1.6"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      />
      <motion.circle
        cx="172"
        cy="128"
        r="10"
        fill="currentColor"
        opacity="0.15"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.4 }}
      />
      <motion.path
        d="M200 90 Q250 120 270 160"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
      />
      <motion.path
        d="M90 200 Q160 250 230 200"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
      />
    </SketchFrame>
  )
}

export function SketchDiary({ className = '' }) {
  return (
    <SketchFrame className={className} viewBox="0 0 120 120">
      <motion.rect
        x="28"
        y="18"
        width="58"
        height="78"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.4"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      />
      <motion.path
        d="M28 30 H86 M40 48 H74 M40 62 H68 M40 76 H60"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      />
      <motion.path
        d="M86 18 V96"
        stroke="currentColor"
        strokeWidth="1.4"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
      />
    </SketchFrame>
  )
}

export function SketchPen({ className = '' }) {
  return (
    <SketchFrame className={className} viewBox="0 0 120 120">
      <motion.path
        d="M30 90 L55 35 L75 45 L50 100 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      />
      <motion.path
        d="M55 35 L90 25 L75 45"
        stroke="currentColor"
        strokeWidth="1.2"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      />
    </SketchFrame>
  )
}

export function SketchTools({ className = '' }) {
  return (
    <SketchFrame className={className} viewBox="0 0 120 120">
      <motion.rect
        x="22"
        y="42"
        width="76"
        height="48"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.4"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      />
      <motion.path
        d="M38 58 H82 M38 72 H66"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      />
      <motion.circle
        cx="60"
        cy="28"
        r="12"
        stroke="currentColor"
        strokeWidth="1.4"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
      />
    </SketchFrame>
  )
}

export function SketchWiggleLine({ className = '' }) {
  return (
    <svg className={`sketch-wiggle ${className}`} viewBox="0 0 200 12" aria-hidden="true">
      <motion.path
        d="M0 6 Q25 0, 50 6 T100 6 T150 6 T200 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </svg>
  )
}
