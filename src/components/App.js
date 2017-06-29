import React from 'react';
import Header from './Header';
import ExchangeRates from './ExchangeRates';
import HistoricalComparisons from './HistoricalComparisons';
import CurrencyConverter from './CurrencyConverter';


const App = (props) => {
  const {
    baseCurrency,
    comparisonCurrency,
    allCurrencies,
    exchangeRates,
    historicalComparisons,
    isFetchingRates,
    onBaseCurrencyChange,
    onComparisonCurrencyChange,
    isFetchingComparisons
  } = props;

  return (
    <div className="App">
      <Header />
      <main className="container">
        <h2>Exchange Rates</h2>
        <div className="row well">
          <ExchangeRates
            baseCurrency={baseCurrency}
            allCurrencies={allCurrencies}
            exchangeRates={exchangeRates}
            isFetchingRates={isFetchingRates}
            onChange={onBaseCurrencyChange}
          />
          <HistoricalComparisons 
            baseCurrency={baseCurrency}
            allCurrencies={allCurrencies}
            comparisons={historicalComparisons}
            comparisonCurrency={comparisonCurrency}
            isFetchingComparisons={isFetchingComparisons}
            onChange={onComparisonCurrencyChange}
          />
        </div>
        <div className="row well">
          <CurrencyConverter 
            baseCurrency={baseCurrency}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
