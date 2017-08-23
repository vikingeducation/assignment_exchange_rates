import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import AppContainer from "../src/container/AppContainer.js";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<AppContainer />, document.getElementById("root"));
registerServiceWorker();
