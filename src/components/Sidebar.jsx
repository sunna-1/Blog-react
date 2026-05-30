import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BrandLogo } from './DecorImage'
import { site } from '../data/content'
const navItems = [
  { to: '/', label: '首页', end: true },
  { to: '/articles', label: '文章' },
  { to: '/daily', label: '日常动态' },
  { to: '/tools', label: '实用工具' },
]

export function Sidebar({ mobileOpen, onClose }) {
  const nav = (
    <>
      <NavLink className="sidebar-brand" to="/" onClick={onClose}>
        <BrandLogo className="sidebar-logo" />
        <span>
          <strong>{site.nameCn}</strong>
          <small>{site.subtitle}</small>
        </span>
      </NavLink>

      <nav className="sidebar-nav" aria-label="主导航">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' is-active' : ''}`
            }
            onClick={onClose}
          >
            <span className="sidebar-link-dot" aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-foot">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={site.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <p>© {new Date().getFullYear()} Sunna</p>
      </div>
    </>
  )

  return (
    <>
      <aside className="sidebar desktop-only" aria-label="侧边栏导航">
        {nav}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              className="sidebar-backdrop mobile-only"
              aria-label="关闭菜单"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="sidebar sidebar-drawer mobile-only"
              aria-label="移动端导航"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <button type="button" className="sidebar-close" onClick={onClose}>
                关闭
              </button>
              {nav}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export function MobileTopBar({ onMenuOpen }) {
  return (
    <header className="mobile-topbar mobile-only">
      <NavLink className="mobile-brand" to="/">
        <BrandLogo className="sidebar-logo" />
        <span>{site.nameCn}</span>
      </NavLink>
      <button type="button" className="menu-trigger" onClick={onMenuOpen}>
        <span />
        <span />
      </button>
    </header>
  )
}
