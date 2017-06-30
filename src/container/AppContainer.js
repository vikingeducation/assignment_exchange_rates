import React, { Component } from "react";
import currency from 'currency.js';
import App from "../components/App";
import { getAllCurrencies } from "../helpers";
const BASE_URI = 'http://api.fixer.io/';

/*

  Container <- stateHolder
    ExchangeRates
      Select Base Currency: select
      Exchange Rates List: table
    
    HistoricalComparisons
      Select Comparison Currency: select
      Historical Rates List: table

    CurrencyConverter
      Amount: input
      Result: text


  Main state is:
    Base Currency
    Comparison Currency
    Comparison Currency value
    Amount
    allCurrencies
    isFetchingRates
    isFetchingHistoricalComparisons
    isFetchingConversion
*/

class AppContainer extends Component {
  constructor() {
    super()
    this.state = {
      baseCurrency: "EUR",
      comparisonCurrency: "USD",
      allCurrencies: ["EUR"],
      isFetchingRates: false,
      isFetchingComparisons: false,
      exchangeRates: null,
      historicalComparisons: null,
      conversionRate: 0,
      conversionAmount: 1,
      conversionResult: 0,
      error: null
    }
  }

  componentDidMount() {
    this.setState({ 
      isFetchingRates: true,
      isFetchingComparisons: true
     });
    const ratesUrl = `${BASE_URI}/latest?base=${this.state.baseCurrency}`;
    let rates;
    let allCurrencies;
    fetch(ratesUrl)
      .then(response => response.json())
      .then(data => {
        allCurrencies = getAllCurrencies(data);
        rates = data.rates;
        return this.getHistoricalComparisons();
      })
      .then(responses => {
        return Promise.all(responses.map(res => res.json()));
      })
      .then(data => {
        let historicalComparisons = this.parseHistoricalComparisons(data, this.state.comparisonCurrency);
        let conversionRate = rates[this.state.comparisonCurrency];
        let conversionResult = this.calculateConversionChange(this.state.conversionAmount, conversionRate);

        this.setState({
          isFetchingRates: false,
          isFetchingComparisons: false,
          exchangeRates: rates,
          historicalComparisons,
          conversionRate,
          conversionResult,
          allCurrencies
        });
      })
      .catch(error => {
        this.setState({
          isFetchingRates: false,
          error
        });
      });
  }

  getHistoricalComparisons() {
    let oneYearAgoRatesUrl = `${BASE_URI}/2016-01-01?base=${this.state.baseCurrency}`;
    let twoYearsAgoRatesUrl = `${BASE_URI}/2015-01-01?base=${this.state.baseCurrency}`;
    let threeYearsAgoRatesUrl = `${BASE_URI}/2014-01-01?base=${this.state.baseCurrency}`;

    let p1 = fetch(oneYearAgoRatesUrl);
    let p2 = fetch(twoYearsAgoRatesUrl);
    let p3 = fetch(threeYearsAgoRatesUrl);

    return Promise.all([p1, p2, p3]);
  }

  // need
  // date: Exchange rate of cmparisoncurrency
  parseHistoricalComparisons(data, comparisonCurrency) {
    let results = {};
    data.forEach(year => {
      for (let rate in year.rates) {
        if (rate === comparisonCurrency) {
          results[year.date] = year.rates[rate];
        }
      }
    });
    return results;
  }

  onBaseCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    this.setState({ 
      isFetchingRates: true,
      isFetchingComparisons: true
    });
    let rates;

    const url = `${BASE_URI}/latest?base=${newCurrency}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        rates = data.rates;
        return this.getHistoricalComparisons();
      })
      .then(responses => {
        return Promise.all(responses.map(res => res.json()));
      })
      .then(data => {
        let historicalComparisons = this.parseHistoricalComparisons(data, this.state.comparisonCurrency);
        let conversionRate = rates[this.state.comparisonCurrency];
        let conversionResult = this.calculateConversionChange(this.state.conversionAmount, conversionRate);
        this.setState({
          isFetchingRates: false,
          isFetchingComparisons: false,
          exchangeRates: rates,
          baseCurrency: newCurrency,
          historicalComparisons,
          conversionRate,
          conversionResult
        });
      })
      .catch(error => {
        this.setState({
          isFetchingRates: false,
          error
        });
      });
  }

  onComparisonCurrencyChange = e => {
    const newComparisonCurrency = e.target.value;
    this.setState({ isFetchingComparisons: true });
    this.getHistoricalComparisons()
      .then(responses => {
        return Promise.all(responses.map(res => res.json()));
      })
      .then(data => {
        let historicalComparisons = this.parseHistoricalComparisons(data, newComparisonCurrency);
        let conversionRate = this.state.exchangeRates[newComparisonCurrency];
        let conversionResult = this.calculateConversionChange(this.state.conversionAmount, conversionRate);
        this.setState({
          isFetchingComparisons: false,
          comparisonCurrency: newComparisonCurrency,
          historicalComparisons,
          conversionRate,
          conversionResult
        });
      })
      .catch(error => {
        this.setState({
          isFetchingComparisons: false,
          error
        });
      });
  };

  calculateConversionChange = (amount, rate) => {
    return currency(amount).multiply(rate).value;
  };

  onConversionAmountChange = e => {
    const newAmount = e.target.value;
    let conversionResult = this.calculateConversionChange(newAmount, this.state.conversionRate);
    this.setState({
      conversionAmount: newAmount,
      conversionResult
    });
  };

  render() {
    return(
      <App 
        onBaseCurrencyChange={this.onBaseCurrencyChange}
        onComparisonCurrencyChange={this.onComparisonCurrencyChange}
        onConversionAmountChange={this.onConversionAmountChange}
        {...this.state}
      />
    );
  }
}

export default AppContainer;