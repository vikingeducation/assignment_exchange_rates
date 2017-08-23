import React, { Component } from "react";
import App from "./components/App";

const compareDates = Array(10).fill(true).map((thing, index) => {
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
      comparedRates: []
    };
  }

  componentDidMount = () => {
    this.fetchRates(this.state.selectedCurrency);
    this.fetchComparison(this.state.selectedCompareCurrency);
  };

  selectCurrency = e => {
    this.fetchRates(e.target.value);
  };

  selectCompareCurrency = e => {
    this.fetchComparison(e.target.value);
  };

  fetchComparison = async compareCurrency => {
    try {
      let promises = compareDates.map(date => {
        return this.doTheFetch(this.state.selectedCurrency, date);
      });
      let history = await Promise.all(promises);
      history = history.map(year => {
        return {
          Year: year.date,
          Rate: year.rates[compareCurrency]
        };
      });

      this.setState({
        selectedCompareCurrency: compareCurrency,
        comparedRates: history
      });
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
        this.setState({ rates, selectedCurrency: currency });
      }
    } catch (error) {
      this.handleError(error);
    }
  };

  handleError = error => {
    console.error(error);
    this.setState({ error });
  };

  render() {
    const handlers = {
      selectCurrency: this.selectCurrency,
      selectCompareCurrency: this.selectCompareCurrency
    };
    return <App handlers={handlers} {...this.state} />;
  }
}

export default AppContainer;
