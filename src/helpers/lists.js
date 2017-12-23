import React from 'react';

export function getLists(ratesObject) {
  let rateList = [];
  let currencies = [];

  if (ratesObject) {
    let rates = Object.entries(ratesObject.rates).sort();

    for (let rate of rates) {
      rateList.push(
        <div className="col-sm-2" key={rate[0]}>
          <dt>{rate[0]}</dt>
          <dd>{rate[1]}</dd>
        </div>
      );
      currencies.push(rate[0]);
    }

    // put in alphabetical order
    currencies = currencies.sort();
    currencies.unshift(ratesObject.base);
  }

  return { rateList, currencies };
}

export function displayList(rates) {
  let ratesCollection = [];

  for (let rate of rates) {
    ratesCollection.push(
      <div className="col-sm-6" key={rates.indexOf(rate)}>
        <dt>{rates.indexOf(rate) + 1 + ' YR'}</dt>
        <dd>{rate}</dd>
      </div>
    );
  }
  return ratesCollection;
}
