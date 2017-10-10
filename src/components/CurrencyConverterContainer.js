import React, { Component } from "react";
import CurrencyConverterForm from "./CurrencyConverterForm";

class CurrencyConverterContainer extends Component {
  constructor(props) {
    super(props),
      (this.state = {
        isFetching: false,
        converterBaseCurrency: "USD",
        converterBaseValue: 1,
        convertedCurrency: "EUR",
        convertedValue: "",
        converterExchangeRate: 0.0
      });
  }
  baseCurrencyInput = e => {
    let input = e.target.value;
    this.setState({ converterBaseValue: input });
  };
  componentDidMount = () => {
    //sets new state of rates
    this.setState({ isFetching: true });
    let base = this.state.converterBaseCurrency;
    let converted = this.state.convertedCurrency;
    fetch(`http://api.fixer.io/latest?base=${base}&symbols=${converted}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log("Calculator Fetch", json.rates[converted]);
        this.setState({
          isFetching: false,
          converterExchangeRate: json.rates[converted]
        });
      });
  };
  selectCurrency = e => {
    //console.log("select-target", e.target);
    //console.log("select-target.value", e.target.value);
    return new Promise((resolve, reject) => {
      resolve(
        this.setState({
          converterBaseCurrency: e.target.value
        })
      );
    });
  };
  render() {
    const {
      converterBaseCurrency,
      converterBaseValue,
      convertedCurrency,
      convertedValue,
      converterExchangeRate
    } = this.state;
    return (
      <section className>
        <h1>Currency Converter</h1>
        <CurrencyConverterForm
          baseCurrencyInput={this.baseCurrencyInput}
          selectCurrency={this.selectCurrency}
        />
      </section>
    );
  }
}

export default CurrencyConverterContainer;
