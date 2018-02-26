import React, {Component} from 'react';
import {Grid, Container, Header, Dropdown} from 'semantic-ui-react';

import ExchangeRatesList from './ExchangeRatesList';
import {eur_exchange_rates} from "../fixtures/all_exchange_rates_base_eur";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedCurrency: 'EUR',
      rates: []
    };
  }

  componentDidMount() {
    const exchangeRates = eur_exchange_rates['rates'];
    this.setState({
      rates: exchangeRates,
    });
  }

  currencyTypes() {
    let rateOptions = [];

    if (this.state.rates) {
      for(let key in this.state.rates) {
        rateOptions.push({
          key: key,
          text: key,
          value: key
        })
      }
    }

    return rateOptions;
  }

  render() {
    return (
      <div className="App">
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
                          // onChange={this.onFilterSelection}
                />
                <br/>
                <ExchangeRatesList rates={this.state.rates}/>
              </Grid.Column>


              {/* Right column */}
              <Grid.Column>
                {/* Currency Converter */}
                <Grid.Row></Grid.Row>


                {/* Historical Rates*/}
                <Grid.Row></Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }

  selectable
}

export default App;
