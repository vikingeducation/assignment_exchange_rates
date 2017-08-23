import React from "react";
import App from "../components/App";
import fetch from "node-fetch";

const FIXER_BASE_PATH = "http://api.fixer.io/";
const FIXER_LATEST_PATH = FIXER_BASE_PATH + "latest";

class AppContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isFetching: true,
      latestRates: []
    };
  }
  componentDidMount() {
    this.getLatest("EUR");
  }

  getHistorical = async (dates, comparison) => {
    if (
      !dates ||
      !array.isArray(dates) ||
      dates.length === 0 ||
      !base ||
      !comparison
    )
      return;

    let promises = [];
    dates.forEach(date => {
      promises.push(
        fetch(FIXER_BASE_PATH + date + `?base=${base}&symbols=${comparison}`)
      );
    });
    let exchangeByDate = await Promise.all(promises);
    exchangeByDate = await Promise.all(
      exchangeByDate.map(response => response.json())
    );
  };

  getLatest = async base => {
    if (!base) return;
    try {
      this.setState({
        isFetching: true
      });

      let latestPath = FIXER_LATEST_PATH + `?base=${base}`;
      let response = await fetch(latestPath);
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
      this.setState({
        isFetching: false
      });
    }
  };

  render() {
    if (this.state.isFetching) return <p>Loading...</p>;
    return (
      <App getLatest={this.getLatest} latestRates={this.state.latestRates} />
    );
  }
}

export default AppContainer;
