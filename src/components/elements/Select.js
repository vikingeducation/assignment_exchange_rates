import React from "react";

const Select = props => {
  //const { baseCurrency, rates, switch_currency } = props;
  const { baseValue, handleSwitch, rates } = props;

  //gets currencies from rates object
  let currenciesArray = Object.keys(rates);
  //console.log("log rates select", rates);
  const currenciesOptions = currenciesArray.map((currency, i) => {
    return (
      <option key={i + 1} value={currency}>
        {currency}
      </option>
    );
  });
  return (
    <select
      className="form-control"
      {...props}
      value={baseValue}
      onChange={handleSwitch}
    >
      <option key="0" value={baseValue}>
        {baseValue}
      </option>
      {currenciesOptions}
    </select>
  );
};

Select.defaultProps = {
  type: "text"
};

export default Select;
