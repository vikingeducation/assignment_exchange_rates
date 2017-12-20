import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";

const ExchangeList = ({ratesObj}) => {
  let rates = ratesObj.rates;
  let base = ratesObj.base;
  let arrOfKeys = Object.keys(rates);

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        {arrOfKeys.map(key => {
          return <ExchangeRow currency={key} rate={rates[key]} base={base} />;
        })}
      </div>
    </div>
  );
};

const ExchangeRow = ({currency, rate, base}) => {
  return (
    <div className="exchangeRow row">
      <div className="col-md-6">1 {currency}</div>
      <div className="col-md-6">
        {rate} {base}
      </div>
    </div>
  );
};

const SelectCurrency = ({callback}) => {
  return (
    <form> 
      
      <input type="text" className="text" value="" name="">
    </form>
  
  );
}


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  changeCurrency = (e) => {
    let form = e.target;


  }

  componentDidMount() {
    // Create headers to set the content type to json
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    // Set options, and stringify the body to JSON
    const options = {
      headers,
      method: "GET"
    };

    fetch("https://api.fixer.io/latest?base=USD", options)
      .then(response => {
        // If response not okay, throw an error
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        // Otherwise, extract the response into json
        return response.json();
      })
      .then(json =>
        this.setState({
          ratesObj: json
        })
      );
  }

  render() {
    return (
      <div className="App">

        <nav role="navigation" className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                Currency Exchange 
              </a>
            </div>
            <ul className="nav navbar-nav navbar-inverse">
            </ul>
          </div>
        </nav>

        <div className="container">
          {this.state.ratesObj ? (
            <ExchangeList ratesObj={this.state.ratesObj} />
          ) : (
            <div> Loading ... </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
