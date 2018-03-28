import React, {Component} from 'react';
import {Grid, Container, Header, Dropdown} from 'semantic-ui-react';

import ExchangeRatesList from './ExchangeRatesList';
import HistoricalRate from './HistoricalRate';
import CurrencyConverter from "./CurrencyConverter";

class App extends Component {
  constructor() {
    super();
    this.state = {
      baseCurrency: 'EUR',
      historicalRate: '',
      rates: []
    };
  }

  componentDidMount() {
    this.getLatestRates();
    this.getHistoricalRates();
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
    fetch(`https://api.fixer.io/latest?base=${this.state.baseCurrency}`)
      .then(this.handleFetchErrors)
      .then(response => response.json())
      .then(json => {
        this.setState({
          rates: json.rates,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getHistoricalRates() {
    const date = "2000-06-16";
    const defaultHistoricalCurrency = 'USD';
    const base = this.state.baseCurrency;

    fetch(
      `https://api.fixer.io/${date}?base=${defaultHistoricalCurrency}&symbols=${base}`
    )
      .then(this.handleFetchErrors)
      .then(response => response.json())
      .then(json => {
        this.setState({ historicalRate: json.rates[this.state.baseCurrency] });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleCurrencySelection = (event) => {
    const text = event.target.innerText;
    this.setState({ baseCurrency: text }, this.fetchData)
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
        <div className="code-link">
          <a href="https://github.com/SeanLuckett/assignment_exchange_rates"
             target="_blank"
             rel="noopener noreferrer">
            See the code
          </a>
        </div>

        <Header as="h1" textAlign="center">Exchange Rates</Header>

        <Grid columns={2}>
          <Grid.Row>
            {/* Left Column */}
            <Grid.Column>
              <Grid.Row><Grid.Column><Header as="h2" size="medium">
                Latest rates for {this.state.baseCurrency}
              </Header></Grid.Column></Grid.Row>
              <br/>
              <Dropdown fluid selection
                        placeholder={this.state.baseCurrency}
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
                    currencyTypes={this.currencyTypes()}/>
                </Grid.Column>
              </Grid.Row>

              {/* Historical Rates*/}
              <br/> {/* rediculous this is necessary w/ this framework*/}
              <Grid.Row>
                <Grid.Column>
                  <Header as="h2" size="medium">
                    Rates for
                    {` USD to
                      ${this.state.baseCurrency} for June 16, 2000:`}
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
