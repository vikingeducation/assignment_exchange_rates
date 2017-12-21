// CurrencyList.js
import React, { Component } from 'react';
import CurrencyCard from './CurrencyCard';
// ...CurrencyList component code...
const CurrencyList = ({ currencies, isFetching }) => {
  // Generate the CurrencyCard for each Currency
  console.log(currencies);
  const currencyList = currencies.map(currency => {
    return <CurrencyCard currency={currency} />;
  });

  // card-group is the layout wrapper for Bootstrap
  // 4 cards. Add ternary operator to conditionally
  // show Loading... if in the process of fetching.
  return (
    <div className="container">
      <h1>Currency List</h1>
      <div className="card-group">
        {isFetching ? <p>Loading...</p> : currencyList}
      </div>
    </div>
  );
};

export default CurrencyList;
