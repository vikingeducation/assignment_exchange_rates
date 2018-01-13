import React, { Component } from 'react';
import FormConverter from './FormConverter'
import TableHistorical from './TableHistorical'
import TableTodays from './TableTodays'

// Latest Exchange Rates (for eur)
//
// Select currency default_currency (for the default currency & choosen)
// output_result
//
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
      latestRates: {}
    }

  }

  componentDidMount() {
    this.setState({isFetching: true})
    fetch('https://api.fixer.io/latest')
    .then( (response) => response.json())
    .then((json) => {
      this.setState({
        isFetching: false,
        latestRates: json.rates
      })
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

            <h2 className="text-center">Historical Rates</h2>
            <TableHistorical />

          </div>
          <div className="col">
            <h2 className="text-center">Current Rates of Exchange</h2>
            <TableTodays
              {...this.state}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
