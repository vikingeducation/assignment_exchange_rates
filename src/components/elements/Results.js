import React from "react";

const Results = ({ converted, currency1, currency2, isFetching }) => {
  if (isFetching) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div>
        <h3>
          {currency1 ? currency1.substr(5, 7) : 0}1{" "}
          {currency1 ? currency1.substr(0, 3) : 0} ={" "}
          {currency2 ? currency2.substr(5, 7) : 0}
          {parseFloat(Math.round(converted * 100) / 100).toFixed(2)}{" "}
          {currency2 ? currency2.substr(0, 3) : 0}
        </h3>
      </div>
    );
  }
};

export default Results;
