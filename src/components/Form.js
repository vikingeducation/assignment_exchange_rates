import React from "react"

class Form extends React.Component {
  constructor(){
    super()
    this.key = process.env.REACT_APP_API_KEY
    this.base_uri = `http://data.fixer.io/api`
  }
  inputRef = React.createRef()

  getLatestRates = (e) => {
    e.preventDefault()

    const uri = `${this.base_uri}/latest?access_key=${this.key}&symbols=USD,AUD,CAD,PLN,MXN&format=1`

    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        const inputAmt = this.inputRef.current.value
        this.props.setRates(json.rates)
        this.props.setInputAmount(inputAmt)
      })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.getLatestRates()
  }

  render(){
    return (
      <React.Fragment>
        <form onSubmit={this.getLatestRates} className="mb-5">
        <div className="row">
          <div className="col-sm-8 mt-2">
            <input type="number" placeholder="Enter Euro Amount" className="form-control" ref={this.inputRef}/>
            </div>
          <div className="col-sm-4 mt-2">
            <button className="btn btn-xs btn-info">Get Latest Rates</button>
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

export default Form
