import React from "react";

const Select = props => {
  const { baseValue, handleSwitch, data } = props;

  //gets keys from dataObject
  //console.log("DAATA", data);
  const optionsList = data.map((item, i) => {
    return (
      <option key={i + 1} value={item}>
        {item}
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
      {optionsList}
    </select>
  );
};

Select.defaultProps = {
  type: "text"
};

export default Select;
