import React from 'react'

const FlashMessageFunction = ({type, children}) => (
  <div
    className={`alert alert-${type}`}
    role="alert"
  >
    {children}
  </div>
)

export default FlashMessageFunction;
