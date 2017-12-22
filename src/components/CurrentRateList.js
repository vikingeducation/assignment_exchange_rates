import React from 'react';
import Select from './elements/Select';

const CurrentRateList = ({currentRates, isFetching, onCurrChange, currentExchangeCurr}) => {
  const rateList = [];
  const currencies = [];

  if (currentRates) {
    currencies.push(currentExchangeCurr);

    for (let [currency, rate] of Object.entries(currentRates.rates)) {
      rateList.push(
        <div className="col-sm-2" key={currency}>
          <dt>{currency}</dt>
          <dd>{rate}</dd>
        </div>
      );
      currencies.push(currency);
    }
  }

  if (isFetching) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        <div className="col-sm-3">
          <Select
            options={currencies}
            className="currency-select"
            currentExchangeCurr={currentExchangeCurr}
            onChange={onCurrChange}
          />
        </div>
        <dl className="row justify-content-left">
          {rateList}
        </dl>
      </div>
    );
  }
};

export default CurrentRateList;
