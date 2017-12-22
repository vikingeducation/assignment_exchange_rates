import React, { Component } from 'react';
import InfoSection from './elements/InfoSection';
import CurrentRateList from './CurrentRateList';

class App extends Component {
  constructor() {
    super();
    this.state ={
      isFetching: false,
    };
  }

  componentDidMount() {
    this.setState({isFetching: true});

    fetch('https://api.fixer.io/latest')
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        this.setState({ isFetching: false, currentRates: json });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isFetching: false, error });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="text-center">Exchange Rates</h1>
        </header>
        <div className="container">
          <div className="row justify-content-left">
            <InfoSection title="Current Exchange Rates" col='8'>
              <CurrentRateList currentRates={this.state.currentRates} isFetching={this.state.isFetching} />
            </InfoSection>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
