import React, { Component } from "react";
import Input from "./elements/Input";
import CurrencyConverterForm from "./CurrencyConverterForm";
import CurrencyConverterOutput from "./CurrencyConverterOutput";
import PropTypes from "prop-types";

class CurrencyConverterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      converterBaseCurrency: "USD",
      convertedCurrency: "EUR",
      converterBaseValue: 1,
      currenciesArray: [],
      convertingRate: "",
      convertingOutcome: 0
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

  handleClick = e => {
    e.preventDefault();
    this.setState({
      isFetching: true
    });
    fetch(
      `http://api.fixer.io/latest?base=${this.state
        .converterBaseCurrency}&symbols=${this.state.convertedCurrency}`
    )
      .then(response => response.json())
      .then(json => {
        let rate = Object.values(json.rates)[0];
        this.setState(
          {
            convertingRate: rate
          },
          () => {
            let outcome =
              this.state.converterBaseValue * this.state.convertingRate;
            let length = this.state.convertedBaseValue + 3;
            outcome = outcome.toFixed(3);
            this.setState({
              convertingOutcome: outcome
            });
          }
        );
      });
  };
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
      currenciesArray,
      convertingRate,
      convertingOutcome
    } = this.state;
    console.log("rendered");
    return (
      <section className="converter_wrapper">
        <h1>Currency Calculator</h1>
        <form className="container" id="currencyConverterForm">
          <CurrencyConverterForm
            {...this.state}
            baseCurrencyInput={this.baseCurrencyInput}
            handleClick={this.handleClick}
            selectBaseCurrency={this.selectBaseCurrency}
            selectConvertedCurrency={this.selectConvertedCurrency}
          />
          <div className="rate">
            <p>Rate:</p>
            <p>{convertingRate}</p>
          </div>
          <CurrencyConverterOutput {...this.state} />
        </form>
      </section>
    );
  }
}

CurrencyConverterContainer.propTypes = {
  converterBaseCurrency: PropTypes.string.isRequired,
  convertedCurrency: PropTypes.string.isRequired,
  converterBaseValue: PropTypes.number,
  currenciesArray: PropTypes.array.isRequired,
  convertingRate: PropTypes.number,
  convertingOutcome: PropTypes.number
};
export default CurrencyConverterContainer;
