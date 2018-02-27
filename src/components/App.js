import React, {Component} from 'react';
import {Grid, Container, Header, Dropdown} from 'semantic-ui-react';

import ExchangeRatesList from './ExchangeRatesList';
import HistoricalRate from './HistoricalRate';
import CurrencyConverter from "./CurrencyConverter";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedCurrency: 'EUR',
      historicalRate: '',
      rates: []
    };
  }

  componentDidMount() {
    this.getLatestRates(this.state.selectedCurrency);
    this.getHistoricalRates(this.state.selectedCurrency);
  }

  currencyTypes() {
    let rateOptions = [];

    if (this.state.rates) {
      for (let key in this.state.rates) {
        rateOptions.push({
          key: key,
          text: key,
          value: key
        })
      }
    }

    return rateOptions;
  }

  fetchData() {
    this.getLatestRates();
    this.getHistoricalRates()
  }

  getLatestRates() {
    fetch(`https://api.fixer.io/latest?base=${this.state.selectedCurrency}`)
      .then(this.handleFetchErrors)
      .then(response => response.json())
      .then(json => {
        this.setState({
          rates: json['rates'],
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getHistoricalRates() {
    const date = "2000-06-16";
    const defaultHistoricalCurrency = 'USD';
    const selectedCurrency = this.state.selectedCurrency;

    fetch(
      `https://api.fixer.io/${date}?base=${defaultHistoricalCurrency}&symbols=${selectedCurrency}`
    )
      .then(this.handleFetchErrors)
      .then(response => response.json())
      .then(json => {
        this.setState({ historicalRate: json['rates'][this.state.selectedCurrency] });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleCurrencySelection = (event) => {
    const text = event.target.innerText;
    this.setState({selectedCurrency: text}, this.fetchData)
  };

  handleFetchErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response
  }

  render() {
    return <div className="App">
      <Container>
        <Header as="h1" textAlign="center">Exchange Rates</Header>
        <Grid columns={2}>
          <Grid.Row>
            {/* Left Column */}
            <Grid.Column>
              <Grid.Row><Grid.Column><Header as="h2" size="medium">
                Latest rates for {this.state.selectedCurrency}
              </Header></Grid.Column></Grid.Row>
              <br/>
              <Dropdown fluid selection
                        placeholder={this.state.selectedCurrency}
                        options={this.currencyTypes()}
                        onChange={this.handleCurrencySelection}
              />
              <br/>
              <ExchangeRatesList rates={this.state.rates}/>
            </Grid.Column>


            {/* Right column */}
            <Grid.Column>
              {/* Currency Converter */}
              <Grid.Row>
                <Grid.Column>
                  <Header as="h2" size="medium">
                    Currency converter
                  </Header>
                  <CurrencyConverter
                    selectedCurrency={this.state.selectedCurrency}
                    currencyTypes={this.currencyTypes()}
                    rates={this.state.rates}/>
                </Grid.Column>
              </Grid.Row>

              {/* Historical Rates*/}
              <br/> {/* rediculous this is necessary w/ this framework*/}
              <Grid.Row>
                <Grid.Column>
                  <Header as="h2" size="medium">
                    Rates for
                    {` USD to
                      ${this.state.selectedCurrency} for June 16, 2000:`}
                  </Header>
                  <HistoricalRate rate={this.state.historicalRate}/>

                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>;
  }
}

export default App;
