import React from "react";
import JumbotronFluid from "./elements/JumbotronFluid";
import Alert from "./elements/Alert";
import Showable from "./elements/Showable";
import ExchangeRates from "./ExchangeRates";

const App = ({ error, rates }) =>
  <div className="container">
    <JumbotronFluid heading="xChange Rates" lead="Use ALL THE MONEY" />
    <Showable show={error}>
      <Alert type="danger">Oops, there was a problem...</Alert>
    </Showable>
    <div className="col-sm-4">
      <ExchangeRates rates={rates} />
    </div>
  </div>;

export default App;
