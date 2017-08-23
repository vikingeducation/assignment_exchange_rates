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
      rates: {},
      comparedRates: {}
    };
  }

  componentDidMount = () => {
    this.fetchRates(this.state.selectedCurrency);
  };

  selectCurrency = e => {
    this.fetchRates(e.target.value);
  };

  selectCompareCurrency = async e => {
    try {
      let promises = compareDates.map(date => {
        return this.doTheFetch(this.state.selectedCurrency, date);
      });
      const compare = e.target.value;
      let history = await Promise.all(promises);
      history = history.map(year => {
        return {
          Year: year.date,
          Price: year.rates[compare]
        };
      });

      this.setState({
        selectedCompareCurrency: compare,
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
        this.setState({ rates: rates.rates, selectedCurrency: currency });
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
