import React, { Component } from "react";
import logo from "./logo.svg";
import JumbotronFluid from "./components/elements/JumbotronFluid";
import ExchangeRates from "./components/ExchangeRates";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           {/* <img src={logo} className="App-logo" alt="logo" /> */}
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <ExchangeRates />
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

const App = ({ rates, isFetching, error }) => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <ExchangeRates rates={rates} />
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
};

export default App;
