import React, { Component } from "react";
import Input from "./elements/Input";
import ConverterBaseCurrencySelector from "./ConverterBaseCurrencySelector";
import ConverterConvertedCurrencySelector from "./ConverterConvertedCurrencySelector";

class CurrencyConverterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currenciesArray: [],
      converterBaseCurrency: "USD",
      convertedCurrency: "EUR"
    };
  }
  componentDidMount = () => {
    //gets array of currencies for currency selectors
    this.setState({
      isFetching: true
    });
    fetch(`http://api.fixer.io/latest?base=USD`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log("FETCHING", json.rates);
        json.rates.USD = "USD";
        this.setState({
          isFetching: false,
          currenciesArray: Object.keys(json.rates)
        });
        //this.props.converterBaseCurrency = this.state.converterBaseCurrency;
      });
  };

  selectBaseCurrency = e => {
    //console.log("select-target", e.target);
    //console.log("select-target.value", e.target.value);
    this.setState({ converterBaseCurrency: e.target.value });
  };
  selectConvertedCurrency = e => {
    //console.log("select-target", e.target);
    //console.log("select-target.value", e.target.value);
    this.setState({ convertedCurrency: e.target.value });
  };
  render() {
    const {
      converterBaseValue,
      convertedValue,
      baseCurrencyInput,
      converterExchangeRate
    } = this.props;
    const {
      convertedCurrency,
      converterBaseCurrency,
      currenciesArray
    } = this.state;
    console.log("C_array", currenciesArray);
    return (
      <div id="currencyConverterFormWrapper">
        <form className="container" id="currencyConverterForm">
          <Input
            name="converterBaseCurrency"
            form="CurrencyConverterForm"
            value={converterBaseValue}
            onChange={baseCurrencyInput}
          />
          <ConverterBaseCurrencySelector
            converterBaseCurrency={converterBaseCurrency}
            currenciesArray={currenciesArray}
            selectCurrency={this.selectBaseCurrency}
          />
          <p className="converter_to">to</p>
          <ConverterConvertedCurrencySelector
            convertedCurrency={convertedCurrency}
            currenciesArray={currenciesArray}
            selectCurrency={this.selectConvertedCurrency}
          />
        </form>
      </div>
    );
  }
}

export default CurrencyConverterForm;
