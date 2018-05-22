import React, { Component } from 'react';
import '../App.css';
import FixerClient from './FixerClient'
import Header from './Header'
import Form from './Form'
import CurrencyRates from './CurrencyRates'

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
        Hello World
        <FixerClient />
        <Header />
        <Form />
        { this.state.rates ? <CurrencyRates data={this.state.rates}/> : "" }
      </div>
    );
  }
}

export default App;
