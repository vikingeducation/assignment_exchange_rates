import React, { Component } from "react";
import "./App.css";
import Table from "./Table";
import Options from "./Options";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
      tableData: {}
    };
  }

  componentDidMount() {
    this.getExchangeRates();
  }

  getExchangeRates = (base = "EUR") => {
    fetch(`http://api.fixer.io/latest?base=${base}`, { method: "GET" })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        this.setState({
          tableData: json,
          currencies: Object.keys(json.rates)
        });
      });
  };

  onBaseChange = e => {
    const target = e.target;
    this.getExchangeRates(target.value);
  };

  render() {
    const { tableData, currencies } = this.state;

    return (
      <div className="App container">
        <div className="App-header">
          <h2>Welcome to Our Currency Converter</h2>
        </div>
        <Options currencies={currencies} onBaseChange={this.onBaseChange} />
        <Table tableData={tableData} />
      </div>
    );
  }
}

export default App;
