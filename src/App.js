import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DisplayRates from "./displayExchangeRates";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rates: [],
      historicalRates: [],
      currentCurrency: "EUR",
      comparisonCurrency: "USD"
    };
  }

  historicalRate = e => {
    e.preventDefault();
    const hist = e.target.historicalCurrency.value.toUpperCase();
    let newUrl =
      "http://api.fixer.io/2000-01-03?base=" +
      this.state.currentCurrency +
      "&symbols=" +
      hist;
    let historicalData = [];
    fetch(newUrl)
      .then(response => {
        console.log("got a response");
        return response.json();
      })
      .then(json => {
        console.log(json.rates);
        if (json.rates) {
          let newObj = {
            currency: json.date,
            value: json.rates[hist]
          };
          historicalData.push(newObj);
        }
        let newUrl =
          "http://api.fixer.io/2001-01-03?base=" +
          this.state.currentCurrency +
          "&symbols=" +
          hist;
        return fetch(newUrl);
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.rates) {
          let newObj = {
            currency: json.date,
            value: json.rates[hist]
          };
          historicalData.push(newObj);
        }
        let newUrl =
          "http://api.fixer.io/2002-01-03?base=" +
          this.state.currentCurrency +
          "&symbols=" +
          hist;
        return fetch(newUrl);
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.rates) {
          let newObj = {
            currency: json.date,
            value: json.rates[hist]
          };
          historicalData.push(newObj);
        }

        if (historicalData.length) {
          this.setState({
            historicalRates: historicalData,
            historicalCurrency: hist
          });
        }
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
        <form
          onSubmit={e => {
            this.historicalRate(e);
          }}
        >
          <input type="text" name="historicalCurrency" />
          <button>Historical Rates</button>
        </form>
        <h3>
          Current Currency: {this.state.currentCurrency}
        </h3>
        <div className="row">
          <div className="col-xs-6">
            <DisplayRates rates={this.state.rates} />
          </div>
          <div className="col-xs-6">
            <DisplayRates rates={this.state.historicalRates} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
