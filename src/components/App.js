import React from "react";
import JumbotronFluid from "./elements/JumbotronFluid";
import Alert from "./elements/Alert";
import Showable from "./elements/Showable";
import ExchangeRates from "./ExchangeRates";

const App = ({ error, rates }) =>
  <div>
    <Showable show={error}>
      <Alert type="danger">Oops, there was a problem...</Alert>
    </Showable>
    <JumbotronFluid heading="xChange Rates" lead="Use ALL THE MONEY" />
    <ExchangeRates rates={rates} />
  </div>;

export default App;
