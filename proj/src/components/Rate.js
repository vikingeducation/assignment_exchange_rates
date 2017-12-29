import React from "react";

const Rate = ({ currency, value }) => {
  return (
    <li>
      {" "}
      {currency} : {value}
    </li>
  );
};

export default Rate;
