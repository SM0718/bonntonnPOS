import React from 'react'

const variantStyles = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

function Button({ className, children, type, variant = 'primary', size = 'md', ...props }) {
  return (
    <button
      className={`${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className || ''}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
