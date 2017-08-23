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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <DisplayRates rates={this.state.rates} />
      </div>
    );
  }
}

export default App;
