import React, { Component } from 'react';
import '../App.css';
import FixerClient from './FixerClient'
import Header from './Header'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        Hello World
        <FixerClient />
        <Header />
      </div>
    );
  }
}

export default App;
