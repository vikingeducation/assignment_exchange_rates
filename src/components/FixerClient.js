import React from "react"

class FixerClient extends React.Component {

  constructor(){
    super()
    this.key = process.env.REACT_APP_API_KEY
    this.base_uri = `http://data.fixer.io/api`
    this.convertFrom = 'USD'
    this.convertTo = 'EUR'
    this.convertAmount = '0'
    this.historicalDate = '2013-03-16'
  }

  getLatestRates = () => {
    const uri = `${this.base_uri}/latest?access_key=${this.key}&symbols=USD,AUD,CAD,PLN,MXN&format=1`
    console.log(uri)
  }

  getHistoricalRate = () => {
    const uri = `${this.base_uri}http://data.fixer.io/api/${this.historicalDate}?access_key=${this.key}&symbols=USD,AUD,CAD,PLN,MXN&format=1`
    console.log(uri)
  }

  getConversionAmount = () => {
    const uri = `${this.base_uri}/convert?access_key=${this.key}&from=${this.convertFrom}&to=${this.convertTo}&amount=${this.convertAmount}&format=1`
    console.log(uri)
  }

  render(){
    this.getLatestRates()
    return (
      <React.Fragment>
        <p>FixerClient</p>
      </React.Fragment>
    )
  }
}

export default FixerClient
