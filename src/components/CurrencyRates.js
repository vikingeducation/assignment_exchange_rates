import React from "react"

class CurrencyRates extends React.Component {
  render(){
    const {USD, AUD, CAD, PLN, MXN} = this.props.data
    return (
      <React.Fragment>
        <hr/>
        <h2>Currency Rates</h2>
        <p><strong>USD:</strong> {USD}</p>
        <p><strong>AUD:</strong> {AUD}</p>
        <p><strong>CAD:</strong> {CAD}</p>
        <p><strong>PLN:</strong> {PLN}</p>
        <p><strong>MXN:</strong> {MXN}</p>
      </React.Fragment>
    )
  }
}

export default CurrencyRates
