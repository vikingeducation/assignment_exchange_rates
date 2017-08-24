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
      latestRates: [],
      base: "EUR",
      comp: "AUD",
      selection: "all"
    };
  }
  componentDidMount() {
    this.getLatest();
  }

  changeBase = newBase => {
    this.setState({
      base: newBase
    });
  };

  changeSelection = newSelection => {
    this.setState({
      selection: newSelection
    });
  };

  changeComparison = newComparison => {
    this.setState({
      comp: newComparison
    });
  };

  getData = () => {
    if (
      this.state.selection === "all" ||
      this.state.selection === "historicals"
    ) {
      this.getLatest();
    } else if (this.state.selection === "current") {
      this.getCurrent();
    } else {
      return;
    }
  };

  getCurrent = async () => {
    try {
      this.setState({
        isFetching: true
      });

      let response = await fetch(
        `${FIXER_LATEST_PATH}?base=${this.state.base}&symbols=${this.state
          .comp}`
      );
      let json = await response.json();
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      let latestRates = {
        base: json.base,
        date: json.date,
        rates: []
      };
      let obj = { country: this.state.comp, rate: json.rates[this.state.comp] };
      latestRates.rates.push(obj);
      console.log(latestRates);
      this.setState({
        isFetching: false,
        latestRates
      });
    } catch (err) {
      console.log(err);
      this.setState({
        isFetching: false
      });
    }
  };

  getHistorical = async (dates, base = "EUR", comparison = "AUD") => {
    if (
      !dates ||
      !Array.isArray(dates) ||
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
    return await Promise.all(exchangeByDate.map(response => response.json()));
  };

  getLatest = async () => {
    if (!this.state.base) return;
    try {
      this.setState({
        isFetching: true
      });

      let latestPath = FIXER_LATEST_PATH + `?base=${this.state.base}`;
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
        let obj = { country, rate: json.rates[country] };
        if (country === this.state.comp) {
          let historicals = [];
          let date = new Date(latestRates.date);
          for (let i = 0; i < 3; i++) {
            date.setFullYear(date.getFullYear() - 1);
            historicals.push(new Date(date).toJSON().slice(0, 10));
          }
          obj.historicals = await this.getHistorical(
            historicals,
            this.state.base,
            this.state.comp
          );
        }
        latestRates.rates.push(obj);
        console.log(latestRates);
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
    if (this.state.isFetching)
      return <h1 className="text-center loading">Loading Application...</h1>;
    return (
      <App
        base={this.state.base}
        comp={this.state.comp}
        getLatest={this.getLatest}
        changeBase={this.changeBase}
        changeComparison={this.changeComparison}
        changeSelection={this.changeSelection}
        getData={this.getData}
        latestRates={this.state.latestRates}
        selection={this.state.selection}
      />
    );
  }
}

export default AppContainer;
