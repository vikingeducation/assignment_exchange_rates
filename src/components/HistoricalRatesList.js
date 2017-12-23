import React from 'react';
import Select from './elements/Select';
import { getLists, displayList } from '../helpers/lists';

const HistoricalRatesList = (props) => {
  const {
    currentRates,
    historicalFromCurrency,
    historicalToCurrency,
    historicalRates,
    onHistoricalRateChange,
    isFetching
  } = props;

  const lists = getLists(currentRates);

  let ratesList;

  if (historicalFromCurrency === historicalToCurrency) {
    ratesList = <p className="text-danger">Please select two DIFFERENT currencies</p>;
  } else {
    ratesList = displayList(historicalRates);
  }

  if (isFetching) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="HistoricalRatesList container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Select
              options={lists.currencies}
              className="currency-select"
              name="historicalFrom"
              exchangeCurr={historicalFromCurrency}
              onChange={onHistoricalRateChange}
            />
          </div>
        </div>

        <p className="text-center">to</p>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <Select
              options={lists.currencies}
              className="currency-select"
              name="historicalTo"
              exchangeCurr={historicalToCurrency}
              onChange={onHistoricalRateChange}
            />
          </div>
        </div>

        <dl className="HistoricalRates row text-center">
          {ratesList}
        </dl>
      </div>
    );
  }
};

export default HistoricalRatesList;
