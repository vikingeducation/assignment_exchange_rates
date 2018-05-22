import React from "react"

class CurrentRates extends React.Component {
  render(){
    const {USD, AUD, CAD, PLN, MXN} = this.props.rates
    return (
      <React.Fragment>
        <h3>Current Rates</h3>
        <p><strong>USD:</strong> €{USD} EUD</p>
        <p><strong>AUD:</strong> €{AUD} EUD</p>
        <p><strong>CAD:</strong> €{CAD} EUD</p>
        <p><strong>PLN:</strong> €{PLN} EUD</p>
        <p><strong>MXN:</strong> €{MXN} EUD</p>
      </React.Fragment>
    )
  }
}

export default CurrentRates
