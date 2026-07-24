import React from 'react'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'

const EmptyState = ({ 
  icon: Icon = Package, 
  title = 'No data found', 
  description = 'There are no items to display at the moment.',
  action,
  actionLabel,
  onAction 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center mb-5">
        <Icon size={28} className="text-surface-400" />
      </div>
      <h3 className="text-lg font-semibold text-surface-900 mb-2">{title}</h3>
      <p className="text-sm text-surface-500 text-center max-w-sm mb-6">{description}</p>
      {(action || onAction) && (
        <button
          onClick={onAction || action}
          className="btn-primary"
        >
          {actionLabel || 'Get Started'}
        </button>
      )}
    </motion.div>
  )
}

export default EmptyState
