import React from "react";

const Button = ({ type, color, children, onClick }) =>
  <button onClick={onClick} type={type} className={`btn btn-${color}`}>
    {children}
  </button>;

export default Button;
