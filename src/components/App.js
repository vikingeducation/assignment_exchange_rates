import React, { Component } from 'react';
import '../App.css';
import Header from './Header'
import Form from './Form'
import CurrentRates from './CurrentRates'
import CurrencyConversion from './CurrencyConversion'

class App extends Component {
  constructor(){
    super()
    this.state = {
      rates: false,
      inputAmount: 0
    }
  }

  setRates = (data) => {
    const {USD, AUD, CAD, PLN, MXN} = data
    this.setState({
      rates: {
        USD: USD,
        AUD: AUD,
        CAD: CAD,
        PLN: PLN,
        MXN: MXN
      }
    })
  }

  setInputAmount = (input) => {
    this.setState({
      inputAmount: input
    })
  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-sm-12">
            <Header />
            <Form setRates={this.setRates} setInputAmount={this.setInputAmount}/>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            { this.state.rates ? <CurrencyConversion rates={this.state.rates} inputAmount={this.state.inputAmount} /> : "" }
          </div>

          <div className="col-sm-6">
            { this.state.rates ? <CurrentRates rates={this.state.rates} /> : "" }
          </div>
        </div>

      </div>
    );
  }
}

export default App;
