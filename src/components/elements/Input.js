import React from "react";

const Input = ({name}) => {
  return (
    <label>
      <input name={name} />
    </label>
  );
};

/*
some other attributes that could be added
onChange={onChange}
value={value}
*/

export default Input;
