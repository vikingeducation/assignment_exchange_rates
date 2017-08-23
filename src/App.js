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
      comparisonCurrency: "USD",
      lastExchange: 0
    };
  }
  exchangeRate = e => {
    e.preventDefault();
    let quantityToExchange = Number(e.target.quantity.value);

    let newUrl =
      "http://api.fixer.io/latest?base=" +
      this.state.currentCurrency +
      "&symbols=" +
      this.state.comparisonCurrency;
    fetch(newUrl)
      .then(response => {
        console.log("got a response");
        return response.json();
      })
      .then(json => {
        let newValue = (json.rates[this.state.comparisonCurrency] *
          quantityToExchange).toFixed(2);

        this.setState({ lastExchange: newValue });
      });
    e.target.reset();
  };
  historicalRate = e => {
    e.preventDefault();
    const hist =
      e.target.historicalCurrency.value.toUpperCase() ||
      this.state.comparisonCurrency;
    let date0 = e.target.date0.value || "2000-01-03";
    let date1 = e.target.date1.value || "2001-01-03";
    let date2 = e.target.date2.value || "2002-01-03";
    e.target.reset();
    let newUrl =
      "http://api.fixer.io/" +
      date0 +
      "?base=" +
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
          "http://api.fixer.io/" +
          date1 +
          "?base=" +
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
          "http://api.fixer.io/" +
          date2 +
          "?base=" +
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
            comparisonCurrency: hist,
            lastExchange: 0
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

          this.setState({
            rates: ratesArray,
            currentCurrency: currency,
            lastExchange: 0
          });
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
          <input type="date" name="date0" />
          <input type="date" name="date1" />
          <input type="date" name="date2" />
          <input type="text" name="historicalCurrency" />
          <button>Historical Rates</button>
        </form>
        <form
          onSubmit={e => {
            this.exchangeRate(e);
          }}
        >
          <input type="text" name="quantity" />
          <button>Exchange</button>
        </form>
        <h1>
          {this.state.lastExchange}
        </h1>
        <h3>
          Current Currency: {this.state.currentCurrency}
          Comparison Currency: {this.state.comparisonCurrency}
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
