import React from 'react';

const CurrentRateList = ({currentRates, isFetching}) => {
  const rateList = [];

  if (currentRates) {
    for (let [currency, rate] of Object.entries(currentRates.rates)) {
      rateList.push(
        <div className="col-sm-2" key={currency}>
          <dt>{currency}</dt>
          <dd>{rate}</dd>
        </div>
      );
    }
  }

  if (isFetching) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        <dl className="row justify-content-left">
          {rateList}
        </dl>
      </div>
    );
  }
};

export default CurrentRateList;
