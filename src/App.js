import React, {Component} from "react";
import "./App.css";
import TableContainer from "./TableContainer";
import Options from "./Options";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
      currentDate: (new Date().toISOString()).split("T")[0],
      historicalOptions: ["current", "historical"],
      tableData: [{}]
    };
  }

  componentDidMount() {
    this.getExchangeRates();
  }

  getExchangeRates = (base = "EUR") => {
    fetch(`http://api.fixer.io/latest?base=${base}`, {method: "GET"}).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      this.setState({
        tableData: [json],
        currencies: Object.keys(json.rates)
      });
    });
  };

  getHistoricalRates = (date = Date.now()) => {

  }



  onBaseChange = e => {
    const target = e.target;
    this.getExchangeRates(target.value);
  };

  // onDateChange = e => {
  //   const target = e.target;
  //
  // }

  render() {
    const {tableData, currencies, currentDate} = this.state;

    return (
      <div className="App container">
        <div className="App-header">
          <h2>Welcome to Our Currency Converter</h2>
        </div>
        <Options dataOptions={currencies} handler={this.onBaseChange}/>
        <Options dataOptions={currentDate} handler= />
        <TableContainer tableData={tableData}/>

      </div>
    );
  }
}

export default App;
