import React from "react";

const Select = props => {
  const { isFetching, baseCurrency, convertedCurrency } = props;
  const classNames = `form-control ${props.class}`;
  const handleChange = e => {
    props.newCurrency(e);
  };
  return (
    <select className={classNames} value={baseCurrency} onChange={handleChange}>
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
