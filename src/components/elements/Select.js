import React from 'react';

const Select = props => {
  const { options, className, exchangeCurr, ...restOfProps } = props;
  const classNames = 'form-control ' + className;
  const optionsElements = options.map(option => {
    return <option value={option} key={option}>{option}</option>;
  });

  return (
    <select className={classNames} value={exchangeCurr} {...restOfProps}>
      {optionsElements}
    </select>
  );
};

export default Select;
