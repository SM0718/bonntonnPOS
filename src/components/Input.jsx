import React, {useId} from 'react'

const Input = React.forwardRef(function Input({label, type, className, labelStyle, required, ...props}, ref) {
  const id = useId()
  return (
    <>
        {label && <label className={labelStyle} htmlFor={id}>{label} {required && <span className="text-red-600">*</span>}</label>}
        <input className={`${className}`} type={type} id={id} ref={ref} {...props}/>
    </>
  )
})

export default Input