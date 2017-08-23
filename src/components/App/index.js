import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import Landing from "../Landing";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rates: {},
      currency: "AUD",
      historicRate: "USD"
    };
  }
  componentDidMount() {
    this._getLatestRates();
  }

  getHistoricRate = (e, element) => {
    const rate = e.target.value;
    const self = this;
    axios
      .get(`http://api.fixer.io/latest?base=${this.state.historicRate}`)
      

  
      .then(function(response) {
        self.setState({
          rates: response.data.rates,
          currency: rate
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  changeBaseRate = (e, element) => {
    const rate = e.target.value;
    const self = this;

    axios
      .get(`http://api.fixer.io/latest?base=${rate}`)
      .then(function(response) {
        self.setState({
          rates: response.data.rates,
          currency: rate
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  _getLatestRates = () => {
    const self = this;
    axios
      .get("http://api.fixer.io/latest")
      .then(function(response) {
        self.setState({
          rates: response.data.rates
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { rates, currency } = this.state;
    return (
      <div className="App">
        <Landing
          rates={rates}
          currency={currency}
          changeBaseRate={this.changeBaseRate}
          getHistoricRate={this.getHistoricRate}
        />
      </div>
    );
  }
}

export default App;
