import React, { Component } from "react";
import CurrencyConverterForm from "./CurrencyConverterForm";

class CurrencyConverterContainer extends Component {
  constructor(props) {
    super(props),
      (this.state = {
        isFetching: false,
        baseCurrency: "USD",
        baseValue: 1,
        convertedCurrency: "EUR",
        convertedValue: "",
        exchangeRate: 0.0
      });
  }
  render() {
    return (
      <section className>
        <h1>Currency Converter</h1>
        <CurrencyConverterForm />
      </section>
    );
  }
}

export default CurrencyConverterContainer;
