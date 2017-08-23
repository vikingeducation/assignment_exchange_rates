import React, { Component } from "react";
import Latest from "./Latest";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Latest latestRates={this.props.latestRates} />
      </div>
    );
  }
}

export default App;
