import React from "react"

class Header extends React.Component {
  render(){
    return (
      <React.Fragment>
        <h1>Currency Rate App</h1>
        <p>Enter Euros and get back the rates for other currencies.</p>
      </React.Fragment>
    )
  }
}

export default Header
