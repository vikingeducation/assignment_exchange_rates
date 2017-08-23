import React, { Component } from 'react';
import './App.css';
import Table from "./Table";

class App extends Component {
  constructor() {
    super();

    this.state = {
      tableData: {}
    }
  }

  componentDidMount() {

    fetch('http://api.fixer.io/latest', {method: 'GET'})
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      this.setState({tableData: json})
    })
  }


  render() {
    const {tableData} = this.state

    return (
      <div className="App container">
        <div className="App-header">
          <h2>Welcome to Our Currency Converter</h2>
        </div>
        <Table tableData={tableData} />
      </div>
    );
  }
}

export default App;
