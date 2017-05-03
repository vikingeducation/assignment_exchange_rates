import React from 'react';

const HistoricalRates = ({ historicalRates, isFetching, base, toCurrency }) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {base} to {toCurrency}
      </div>
      <div className="panel-body">
        {isFetching ? <p>Loading...</p> : historicalRates}
      </div>
    </div>
  );
};

export default HistoricalRates;
