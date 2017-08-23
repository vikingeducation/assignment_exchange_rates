import React from "react";
import App from "../components/App";
import fetch from "node-fetch";

const FIXER_LATEST_PATH = `http://api.fixer.io/latest`;

class AppContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isFetching: true,
      latestRates: []
    };
  }

  async componentDidMount() {
    try {
      this.setState({
        isFetching: true
      });

      let response = await fetch(FIXER_LATEST_PATH);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      let json = await response.json();
      let latestRates = {
        base: json.base,
        date: json.date,
        rates: []
      };
      for (let country in json.rates) {
        latestRates.rates.push({ country, rate: json.rates[country] });
      }
      this.setState({
        isFetching: false,
        latestRates
      });
    } catch (err) {
      console.error(err);
      console.log("???????");
      this.setState({
        isFetching: false
      });
    }
  }

  render() {
    if (this.state.isFetching) return <p>Loading...</p>;
    return <App latestRates={this.state.latestRates} />;
  }
}

export default AppContainer;
