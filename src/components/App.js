import React, { Component } from "react";
import CurrencyConverterContainer from "./CurrencyConverterContainer";
import CurrencyRatesTableContainer from "./CurrencyRatesTableContainer";
import JumbotronFluid from "./elements/JumbotronFluid";

class App extends Component {
  constructor() {
    super(),
      (this.state = {
        isFetching: false,
        baseCurrency: "USD",
        baseValue: 1,
        exchangeRate: 0.8,
        convertedValue: "",
        convertedCurrency: "EUR",
        rates: [],
        date: new Date().toISOString().slice(0, 10)
      });
  }
  getRates = () => {
    fetch(
      `http://api.fixer.io/${this.state.date}?base=${this.state.baseCurrency}`
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          rates: json.rates,
          isFetching: false
        });
      });
  };
  componentDidMount() {
    // Before performing the fetch, set isFetching to true
    this.setState({ isFetching: true });
    this.getRates();
  }
  shouldComponentUpdate() {
    return this.state.isFetching !== false;
  }

  switch_currency = e => {
    e.preventDefault();
    //console.log("select-target", e.target);
    //console.log("select-target.value", e.target.value);
    return new Promise((resolve, reject) => {
      resolve(
        this.setState({
          baseCurrency: e.target.value
        })
      );
    }).then(() => {
      //console.log("hit");
      //console.log("RAAATES", this.state.rates);
      this.setState({ isFetching: true });
      this.getRates();
    });
  };

  setDate = e => {
    //console.log("date-target", e.target);
    //console.log("date-target.value", e.target.value);

    return new Promise((resolve, reject) => {
      resolve(
        this.setState({
          date: e.target.value
        })
      );
    }).then(() => {
      //console.log("hit");
      //console.log("RAAATES", this.state.rates);
      this.setState({ isFetching: true });
      this.getRates();
    });
  };
  render() {
    const {
      baseCurrency,
      baseValue,
      exchangeRate,
      convertedValue,
      convertedCurrency,
      rates,
      date
    } = this.state;
    console.log("RATES Passed", rates);
    return (
      <div className="wrapper">
        <JumbotronFluid heading="Currency Converter" />
        <CurrencyRatesTableContainer
          baseCurrency={baseCurrency}
          onSubmit={this.populateCurrencyTable}
          switch_currency={this.switch_currency}
          setDate={this.setDate}
          date={date}
          rates={rates}
        />
        <CurrencyConverterContainer
          baseCurrency={baseCurrency}
          exchangeRate={exchangeRate}
          convertedValue={convertedValue}
          convertedCurrency={convertedCurrency}
          setDate={this.setDate}
          rates={rates}
        />
      </div>
    );
  }
}

export default App;
