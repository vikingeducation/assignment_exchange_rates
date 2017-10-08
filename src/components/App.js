import React, { Component } from "react";
import CurrencyConverterContainer from "./CurrencyConverterContainer";
import CurrencyRatesTableContainer from "./CurrencyRatesTableContainer";
import JumbotronFluid from "./elements/JumbotronFluid";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      baseCurrency: "USD",
      baseValue: 1,
      exchangeRate: 0.8,
      convertedValue: "",
      convertedCurrency: "EUR"
    };
  }
  newCurrency = e => {
    console.log("NEW CURRENCY", e.target.value);
    this.setState({
      baseCurrency: e.target.value
    });
  };
  populateCurrencyTable = e => {
    e.preventDefault();
    console.log("AAAAAAA", e.target);
    console.log("Value", e.target.value);
  };
  render() {
    console.log("this");
    const {
      isFetching,
      baseCurrency,
      baseValue,
      exchangeRate,
      convertedValue,
      convertedCurrency
    } = this.state;
    return (
      <div className="wrapper">
        <JumbotronFluid heading="Currency Converter" />
        <CurrencyRatesTableContainer
          baseCurrency={baseCurrency}
          baseValue={baseValue}
          exchangeRate={exchangeRate}
          convertedValue={convertedValue}
          convertedCurrency={convertedCurrency}
          onSubmit={this.populateCurrencyTable}
          newCurrency={this.newCurrency}
        />
        <CurrencyConverterContainer
          baseCurrency={baseCurrency}
          convertedcurrency={convertedCurrency}
        />
      </div>
    );
  }
}

export default App;
