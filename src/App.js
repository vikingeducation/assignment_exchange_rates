import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DisplayRates from "./displayExchangeRates";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rates: [],
      historalRates: [],
      currentCurrency: "EUR"
    };
  }
  historicalRate = e => {
    let newUrl =
      "http://api.fixer.io/2000-01-03?base=" +
      this.state.currentCurrency +
      "&symbols=USD";
    let historicalData = [];
    fetch(newUrl)
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.rates) {
          let newObj = {
            currency: Object.keys(json.rates)[0],
            value: json.rates.USD
          };
          historicalData.push(newObj);
        }
        let newUrl =
          "http://api.fixer.io/2001-01-03?base=" +
          this.state.currentCurrency +
          "&symbols=USD";
        return fetch(newUrl);
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.rates) {
          let newObj = {
            currency: Object.keys(json.rates)[0],
            value: json.rates.USD
          };
          historicalData.push(newObj);
        }
        let newUrl =
          "http://api.fixer.io/2002-01-03?base=" +
          this.state.currentCurrency +
          "&symbols=USD";
        return fetch(newUrl);
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.rates) {
          let newObj = {
            currency: Object.keys(json.rates)[0],
            value: json.rates.USD
          };
          historicalData.push(newObj);
        }
        this.setState({ historalRates: historicalData });
      });
  };
  getCurrency = currency => {
    let newUrl = "http://api.fixer.io/latest?base=" + currency;
    fetch(newUrl)
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.rates) {
          const ratesArray = Object.entries(json.rates).map(item => {
            return {
              currency: item[0],
              value: item[1]
            };
          });

          this.setState({ rates: ratesArray, currentCurrency: currency });
        }
      });
  };

  changeParentCurrency = e => {
    e.preventDefault();

    const newCurrency = e.target.mainCurrency.value.toUpperCase();
    e.target.reset();

    this.getCurrency(newCurrency);
  };

  componentDidMount() {
    this.getCurrency("EUR");
  }

  render() {
    return (
      <div className="App">
        <form
          onSubmit={e => {
            console.log(e.target.mainCurrency);
            this.changeParentCurrency(e);
          }}
        >
          <input type="text" name="mainCurrency" />
          <button>Change Currency</button>
        </form>
        <button onClick={this.historicalRate} />
        <h3>
          Current Currency: {this.state.currentCurrency}
        </h3>
        <DisplayRates rates={this.state.historicalRate} />
        <DisplayRates rates={this.state.rates} />
      </div>
    );
  }
}

export default App;
