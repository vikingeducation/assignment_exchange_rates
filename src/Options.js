import React from "react";

const Options = ({ stateKey, handler, dataOptions, label }) => {
  if (!dataOptions.length) return null;
  return (
    <div className="form-group form-inline">
      <label>
        {label}:
      </label>
      <select className="form-control" onChange={handler}>
        {dataOptions.map(item =>
          <option key={item} value={stateKey + "=" + item}>
            {item}
          </option>
        )}
      </select>
    </div>
  );
};

export default Options;
