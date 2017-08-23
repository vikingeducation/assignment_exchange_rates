import React, { Component } from "react";
import App from "./components/App";

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      selectedCurrency: "EUR",
      rates: {}
    };
  }

  componentDidMount = () => {
    this.fetchRates(this.state.selectedCurrency);
  };

  selectCurrency = e => {
    this.fetchRates(e.target.value);
  };

  fetchRates = async currency => {
    try {
      const res = await fetch(`https://api.fixer.io/latest?base=${currency}`);

      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      else {
        const json = await res.json();
        this.setState({ rates: json.rates, selectCurrency: currency });
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
