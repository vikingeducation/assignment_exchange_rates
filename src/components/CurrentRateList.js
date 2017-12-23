import React from 'react';
import Select from './elements/Select';
import { getLists } from '../helpers/lists';

const CurrentRateList = ({currentRates, isFetching, onCurrChange, currentExchangeCurr}) => {
  const lists = getLists(currentRates);

  if (isFetching) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-3">
            <Select
              options={lists.currencies}
              className="currency-select"
              exchangeCurr={currentExchangeCurr}
              onChange={onCurrChange}
            />
          </div>
        </div>
        <dl className="row justify-content-left">
          {lists.rateList}
        </dl>
      </div>
    );
  }
};

export default CurrentRateList;
