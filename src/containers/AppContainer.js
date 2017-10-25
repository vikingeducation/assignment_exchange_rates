import React, { Component } from "react";
import App from "../components/App";
import getSymbolFromCurrency from "currency-symbol-map";

class AppContainer extends Component {
  constructor() {
    super();

    // Initialize users in state as an empty array and
    // set isFetching to false.
    this.state = {
      isFetching: false,
      currency: [],
      currToConvert: "",
      currConverted: "",
      converted: 0
    };
  }

  componentDidMount() {
    // Before performing the fetch, set isFetching to true
    this.setState({ isFetching: true });
    // After component mounts, call the API to get the
    // users, then update state which triggers re-render.
    fetch("http://api.fixer.io/latest")
      .then(response => response.json())
      .then(json => {
        //Currency List holds possibities from api
        let currencyList = ["EUR : " + getSymbolFromCurrency("EUR")];
        //Add symbols
        for (var x in json.rates) {
          currencyList.push(x + " : " + getSymbolFromCurrency(x));
        }
        //sort names alpha
        currencyList.sort(function(a, b) {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          return 0;
        });
        this.setState({
          currency: currencyList,
          isFetching: false,
          currToConvert: currencyList[8],
          currConverted: currencyList[30],
          converted: json.rates[currencyList[30].substr(0, 3)]
        });
      });
  }

  onChangeInput = e => {
    let selectedCurr = this.state.currency[e.target.value];
    // this.setState({
    //   currToConvert: this.state.currency[e.target.value]
    // });
    this.setState({ isFetching: true });
    // After component mounts, call the API to get the
    // users, then update state which triggers re-render.
    fetch(`http://api.fixer.io/latest?base=${selectedCurr.substr(0, 3)}`)
      .then(response => response.json())
      .then(json => {
        //Currency List holds possibities from api
        console.log(json);
        let currToConvert = selectedCurr;
        let indexForConverted = this.state.currConverted.substr(0, 3);
        let converted = json.rates[indexForConverted];
        this.setState({
          isFetching: false,
          currToConvert: currToConvert,
          converted: converted ? converted : 0
        });
      });
  };

  onChangeOutput = e => {
    let selectedCurr = this.state.currency[e.target.value];
    this.setState({ isFetching: true });
    // After component mounts, call the API to get the
    // users, then update state which triggers re-render.
    fetch(
      `http://api.fixer.io/latest?base=${this.state.currToConvert.substr(0, 3)}`
    )
      .then(response => response.json())
      .then(json => {
        let indexForConverted = selectedCurr.substr(0, 3);
        let converted = json.rates[indexForConverted];
        this.setState({
          isFetching: false,
          currConverted: selectedCurr,
          converted: converted ? converted : 0
        });
      });
  };

  render() {
    return (
      <App
        {...this.state}
        onChangeInput={this.onChangeInput}
        onChangeOutput={this.onChangeOutput}
      />
    );
  }
}

export default AppContainer;
