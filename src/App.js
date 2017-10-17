import React, { Component } from "react";
import "./App.css";
import TableContainer from "./TableContainer";
import Options from "./Options";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currency: "AUD",
      currencyOptions: [],
      date: new Date(),
      dateYearOptions: new Array(5).fill(0).map((_, i) => 2017 - i),
      previousYears: 0,
      previousYearsOptions: new Array(5).fill(0).map((_, i) => i),
      tableData: [{}]
    };
  }

  componentDidMount() {
    this.getExchangeRates();
  }

  getExchangeRates = (
    currency = this.state.currency,
    date = this.state.date,
    previousYears = this.state.previousYears
  ) => {
    const years = Array(previousYears + 1)
      .fill(0)
      .map((_, i) => (date.getFullYear() - i).toString());

    const month =
      date.getMonth() > 9 ? date.getMonth().toString() : `0${date.getMonth()}`;

    const day =
      date.getDate() > 9 ? date.getDate().toString() : `0${date.getDate()}`;

    const promises = years.map(year =>
      fetch(`https://api.fixer.io/${year}-${month}-${day}?base=${currency}`, {
        method: "GET"
      }).then(r => r.json())
    );
    Promise.all(promises).then(results => {
      console.log(results);
      if (!this.state.currencyOptions.length) {
        this.setState({
          currencyOptions: ["AUD", ...Object.keys(results[0].rates)]
        });
      }

      this.setState({
        tableData: results
      });
    });
  };

  onCurrencyChange = e => {
    const target = e.target;
    this.setState({ currency: target.value }, () => this.getExchangeRates());
  };

  onDateChange = e => {
    const target = e.target;
    this.state.date.setFullYear(Number(target.value));
    this.setState({ date: this.state.date }, () => this.getExchangeRates());
  };

  onPreviousYearsChange = e => {
    const target = e.target;
    this.setState({ previousYears: Number(target.value) }, () =>
      this.getExchangeRates()
    );
  };

  render() {
    const {
      tableData,
      currencyOptions,
      dateYearOptions,
      previousYearsOptions
    } = this.state;

    return (
      <div className="App container">
        <div className="App-header">
          <h2>Welcome to Our Currency Converter</h2>
        </div>
        <Options
          label={"Currency Options: "}
          dataOptions={currencyOptions}
          handler={this.onCurrencyChange}
        />
        <Options
          label={"Year Options: "}
          dataOptions={dateYearOptions}
          handler={this.onDateChange}
        />
        <Options
          label={"Previous Years Options: "}
          dataOptions={previousYearsOptions}
          handler={this.onPreviousYearsChange}
        />
        <TableContainer tableData={tableData} />
      </div>
    );
  }
}

export default App;
