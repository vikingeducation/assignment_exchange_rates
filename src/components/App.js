import React from "react";
import JumbotronFluid from "./elements/JumbotronFluid";
import Alert from "./elements/Alert";
import Showable from "./elements/Showable";
import ExchangeRates from "./ExchangeRates";
import Select from "./elements/Select";

const App = ({
  error,
  rates,
  handlers,
  selectedCurrency,
  selectedCompareCurrency,
  comparedRates
}) =>
  <div className="container">
    <JumbotronFluid heading="xChange Rates" lead="Use ALL THE MONEY" />
    <Showable show={error}>
      <Alert type="danger">Oops, there was a problem...</Alert>
    </Showable>
    <div className="col-sm-4">
      <h3>Select a Currency</h3>
      <Select
        options={rates.map(rate => rate.Country)}
        onChange={handlers.selectCurrency}
        value={selectedCurrency}
      />
      <ExchangeRates rates={rates} headers={["Country", "Rate"]} />
    </div>
    <div className="col-sm-4">
      <h3>Compare it to another currency, Across THE SPAN OF TIME</h3>
      <Select
        options={rates.map(rate => rate.Country)}
        onChange={handlers.selectCompareCurrency}
        value={selectedCompareCurrency}
      />
      <ExchangeRates rates={comparedRates} headers={["Year", "Rate"]} />
    </div>
  </div>;

export default App;
