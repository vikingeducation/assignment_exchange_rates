import React, { Component } from "react";
import Input from "./elements/Input";
import ConverterBaseCurrencySelector from "./ConverterBaseCurrencySelector";
import ConverterConvertedCurrencySelector from "./ConverterConvertedCurrencySelector";

class CurrencyConverterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      converterBaseCurrency: "USD",
      convertedCurrency: "EUR",
      converterBaseValue: 1,
      currenciesArray: []
    };
  }

  //gets array of currencies for currency selectors
  //will take the base currency
  getCurrencies = base => {
    this.setState({
      isFetching: true
    });
    fetch(`http://api.fixer.io/latest?base=${base}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log("Fetched selector currencies");
        this.setState({
          isFetching: false,
          currenciesArray: Object.keys(json.rates)
        });
      });
  };
  // component did mount with api call to populate selectors
  componentDidMount = () => {
    this.getCurrencies(this.state.converterBaseCurrency);
  };
  //another api call to get rates for selected currencies
  //will take base cuurency and the converted currency
  baseCurrencyInput = e => {
    let input = e.target.value;
    this.setState({ converterBaseValue: input });
  };
  selectBaseCurrency = e => {
    this.setState({ converterBaseCurrency: e.target.value });
    this.getCurrencies(e.target.value);
  };
  selectConvertedCurrency = e => {
    this.setState({ convertedCurrency: e.target.value });
    this.getCurrencies(e.target.value);
  };
  render() {
    const {
      converterBaseCurrency,
      convertedCurrency,
      converterBaseValue,
      currenciesArray
    } = this.state;
    console.log("rendered");
    return (
      <section className="converter_wrapper">
        <form className="container" id="currencyConverterForm">
          <Input
            name="converterBaseCurrency"
            form="CurrencyConverterForm"
            value={converterBaseValue}
            onChange={this.baseCurrencyInput}
          />
          <ConverterBaseCurrencySelector
            converterBaseCurrency={converterBaseCurrency}
            selectCurrency={this.selectBaseCurrency}
            currenciesArray={currenciesArray}
          />
          <p id="converter_to">to</p>
          <ConverterConvertedCurrencySelector
            convertedCurrency={convertedCurrency}
            currenciesArray={currenciesArray}
            selectCurrency={this.selectConvertedCurrency}
          />
        </form>
        {/*
        input up
        select up
        p to
        select 
        button 


        rate <p></p>

        Output
        */}
      </section>
    );
  }
}

export default CurrencyConverterContainer;
