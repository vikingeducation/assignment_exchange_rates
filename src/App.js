import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DisplayRates from "./displayExchangeRates";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rates: [],
      currentCurrency: "EUR"
    };
  }

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
        <h3>
          Current Currency: {this.state.currentCurrency}
        </h3>
        <DisplayRates rates={this.state.rates} />
      </div>
    );
  }
}

export default App;
