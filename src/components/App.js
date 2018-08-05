import React, { Component } from 'react';
import InfoSection from './elements/InfoSection';
import CurrentRateList from './CurrentRateList';
import HistoricalRatesList from './HistoricalRatesList';
import ConversionForm from './ConversionForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="text-center">Exchange Rates</h1>
        </header>
        <div className="card-columns container">

          <InfoSection title="Current Rates" cardClass="CurrentRateCard">
            <CurrentRateList />
          </InfoSection>

          <InfoSection title="Quick Convert">
            <ConversionForm />
          </InfoSection>

          <InfoSection title="Historical Rates">
            <HistoricalRatesList />
          </InfoSection>

        </div>
      </div>
    );
  }
}

export default App;
