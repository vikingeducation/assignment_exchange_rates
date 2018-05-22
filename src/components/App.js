import React, { Component } from 'react';
import '../App.css';
import FixerClient from './FixerClient'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        Hello World
        <FixerClient />
      </div>
    );
  }
}

export default App;
