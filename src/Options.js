import React from "react";

const Options = ({ handler, dataOptions }) => {
  if (!dataOptions.length) return null;
  return (
    <select onChange={handler}>
      {dataOptions.map(item => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default Options;
