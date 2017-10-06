import React, { Component } from "react";
import CurrencyConverterContainer from "./CurrencyConverterContainer";
import CurrencyRatesTableContainer from "./CurrencyRatesTableContainer";
import JumbotronFluid from "./elements/JumbotronFluid";

class App extends Component {
  constructor() {
    super(),
      (this.state = {
        isFetching: false,
        baseCurrency: "EUR",
        baseValue: 1,
        exchangeRate: 0.8,
        convertedValue: "",
        convertedCurrency: "USD"
      });
  }
  populateCurrencyTable = e => {
    console.log(e.target);
  };
  render() {
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
