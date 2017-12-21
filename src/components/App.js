import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";

//custom elements
import Button from "./elements/Button";

//node modules
import serialize from "form-serialize"; //this ones for the form

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

const SelectCurrency = ({ratesObj, callback}) => {
  let rates = ratesObj.rates;
  let arrOfKeys = Object.keys(rates);

  return (
    <form name="currencyForm" onSubmit={callback}>
      <select name="chosenCurrency" name="currencyForm">
        {arrOfKeys.map(key => {
          return <option value={key} key={key}>{key}</option>;
        })}
      </select>
      <input text="submit" type="submit"/>
    </form>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {};
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

  changeCurrency = e => {
    e.preventDefault;
    const form = e.target;
    const body = serialize(form, {hash: true});
    console.log(form);
    console.log(body);

    // // Create headers to set the content type to json
    // const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    //
    // // Set options, and stringify the body to JSON
    // const options = {
    //   headers,
    //   method: "POST",
    //   body: JSON.stringify(body)
    // };
    //
    // // Before performing the fetch, set isFetching to true
    // this.setState({isFetching: true});
    //
    // fetch("https://reqres.in/api/users?delay=3", options)
    //   .then(response => {
    //     // If response not okay, throw an error
    //     if (!response.ok) {
    //       throw new Error(`${response.status} ${response.statusText}`);
    //     }
    //
    //     // Otherwise, extract the response into json
    //     return response.json();
    //   })
    //   .then(json => {
    //     // Update the user list and isFetching.
    //     // Reset the form in a callback after state is set.
    //     this.setState(
    //       {
    //         isFetching: false,
    //         users: [...this.state.users, json]
    //       },
    //       () => {
    //         form.reset();
    //       }
    //     );
    //   })
    //   .catch(error => {
    //     // Set error in state & log to console
    //     console.log(error);
    //     this.setState({
    //       isFetching: false,
    //       error
    //     });
    //   });
  };

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
            <ul className="nav navbar-nav navbar-inverse" />
          </div>
        </nav>

        <div className="container">
          {this.state.ratesObj ? (
            <div>
              <ExchangeList ratesObj={this.state.ratesObj} />
              <SelectCurrency
                ratesObj={this.state.ratesObj}
                callback={this.changeCurrency}
              />
            </div>
          ) : (
            <div> Loading ... </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
