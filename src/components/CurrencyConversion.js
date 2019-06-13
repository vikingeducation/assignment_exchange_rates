import React from "react"

class CurrencyConversion extends React.Component {

  convertValues = (rate) => {
    return rate * this.props.inputAmount
  }

  render(){
    const inputAmount = this.props.inputAmount
    const {USD, AUD, CAD, PLN, MXN} = this.props.rates
    const convert = this.convertValues

    return (
      <React.Fragment>
        <h3>€{inputAmount} EUD Converts to:</h3>
        <p><strong>USD:</strong> ${convert(USD)}</p>
        <p><strong>AUD:</strong> ${convert(AUD)}</p>
        <p><strong>CAD:</strong> ${convert(CAD)}</p>
        <p><strong>PLN:</strong> zł {convert(PLN)}</p>
        <p><strong>MXN:</strong> ${convert(MXN)}</p>
      </React.Fragment>
    )
  }
}

export default CurrencyConversion
