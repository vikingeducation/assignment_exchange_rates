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
    conversionAmount,
    exchangeRates,
    historicalComparisons,
    isFetchingRates,
    isFetchingComparisons,
    onBaseCurrencyChange,
    onComparisonCurrencyChange,
    onConversionAmountChange,
    conversionResult
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
          <CurrencyConverter 
            baseCurrency={baseCurrency}
            comparisonCurrency={comparisonCurrency}
            conversionAmount={conversionAmount}
            conversionResult={conversionResult}
            onChange={onConversionAmountChange}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
