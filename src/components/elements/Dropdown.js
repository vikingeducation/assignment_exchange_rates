import React from "react";

const Dropdown = ({
  currency,
  isFetching,
  label,
  selected,
  name,
  onChange
}) => {
  if (isFetching) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  let indexofSelected = 0;
  let currencyList = currency.map((x, index) => {
    if (x === selected) {
      indexofSelected = index;
    }
    return (
      <option value={index} key={x}>
        {x}
      </option>
    );
  });
  return (
    <div>
      <label>
        <h4>{label}</h4>
      </label>
      <br />
      <select value={indexofSelected} name={name} onChange={onChange}>
        {currencyList}
      </select>
    </div>
  );
};

export default Dropdown;
