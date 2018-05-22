import React, { Component } from 'react';
import '../App.css';
import Header from './Header'
import Form from './Form'
import CurrentRates from './CurrentRates'

class App extends Component {
  constructor(){
    super()
    this.state.rates = false
    // this.rates = {
    //   USD: 1.307716,
    //   AUD: 1.256333,
    //   CAD: 1.333812,
    //   PLN: 4.150819,
    //   MXN: 16.259128
    // }
  }
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <Form />
        { this.state.rates ? <CurrencyRates data={this.state.rates}/> : "" }
            { this.state.rates ? <CurrentRates rates={this.state.rates} /> : "" }
      </div>
    );
  }
}

export default App;
