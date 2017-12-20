// components/App.js
import React from "react";
// Optionally add a reusable Jumbotron element
import JumbotronFluid from "./elements/JumbotronFluid";
import CurrencyList from "./CurrencyList";
import serialize from "form-serialize";

const App = ({ currencies, isFetching, error }) => (
  <div className="App">
    <JumbotronFluid
      heading="Foreign Exchange Rates"
      lead="Using Fixer.io for fetching exchange rates"
    />
    <CurrencyList currencies={currencies} isFetching={isFetching} />
  </div>
);

export default App;
