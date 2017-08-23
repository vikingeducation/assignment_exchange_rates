import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import Landing from "../Landing";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rates: {}
    };
  }
  componentDidMount() {
    this._getLatestRates();
  }

  changeBaseRate = currency => {
    const self = this;
    axios
      .get(`http://api.fixer.io/latest?base=${currency}`)
      .then(function(response) {
        self.setState({
          rates: response.data.rates
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
    const { rates } = this.state;
    return (
      <div className="App">
        <Landing rates={rates} changeBaseRate={this.changeBaseRate} />
      </div>
    );
  }
}

export default App;
