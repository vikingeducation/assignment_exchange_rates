import React, { Component } from "react";
import "../App.css";
import ExchangeRates from "./ExchangeRates";
import Select from "./elements/Select";
import HistoricalRates from "./HistoricalRates";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      currencies: [],
      base: "EUR",
      historicalRates: []
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });

    fetch("http://api.fixer.io/latest")
      .then(response => response.json())
      .then(json => {
        let rates = Object.keys(json.rates).map(function(el) {
          return `${el}: ${json.rates[el]}`;
        });

        let currencies = Object.keys(json.rates);
        this.setState({
          rates,
          currencies
        });
      });

    let date = ["2014-01-01", "2015-01-01", "2016-01-01"];
    let fetchPromises = [];
    let historicalRates = [];

    date.forEach(function(date, index) {
      fetchPromises.push(
        fetch(`http://api.fixer.io/${date}/?symbols=USD`)
          .then(response => response.json())
          .then(json => {
            return Object.keys(json.rates).map(function(el) {
              return `Date: ${date}, ${el}: ${json.rates[el]}`;
            });
          })
      );
    });

    Promise.all(fetchPromises).then(result => {
      historicalRates = result[0].concat(result[1], result[2]);
      this.setState({
        historicalRates,
        isFetching: false
      });
    });
  }

  onChangeHandler = e => {
    let newCurrency = e.target.value;

    this.setState({
      isFetching: true,
      base: newCurrency
    });

    fetch(`http://api.fixer.io/latest?base=${newCurrency}`)
      .then(response => response.json())
      .then(json => {
        let rates = Object.keys(json.rates).map(function(el) {
          return `${el}: ${json.rates[el]}`;
        });

        this.setState({
          rates,
          isFetching: false
        });
      });

    let date = ["2014-01-01", "2015-01-01", "2016-01-01"];
    let fetchPromises = [];
    let currentBase = this.state.base;
    let historicalRates = [];

    date.forEach(function(date, index) {
      fetchPromises.push(
        fetch(`http://api.fixer.io/${date}/?base=${newCurrency}&symbols=USD`)
          .then(response => response.json())
          .then(json => {
            return Object.keys(json.rates).map(function(el) {
              return `Date: ${date}, ${el}: ${json.rates[el]} `;
            });
          })
      );
    });

    Promise.all(fetchPromises).then(result => {
      historicalRates = result[0].concat(result[1], result[2]);

      this.setState({
        historicalRates,
        isFetching: false
      });
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Currency Converter</h2>
        </div>

        <form>
          <Select
            options={this.state.currencies}
            onChange={this.onChangeHandler}
            selected=""
          />
        </form>

        <ExchangeRates
          base={this.state.base}
          rates={this.state.rates}
          isFetching={this.state.isFetching}
        />
        <br />
        <HistoricalRates
          historicalRates={this.state.historicalRates}
          base={this.state.base}
          isFetching={this.state.isFetching}
        />
      </div>
    );
  }
}

export default App;
