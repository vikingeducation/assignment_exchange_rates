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
        convertedCurrency: "USD",
        rates: [],
        date: ""
      });
  }

  componentDidMount() {
    // Before performing the fetch, set isFetching to true
    this.setState({ isFetching: true });

    // Add a delay to the URL and reset isFetching upon
    // completion of the request.
    fetch("https://reqres.in/api/users?delay=1")
      .then(response => response.json())
      .then(json => {
        this.setState({
          users: json.data,
          isFetching: false
        });
      });
  }
  populateCurrencyTable = e => {
    e.preventDefault();
    console.log("curr", this.state.baseCurrency);
    console.log("date", this.state.date);
    let date = this.state.date;
    let currency = this.state.baseCurrency;
    fetch(`http://api.fixer.io/${date}?base=${currency}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          rates: json.rates
        });
      });
  };

  switch_currency = e => {
    e.preventDefault();
    console.log("select-target", e.target);
    console.log("select-target.value", e.target.value);
    this.setState({
      baseCurrency: e.target.value
    });
  };

  setDate = e => {
    console.log("date-target", e.target);
    console.log("date-target.value", e.target.value);
    this.setState({
      date: e.target.value
    });
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
          switch_currency={this.switch_currency}
          setDate={this.setDate}
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
