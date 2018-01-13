import React from 'react'

const Button = ({size, type, color, children}) => {
  const sizeClass = size ? `btn-${size}` : ''
  return (
    <button
      type={type}
      className={`btn btn-${color} ${sizeClass}`}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
  color: 'default',
  children: 'Submit'
}

export default Button
