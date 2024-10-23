import React from 'react'

function Button({className, children, type,  ...props}) {
  return (
    <button className={className} type={type} {...props}>
        {children}
    </button>
  )
}

export default Button