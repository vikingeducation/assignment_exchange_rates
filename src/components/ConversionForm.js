import React from 'react';
import Select from './elements/Select';
import Input from './elements/Input';
import { getLists } from '../helpers/lists';
import { round } from '../helpers/math';

const ConversionForm = (props) => {
  const {
    isFetching,
    currentRates,
    convertedTotal,
    convertAmount,
    fromCurrency,
    toCurrency,
    onConvertChange,
    onConvertAmountChange
  } = props;

  const lists = getLists(currentRates);

  let convertedAmount;

  if (fromCurrency === toCurrency) {
    convertedAmount = <p className="text-danger text-center">Currencies must be different</p>;
  } else if (!convertAmount) {
    convertedAmount = <p className="text-danger text-center">Select an amount</p>;
  } else {
    convertedAmount = <p className="text-center">{convertAmount} {fromCurrency} to {toCurrency} = {round(convertedTotal)}</p>;
  }

  if (isFetching) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="ConversionForm container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Input type="number" value={convertAmount} onChange={onConvertAmountChange} />
          </div>
          <div className="col-md-6">
            <Select
              options={lists.currencies}
              className="currency-select"
              name="from"
              exchangeCurr={fromCurrency}
              onChange={onConvertChange}
            />
          </div>
        </div>

        <p className="text-center">to</p>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <Select
              options={lists.currencies}
              className="currency-select"
              name="to"
              exchangeCurr={toCurrency}
              onChange={onConvertChange}
            />
          </div>
        </div>

        {convertedAmount}
      </div>
    );
  }
};

export default ConversionForm;
