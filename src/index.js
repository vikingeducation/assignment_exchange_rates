import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./containers/AppContainer";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<AppContainer />, document.getElementById("root"));
registerServiceWorker();
