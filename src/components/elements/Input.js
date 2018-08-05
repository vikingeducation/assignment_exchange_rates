import React from 'react';

const Input = props => {
  const classNames = `form-control ${ props.className || '' }`;

  return (
    <input {...props} className={classNames}  />
  );
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
