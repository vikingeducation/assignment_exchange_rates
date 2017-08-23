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

  getHistoricRate=(historicRate, rates)=>{
    const rate=rates
  }

  changeBaseRate = (e, element) => {
    e.persist()
    const self = this;
    axios
      .get(`http://api.fixer.io/latest?base=${e.target.value}`)
      .then(function(response) {
        self.setState({
          rates: response.data.rates,
          currency: e.target.value
        });
        console.log("App line 29, state: ", self.state)
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
        <Landing rates={rates}
        currency={currency}
        changeBaseRate={this.changeBaseRate} />
      </div>
    );
  }
}

export default App;
