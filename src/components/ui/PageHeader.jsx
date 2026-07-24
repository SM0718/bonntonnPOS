import React from 'react'
import { motion } from 'framer-motion'

const PageHeader = ({ title, subtitle, actions, breadcrumbs }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      {breadcrumbs && (
        <div className="flex items-center gap-2 text-sm text-surface-500 mb-3">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-surface-300">/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-surface-700 transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-surface-700 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default PageHeader
