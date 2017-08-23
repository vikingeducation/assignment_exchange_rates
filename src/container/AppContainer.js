import React from "react";
import App from "../components/App";

const FIXER_LATEST_PATH = "http://api.fixer.io/latest";

class AppContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <App />;
  }
}

export default AppContainer;
