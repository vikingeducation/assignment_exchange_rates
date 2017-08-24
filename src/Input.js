import React from "react";

const Options = ({ stateKey, handler, label }) => {
  return (
    <div className="form-group form-inline">
      <label>
        {label}:
      </label>
      <input defaultValue={1} className="form-control" onChange={handler} />
    </div>
  );
};

export default Options;
