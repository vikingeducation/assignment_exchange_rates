import React from "react";

const ExchangeRates = ({ rates, isFetching, base }) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {base}
      </div>
      <div className="panel-body">
        {isFetching ? <p>Loading...</p> : rates}
      </div>
    </div>
  );
};

export default ExchangeRates;
