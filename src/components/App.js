import React, { Component } from 'react';
import FormConverter from './FormConverter'
import TableHistorical from './TableHistorical'
import TableTodays from './TableTodays'
import {getConversionR} from './helpers/conversion'

// Historical Rates - choose currency1, currency2, how_far_back, monthly or yearly, output is table with the same day for every month or year and the rate
//
// Currency Converter
// input_amount
// input_currency
// output_currency
// output_result



class App extends Component {

  constructor() {
    super()
    this.state ={
      isFetching: false,
      latestRates: {},
      currencyOptions: [],
      baseCurrency: 'EUR',
      inputCurrency: '',
      outputCurrency: '',
      inputAmount: '',
      conversionRate: ''
    }


  }

  componentDidMount() {
    this.setState({isFetching: true})
    const baseCurrency = this.state.baseCurrency === 'EUR' ? '' : `?base=${this.state.baseCurrency}`
    fetch('https://api.fixer.io/latest' + baseCurrency)
    .then( (response) => response.json())
    .then((json) => {
      this.setState({
        isFetching: false,
        latestRates: json.rates,
        currencyOptions: Object.keys(json.rates)
      })
    })
  }

  onChangeToday = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    this.setState({isFetching: true})
    const newCurrency = e.target.value
    fetch('https://api.fixer.io/latest?base=' + newCurrency)
    .then( (response) => response.json())
    .then((json) => {
      this.setState({
        isFetching: false,
        latestRates: json.rates,
        currencyOptions: Object.keys(json.rates),
        baseCurrency: newCurrency
      })
    })
  }

  getConversionRate = (inputCurrency, outputCurrency) => {
    fetch(`https://api.fixer.io/latest?base=${inputCurrency}?symbols=${outputCurrency}`)
    .then( (response) => response.json())
    .then((json) => {
      this.setState({
        isFetching: false,
        inputCurrency: inputCurrency,
        outputCurrency: outputCurrency,
        conversionRate: json.rates[outputCurrency]
      })
    })
  }

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (!this.state.inputCurrency || !this.state.outputCurrency || !this.state.inputAmount) {
      return null
    }

      this.setState({
        conversionRate: getConversionR(this.state.inputCurrency, this.inputAmount, this.state.outputCurrency, this.state.latestRates)
      })
  }



  render() {
    return (
      <div className="container">
      <br />
      <h1 className="text-center">Exchange Rates Centre</h1>
      <br />
        <div className="row">
          <div className="col">
            <h2 className="text-center">Currency Converter</h2>
            <FormConverter
              getConversionRate={this.getConversionRate}
              onChangeInput={this.onChangeInput}
              {...this.state}
            />
            <h2 className="text-center">Historical Rates</h2>
            <TableHistorical />

          </div>
          <div className="col">
            <h2 className="text-center">Current Rates of Exchange</h2>
            <TableTodays
              onChangeToday={this.onChangeToday}
              {...this.state}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
