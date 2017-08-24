import React, { Component } from "react";
import "./App.css";
import TableContainer from "./TableContainer";
import Options from "./Options";
import Input from "./Input";

class App extends Component {
  constructor() {
    super();

    const date = new Date().toISOString().split("T")[0];
    const dateObject = {
      year: date.slice(0, 4),
      monthDay: date.slice(4)
    };

    this.state = {
      currencies: [],
      currentDate: dateObject,
      historicalOptions: ["Current", "Historical"],
      historyScope: 6,
      tableData: [{ date: 1 }],
      currentBase: "EUR",
      currentHistorical: "Current",
      outputCurrency: "",
      inputAmount: 1
    };
  }

  componentDidMount() {
    this.gatherExchangeRates();
  }

  gatherExchangeRates() {
    const date = this.state.currentDate;
    const base = this.state.currentBase;
    const input = this.state.inputAmount;
    const output = this.state.outputCurrency;
    const historyScope =
      this.state.currentHistorical === "Current" ? 1 : this.state.historyScope;
    Promise.all(
      Array(historyScope).fill([]).map((_, i) => date.year * 1 - i).map(year =>
        fetch(`https://api.fixer.io/${year}${date.monthDay}?base=${base}`, {
          method: "GET"
        }).then(res => res.json())
      )
    ).then(data => {
      const currencies = Object.keys(data[0].rates);
      if (output.length) {
        data.forEach(el => (el.rates = { [output]: el.rates[output] }));
      }
      data.forEach(el =>
        Object.keys(el.rates).forEach(k => (el.rates[k] = el.rates[k] * input))
      );
      this.setState({
        tableData: data,
        currencies: currencies
      });
    });
  }

  changeState = e => {
    const values = e.target.value.split("=");
    if (values.length < 2) {
      return this.setState({ inputAmount: values[0] }, () => {
        this.gatherExchangeRates();
      });
    }
    return this.setState({ [values[0]]: values[1] }, () => {
      this.gatherExchangeRates();
    });
  };

  render() {
    const { inputAmount, currencies, historicalOptions } = this.state;

    currencies.unshift("");

    return (
      <div className="App container">
        <div className="App-header">
          <h2>Welcome to Our Currency Converter</h2>
        </div>
        <Options
          label={"Input Currency"}
          stateKey={"currentBase"}
          dataOptions={currencies}
          handler={this.changeState}
        />
        <Options
          label={"Output Currency"}
          stateKey={"outputCurrency"}
          dataOptions={currencies}
          handler={this.changeState}
        />
        <Options
          label={"Time Frame"}
          stateKey={"currentHistorical"}
          dataOptions={historicalOptions}
          handler={this.changeState}
        />
        <Input
          label={"Input Amount"}
          stateKey={inputAmount}
          handler={this.changeState}
        />
        <TableContainer {...this.state} />
      </div>
    );
  }
}

export default App;
