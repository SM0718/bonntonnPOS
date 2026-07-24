import React, { forwardRef } from 'react'

const Input = forwardRef(function Input({ label, type, className, labelStyle, required, error, ...props }, ref) {
  return (
    <div className="w-full">
      {label && (
        <label className={`label-base ${labelStyle || ''}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        className={`input-base ${error ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : ''} ${className || ''}`}
        type={type}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
})

export default Input
