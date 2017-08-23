import React from "react";

const Options = ({ onBaseChange, currencies }) => {
  if (!currencies.length) return null;
  return (
    <select onChange={onBaseChange}>
      {currencies.map(curr => {
        return (
          <option key={curr} value={curr}>
            {curr}
          </option>
        );
      })}
    </select>
  );
};

export default Options;
