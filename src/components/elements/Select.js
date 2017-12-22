import React from 'react';

const Select = props => {
  const { options, className, currentExchangeCurr, ...restOfProps } = props;
  const classNames = 'form-control ' + className;
  const optionsElements = options.map(option => {
    return <option value={option} key={option}>{option}</option>;
  });

  return (
    <select className={classNames} value={currentExchangeCurr} {...restOfProps}>
      {optionsElements}
    </select>
  );
};

export default Select;
