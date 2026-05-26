import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar, MobileTopBar } from './Sidebar'
import SketchBackground from './SketchBackground'
import '../styles/sketch.css'

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="diary-app">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <MobileTopBar onMenuOpen={() => setMobileOpen(true)} />

      <div className="diary-main">
        <SketchBackground pathname={location.pathname} />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            className="diary-page"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <a className="scroll-hint desktop-only" href="#page-end" aria-label="滚动到页尾">
          <span>Scroll</span>
          <motion.span
            className="scroll-hint-arrow"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </a>
      </div>
    </div>
  )
}
