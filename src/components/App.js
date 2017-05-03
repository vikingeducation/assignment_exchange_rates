import React, { Component } from "react";
import "../App.css";
import ExchangeRates from "./ExchangeRates";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });

    // After component mounts, call the API to get the
    // users, then update state which triggers re-render.
    // Add a delay to the URL and reset isFetching upon
    // completion of the request.
    fetch("http://api.fixer.io/latest")
      .then(response => response.json())
      .then(json => {
        console.log(json.rates.USD);
        this.setState({
          rates: json,
          isFetching: false
        });
      });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Currency Converter</h2>
        </div>
        <ExchangeRates
          rates={this.state.rates}
          isFetching={this.state.isFetching}
        />
      </div>
    );
  }
}

export default App;
