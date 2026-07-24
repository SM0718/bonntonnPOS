import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChartLine,
  Upload,
  PackageSearch,
  Package2,
  BookA,
  BookCopy,
  ReceiptText,
  ChartNoAxesCombined,
  ChartNetwork,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-react'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { name: 'Product Analytics', icon: ChartLine, slug: '/' },
      { name: 'Course Analytics', icon: ChartNoAxesCombined, slug: '/course-analytics' },
      { name: 'Ebooks Analytics', icon: ChartNetwork, slug: '/ebook-analytics' },
    ],
  },
  {
    label: 'Products',
    items: [
      { name: 'Upload Product', icon: Upload, slug: '/product-upload' },
      { name: 'All Products', icon: PackageSearch, slug: '/products' },
      { name: 'Orders', icon: Package2, slug: '/orders' },
    ],
  },
  {
    label: 'Content',
    items: [
      { name: 'Course Upload', icon: BookA, slug: '/course-upload' },
      { name: 'Ebooks Upload', icon: BookCopy, slug: '/ebook-upload' },
      { name: 'All Content', icon: ReceiptText, slug: '/contents' },
    ],
  },
]

function Header({ collapsed, onToggle }) {
  const location = useLocation()

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 68 : 256 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 h-screen bg-white border-r border-surface-200 z-50 flex flex-col"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-surface-100">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                  <LayoutDashboard size={16} className="text-white" />
                </div>
                <span className="text-sm font-bold text-surface-900 tracking-tight">Bonntonn</span>
              </motion.div>
            )}
          </AnimatePresence>
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center mx-auto">
              <LayoutDashboard size={16} className="text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-6">
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-surface-400"
                  >
                    {group.label}
                  </motion.p>
                )}
              </AnimatePresence>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.slug
                  const Icon = item.icon
                  return (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative ${
                          isActive
                            ? 'bg-brand-50 text-brand-700'
                            : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                        }`}
                        title={collapsed ? item.name : undefined}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-brand-600 rounded-r-full"
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          />
                        )}
                        <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-brand-600' : 'text-surface-400 group-hover:text-surface-600'}`} />
                        <AnimatePresence mode="wait">
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -5 }}
                              transition={{ duration: 0.15 }}
                              className="whitespace-nowrap"
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom user section */}
        <div className="border-t border-surface-100 p-3">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 px-3 py-2"
              >
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xs font-bold flex-shrink-0">
                  BK
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-900 truncate">Bonntonn Kitchen</p>
                  <p className="text-xs text-surface-500 truncate">Admin</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="fixed top-[72px] -translate-y-1/2 z-[60] w-5 h-10 bg-white border border-surface-200 rounded-r-md flex items-center justify-center hover:bg-surface-50 transition-colors shadow-sm cursor-pointer"
        style={{ left: collapsed ? 68 : 256 }}
      >
        {collapsed ? <ChevronRight size={12} className="text-surface-500" /> : <ChevronLeft size={12} className="text-surface-500" />}
      </button>
    </>
  )
}

export default Header
