import React, { Component } from "react";
import App from "./components/App";

const COMPARE_DATES = Array(10).fill(true).map((thing, index) => {
  const year = 2017 - index;
  return `${year}-01-01`;
});

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      selectedCurrency: "EUR",
      selectedCompareCurrency: "USD",
      rates: [],
      comparedRates: [],
      convertAmount: 1
    };
  }

  // Given an array of promises that resolve to objects containing updated
  // state: resolve those promises, merge the objects, and set state
  updateState = promises => {
    Promise.all(promises)
      .then(opts => {
        // [{this: true}, {that: false}] => {this: true, that: false}
        this.setState(opts.reduce((acc, opt) => Object.assign(acc, opt), {}));
      })
      .catch(error => this.handleError(error));
  };

  componentDidMount = () => {
    this.updateState([
      this.fetchRates(this.state.selectedCurrency),
      this.fetchComparison(this.state.selectedCompareCurrency)
    ]);
  };

  selectCurrency = e => {
    this.updateState([
      this.fetchRates(e.target.value),
      this.fetchComparison(this.state.selectedCompareCurrency, e.target.value)
    ]);
  };

  selectCompareCurrency = e => {
    this.updateState([this.fetchComparison(e.target.value)]);
  };

  updateConversion = e => {
    this.updateState([this.setState({ convertAmount: e.target.value })]);
  };

  fetchComparison = async (compareCurrency, againstCurrency) => {
    try {
      againstCurrency = againstCurrency || this.state.selectedCurrency;
      let history = await Promise.all(
        COMPARE_DATES.map(async date => {
          const year = await this.doTheFetch(againstCurrency, date);
          return {
            Date: year.date,
            Rate: year.rates[compareCurrency]
          };
        })
      );

      return {
        selectedCompareCurrency: compareCurrency,
        comparedRates: history
      };
    } catch (error) {
      this.handleError(error);
    }
  };

  fetchRates = async currency => {
    try {
      let rates = await this.doTheFetch(currency);
      if (rates) {
        rates = Object.entries(rates.rates).map(([Country, Rate]) => {
          return {
            Country: Country,
            Rate: Rate
          };
        });

        rates.sort((a, b) => {
          if (a.Country < b.Country) return -1;
          else if (a.Country > b.Country) return 1;
          else return 1;
        });

        return { rates, selectedCurrency: currency };
      }
    } catch (error) {
      this.handleError(error);
    }
  };

  async doTheFetch(currency, date = new Date().toISOString().slice(0, 10)) {
    try {
      const res = await fetch(`https://api.fixer.io/${date}?base=${currency}`);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      else {
        let json = await res.json();
        json.rates[currency] = 1;
        return json;
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError = error => {
    console.error(error);
    this.setState({ error });
  };

  render() {
    const handlers = {
      selectCurrency: this.selectCurrency,
      selectCompareCurrency: this.selectCompareCurrency,
      updateConversion: this.updateConversion
    };
    return <App handlers={handlers} {...this.state} />;
  }
}

export default AppContainer;
