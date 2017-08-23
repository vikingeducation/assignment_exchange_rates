import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Landing from '../Landing'
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state={
      rates: {}
    }
  }
  componentDidMount() {
     this.getLatestRates() 
  }

  getLatestRates = ()=>{
    const self=this
    axios.get('http://api.fixer.io/latest')
    .then(function (response) {
     // const latestRates=response.data.rates
      console.log("response.data", response.data.rates)
      self.setState({
        rates: response.data.rates
      })
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    console.log("State", this.state)
    return (
      <div className="App">
       <Landing />
      </div>
    );
  }
}

export default App;
