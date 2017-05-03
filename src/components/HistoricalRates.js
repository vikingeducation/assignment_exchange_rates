import React from "react";

const HistoricalRates = ({ historicalRates, isFetching, base }) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {base} to USD
      </div>
      <div className="panel-body">
        {isFetching ? <p>Loading...</p> : historicalRates}
      </div>
    </div>
  );
};

export default HistoricalRates;
