import React from "react";

const Results = ({
  converted,
  currency1,
  currency2,
  isFetching,
  amountEntered
}) => {
  if (isFetching) {
    return <p>Loading...</p>;
  } else {
    return (
      <h3>
        {currency1 ? currency1.substr(5, 7) : 0}
        {amountEntered} {currency1 ? currency1.substr(0, 3) : 0} ={" "}
        {currency2 ? currency2.substr(5, 7) : 0}
        {parseFloat(Math.round(converted * amountEntered * 100) / 100).toFixed(
          2
        )}{" "}
        {currency2 ? currency2.substr(0, 3) : 0}
      </h3>
    );
  }
};

export default Results;
