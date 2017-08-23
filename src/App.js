import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DisplayRates from "./displayExchangeRates";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rates: []
    };
  }
  changeParentCurrency = e => {
    console.log(e);
    let newUrl =
      "http://api.fixer.io/latest?base=" + e.body.mainCurrency.toUpperCase();
    fetch(newUrl)
      .then(response => {
        return response.json();
      })
      .then(json => {
        const ratesArray = Object.entries(json.rates).map(item => {
          return {
            currency: item[0],
            value: item[1]
          };
        });

        this.setState({ rates: ratesArray });
      });
  };
  componentDidMount() {
    fetch("http://api.fixer.io/latest")
      .then(response => {
        return response.json();
      })
      .then(json => {
        const ratesArray = Object.entries(json.rates).map(item => {
          return {
            currency: item[0],
            value: item[1]
          };
        });

        this.setState({ rates: ratesArray });
      });
  }

  render() {
    return (
      <div className="App">
        <form
          onSubmit={e => {
            console.log(e.target);
            this.changeParentCurrency(e);
          }}
        >
          <input type="text" />
          <button name="mainCurrency">Change Currency</button>
        </form>
        <DisplayRates rates={this.state.rates} />
      </div>
    );
  }
}

export default App;
