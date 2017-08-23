import React from "react";

const Options = ({ handler, dataOptions }) => {
  if (!dataOptions.length) return null;
  return (
    <div className="form-group form-inline">
      <select className="form-control" onChange={handler}>
        {dataOptions.map(item => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Options;
