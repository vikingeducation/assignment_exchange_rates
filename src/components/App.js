import React, { Component } from "react";
import "../App.css";
import ExchangeRates from "./ExchangeRates";
import Select from "./elements/Select";
import HistoricalRates from "./HistoricalRates";
import Input from "./elements/Input";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      currencies: [],
      base: "EUR",
      toCurrency: "USD",
      historicalRates: [],
      convertedValue: 0
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
    if (e.target.name == "from") {
      var fromCurrency = e.target.value;
      var toCurrency = this.state.toCurrency;
    } else {
      var fromCurrency = this.state.base;
      var toCurrency = e.target.value;
    }

    this.setState({
      isFetching: true,
      base: fromCurrency,
      toCurrency
    });

    fetch(`http://api.fixer.io/latest?base=${fromCurrency}`)
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
    let historicalRates = [];

    date.forEach(function(date, index) {
      fetchPromises.push(
        fetch(
          `http://api.fixer.io/${date}/?base=${fromCurrency}&symbols=${toCurrency}`
        )
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

  onChangeInputHandler = e => {
    let amount = e.target.value;
    let base = this.state.base;
    let toCurrency = this.state.toCurrency;
    let rates = this.state.rates;

    let conversion = rates
      .filter(function(el) {
        return el.split(":")[0] == toCurrency;
      })
      .join("")
      .split(": ")[1];

    let convertedValue = Number(amount) * Number(conversion);
    this.setState({
      convertedValue
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
            name="from"
            options={this.state.currencies}
            onChange={this.onChangeHandler}
            selected=""
          />
        </form>

        <form>
          <Select
            name="to"
            options={this.state.currencies}
            onChange={this.onChangeHandler}
            selected=""
          />
        </form>

        <form>
          <Input onChange={this.onChangeInputHandler} />
        </form>

        <Input disabled value={this.state.convertedValue} />

        <ExchangeRates
          base={this.state.base}
          rates={this.state.rates}
          isFetching={this.state.isFetching}
        />
        <br />

        <HistoricalRates
          historicalRates={this.state.historicalRates}
          base={this.state.base}
          toCurrency={this.state.toCurrency}
          isFetching={this.state.isFetching}
        />
      </div>
    );
  }
}

export default App;
