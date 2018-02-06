import React, {Component} from 'react';
import {Grid, Container, Header, Segment} from 'semantic-ui-react';

import ExchangeRatesList from './ExchangeRatesList';
import {eur_exchange_rates} from "../fixtures/all_exchange_rates_base_eur";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Header as="h1" textAlign="centered">Exchange Rates</Header>
          <Grid columns={2}>
            {/* Left Column */}
            <Grid.Column>
              <ExchangeRatesList rates={eur_exchange_rates['rates']}/>
            </Grid.Column>


            {/* Right column */}
            <Grid.Column>
              {/* Currency Converter */}
              <Grid.Row></Grid.Row>


              {/* Historical Rates*/}
              <Grid.Row></Grid.Row>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
