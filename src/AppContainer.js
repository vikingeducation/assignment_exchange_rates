import React, { Component } from "react";
import App from "./components/App";

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      selectedCurrency: "EUR",
      selectedCompareCurrency: "USD",
      rates: {}
    };
  }

  componentDidMount = () => {
    this.fetchRates(this.state.selectedCurrency);
  };

  selectCurrency = e => {
    this.fetchRates(e.target.value);
  };
  selectCompareCurrency = e => {
    return bananas;
  };

  async doTheFetch(currency, date = new Date().toISOString().slice(0, 10)) {
    try {
      const res = await fetch(`https://api.fixer.io/latest?base=${currency}`);

      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      else {
        const json = await res.json();
        let rates = json.rates;
        rates[currency] = 1;
        return rates;
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  fetchRates = async currency => {
    try {
      let rates = await this.doTheFetch(currency);
      if (rates) {
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
    const handlers = { selectCurrency: this.selectCurrency };
    return <App handlers={handlers} {...this.state} />;
  }
}

export default AppContainer;
