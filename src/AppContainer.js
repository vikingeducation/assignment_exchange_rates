import React, { Component } from "react";
import App from "./components/App";

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      error: null
    };
  }

  async componentDidMount() {
    try {
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError = error => {
    console.log(error);
    this.setState({ error });
  };

  render() {
    const handlers = {};
    return <App handlers={handlers} {...this.state} />;
  }
}

export default AppContainer;
