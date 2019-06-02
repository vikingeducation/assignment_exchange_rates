import React, { Component } from "react";
import CurrencyConverterContainer from "./CurrencyConverterContainer";
import CurrencyRatesTableContainer from "./CurrencyRatesTableContainer";
import JumbotronFluid from "./elements/JumbotronFluid";
import config from '../config'
class App extends Component {
  constructor() {
    super(),
      (this.state = {
        isFetching: false,
        baseCurrency: "USD",
        rates: [],
        date: new Date().toISOString().slice(0, 10)
      });
  }


  getRates = () => {
    fetch(
      `http://api.fixer.io/${this.state.date}?base=${this.state.baseCurrency}?{config.key}`
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
    this.setState({ isFetching: true }, this.getRates());
  }
  shouldComponentUpdate() {
    return this.state.isFetching !== false;
  }

  switch_currency = e => {
    e.preventDefault();
    //console.log("select-target", e.target);
    //console.log("select-target.value", e.target.value);
    this.setState(
      {
        baseCurrency: e.target.value
      },
      this.setState({ isFetching: true }, this.getRates())
    );
  };

  setDate = e => {
    //console.log("date-target", e.target);
    //console.log("date-target.value", e.target.value);
    this.setState(
      {
        date: e.target.value,
        isFetching: true
      },
      this.getRates()
    );
  };
  render() {
    const { baseCurrency, rates, date } = this.state;
    const currenciesArray = Object.keys(rates);
    //console.log("RATES Passed", rates);
    console.log("RATES Passed", config.key);
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
          currenciesArray={currenciesArray}
        />
        <hr />
        <CurrencyConverterContainer />
      </div>
    );
  }
}

export default App;
