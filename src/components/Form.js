import React from "react"

class Form extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    console.log('clicky clicky')
  }
  render(){
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>Euros</label>
          <input type="number" placeholder="Euros" className="form-control"/>
          <button className="btn btn-xs btn-primary mt-2">Submit</button>
        </form>
      </React.Fragment>
    )
  }
}

export default Form
