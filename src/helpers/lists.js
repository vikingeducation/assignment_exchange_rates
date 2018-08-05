import React from 'react';
import { round } from '../helpers/math';

export function getLists(ratesObject) {
  let rateList = [];
  let currencies = [];

  if (ratesObject) {
    let rates = Object.entries(ratesObject.rates).sort();

    for (let [currency, rate] of rates) {
      rateList.push(
        <div className="col-sm-2" key={currency}>
          <dt>{currency}</dt>
          <dd>{round(rate)}</dd>
        </div>
      );
      currencies.push(currency);
    }

    // put in alphabetical order
    currencies = currencies.sort();
    currencies.unshift(ratesObject.base);
  }

  return { rateList, currencies };
}

export function displayHistoricalList(rates) {
  let ratesCollection = [];

  for (let rate of rates) {
    ratesCollection.push(
      <div className="col-sm-6" key={rates.indexOf(rate)}>
        <dt>{rates.indexOf(rate) + 1 + ' YR'}</dt>
        <dd>{round(rate)}</dd>
      </div>
    );
  }
  return ratesCollection;
}
