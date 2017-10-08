import React from "react";

const Select = props => {
  const {
    isFetching,
    baseCurrency,
    convertedCurrency,
    switch_currency
  } = props;
  const classNames = `form-control ${props.class}`;

  return (
    <select
      className={classNames}
      {...props}
      value={baseCurrency}
      onChange={switch_currency}
    >
      <option key="0" value={baseCurrency}>
        {baseCurrency}
      </option>
      <option key="1" value={convertedCurrency}>
        {convertedCurrency}
      </option>
    </select>
  );
};

Select.defaultProps = {
  type: "text"
};

export default Select;
