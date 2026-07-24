import React from 'react'

const SkeletonLoader = ({ rows = 3, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="skeleton h-10 w-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

const CardSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-3 flex-1">
              <div className="skeleton h-3 w-24" />
              <div className="skeleton h-7 w-32" />
              <div className="skeleton h-3 w-20" />
            </div>
            <div className="skeleton h-10 w-10 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}

const TableSkeleton = ({ rows = 5, cols = 5 }) => {
  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-surface-100">
        <div className="skeleton h-8 w-48" />
      </div>
      <div className="divide-y divide-surface-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            {Array.from({ length: cols }).map((_, j) => (
              <div key={j} className="skeleton h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export { SkeletonLoader, CardSkeleton, TableSkeleton }
export default SkeletonLoader
