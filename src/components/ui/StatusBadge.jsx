import React from 'react'

const StatusBadge = ({ status, size = 'sm' }) => {
  const getStatusStyles = (status) => {
    const normalizedStatus = status?.toLowerCase()
    switch (normalizedStatus) {
      case 'delivered':
      case 'completed':
      case 'active':
      case 'approved':
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'processing':
      case 'in progress':
      case 'shipped':
      case 'active':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'pending':
      case 'just started':
      case 'draft':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'new':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200'
      case 'cancelled':
      case 'rejected':
      case 'inactive':
      case 'returned':
      case 'refunded':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'paused':
        return 'bg-surface-100 text-surface-600 border-surface-200'
      default:
        return 'bg-surface-100 text-surface-600 border-surface-200'
    }
  }

  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${getStatusStyles(status)} ${sizeStyles[size]}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  )
}

export default StatusBadge
