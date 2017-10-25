import React, { Component } from "react";
import App from "../components/App";
import getSymbolFromCurrency from "currency-symbol-map";

let historicRates = function(
  currencyToConvert,
  currencyConverted,
  historicDate
) {
  let month = new Date(historicDate).getMonth();
  month++;
  let day = new Date(historicDate).getDate();
  if (day < 10) {
    day = 0 + day.toString();
  }

  let year = new Date(historicDate).getFullYear();
  return fetch(
    `http://api.fixer.io/${year}-${month}-${day}?base=${currencyToConvert.substr(
      0,
      3
    )}&symbols=${currencyConverted.substr(0, 3)}`
  )
    .then(response => response.json())
    .then(json => {
      let converted = json.rates[currencyConverted.substr(0, 3)];
      return converted;
    });
};

let pastThreeYears = async function(currToConvert, currConverted, todaysDate) {
  todaysDate = todaysDate.substr(5, 9) + "-" + todaysDate.substr(0, 4);
  let yearReduce = function(lastDate) {
    let lastYear = lastDate.substr(lastDate.length - 4, lastDate.length - 1);
    return lastDate.replace(lastYear, (Number(lastYear) - 1).toString());
  };

  let lastYearDate = yearReduce(todaysDate);
  let lastYear = await historicRates(
    currToConvert,
    currConverted,
    lastYearDate
  );

  let twoYearsAgoDate = yearReduce(lastYearDate);
  let twoYearsAgo = await historicRates(
    currToConvert,
    currConverted,
    twoYearsAgoDate
  );

  let threeYearsAgoDate = yearReduce(twoYearsAgoDate);
  let threeYearsAgo = await historicRates(
    currToConvert,
    currConverted,
    threeYearsAgoDate
  );
  return [lastYear, twoYearsAgo, threeYearsAgo];
};

class AppContainer extends Component {
  constructor() {
    super();

    // Initialize currency in state as an empty array and
    // set isFetching to false.
    this.state = {
      isFetching: false,
      currency: [],
      currToConvert: "",
      currConverted: "",
      converted: 0,
      convertedAmount: 1
    };
  }

  componentDidMount() {
    // Before performing the fetch, set isFetching to true
    this.setState({ isFetching: true });
    // After component mounts, call the API to get the
    // currencys, then update state which triggers re-render.
    fetch("http://api.fixer.io/latest")
      .then(response => response.json())
      .then(json => {
        //Currency List holds possibities from api
        let currencyList = ["EUR : " + getSymbolFromCurrency("EUR")];
        //Add symbols
        for (var x in json.rates) {
          currencyList.push(x + " : " + getSymbolFromCurrency(x));
        }
        //sort names alpha
        currencyList.sort(function(a, b) {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          return 0;
        });

        pastThreeYears(
          currencyList[8],
          currencyList[30],
          json.date
        ).then(pastYears => {
          this.setState({
            currency: currencyList,
            isFetching: false,
            currToConvert: currencyList[8],
            currConverted: currencyList[30],
            converted: json.rates[currencyList[30].substr(0, 3)],
            lastYearConverted: pastYears[0],
            twoYearsAgoConverted: pastYears[1],
            threeYearsAgoConverted: pastYears[2]
          });
        });
      });
  }

  onChangeInput = e => {
    let selectedCurr = this.state.currency[e.target.value];
    //Change 'USD : $' to 'USD' for api and indexing
    let currConvertedSub = this.state.currConverted.substr(0, 3);

    this.setState({ isFetching: true });

    fetch(
      `http://api.fixer.io/latest?base=${selectedCurr.substr(
        0,
        3
      )}&symbols=${currConvertedSub}`
    )
      .then(response => response.json())
      .then(json => {
        let converted = json.rates[currConvertedSub];
        pastThreeYears(
          selectedCurr,
          this.state.currConverted,
          json.date
        ).then(pastYears => {
          this.setState({
            isFetching: false,
            currToConvert: selectedCurr,
            converted: converted ? converted : 0,
            lastYearConverted: pastYears[0],
            twoYearsAgoConverted: pastYears[1],
            threeYearsAgoConverted: pastYears[2]
          });
        });
      });
  };

  onChangeOutput = e => {
    let selectedCurr = this.state.currency[e.target.value];
    this.setState({ isFetching: true });

    fetch(
      `http://api.fixer.io/latest?base=${this.state.currToConvert.substr(
        0,
        3
      )}&symbols=${selectedCurr.substr(0, 3)}`
    )
      .then(response => response.json())
      .then(json => {
        let converted = json.rates[selectedCurr.substr(0, 3)];
        pastThreeYears(
          this.state.currToConvert,
          selectedCurr,
          json.date
        ).then(pastYears => {
          this.setState({
            isFetching: false,
            currConverted: selectedCurr,
            converted: converted ? converted : 0,
            lastYearConverted: pastYears[0],
            twoYearsAgoConverted: pastYears[1],
            threeYearsAgoConverted: pastYears[2]
          });
        });
      });
  };

  onChangeAmount = e => {
    this.setState({
      convertedAmount: e.target.value
    });
  };

  render() {
    return (
      <App
        {...this.state}
        onChangeInput={this.onChangeInput}
        onChangeOutput={this.onChangeOutput}
        onChangeAmount={this.onChangeAmount}
      />
    );
  }
}

export default AppContainer;
