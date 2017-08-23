import React from "react";
import JumbotronFluid from "./elements/JumbotronFluid";
import Alert from "./elements/Alert";
import Showable from "./elements/Showable";

const App = ({ error }) =>
  <div>
    <Showable show={error}>
      <Alert type="danger">Oops, there was a problem...</Alert>
    </Showable>
    <JumbotronFluid heading="xChange Rates" lead="Use ALL THE MONEY" />
  </div>;

export default App;
