import React, { Component } from 'react';
import FormConverter from './FormConverter'
import TableHistorical from './TableHistorical'
import TableTodays from './TableTodays'
import {getRatesNames} from './helpers/conversion'

// Historical Rates - choose currency1, currency2, how_far_back, monthly or yearly, output is table with the same day for every month or year and the rate



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
      conversionRate: '',
      currency1: '',
      currency2: '',
      startDate: '',
      historicalRates: {}
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
        currencyOptions: getRatesNames(json.rates)
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

  // getConversionRate = (inputCurrency, outputCurrency) => {
  //   fetch(`https://api.fixer.io/latest?base=${inputCurrency}?symbols=${outputCurrency}`)
  //   .then( (response) => response.json())
  //   .then((json) => {
  //     this.setState({
  //       isFetching: false,
  //       inputCurrency: inputCurrency,
  //       outputCurrency: outputCurrency,
  //       conversionRate: json.rates[outputCurrency]
  //     })
  //   })
  // }

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, ()=> {
      if (!this.state.inputCurrency || !this.state.outputCurrency || !this.state.inputAmount) {
        return null
      }
      if ( this.state.inputCurrency === this.state.outputCurrency) {
        this.setState({
          isFetching: false,
          conversionRate: '1'
        })
        return
      }
      this.setState({isFetching: true})
      fetch(`https://api.fixer.io/latest?base=${this.state.inputCurrency}`)
      .then( (response) => response.json())
      .then((json) => {
        this.setState({
          isFetching: false,
          conversionRate: json.rates[this.state.outputCurrency]
        })
      })

    })

  }

  onChangeHistoryInput = (e) => {

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
              onChangeInput={this.onChangeInput}
              {...this.state}
            />
            <h2 className="text-center">Historical Rates</h2>
            <h5 className="text-center">Check the rate on the same day for the past number of months/years</h5>
            <TableHistorical
              onChangeHistoryInput={this.onChangeHistory}
              {...this.state}
            />

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
