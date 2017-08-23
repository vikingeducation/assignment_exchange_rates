import React, { Component } from "react";
import App from "./components/App";

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      rates: []
    };
  }

  async componentDidMount() {
    try {
      this.setState({ isFetching: true });
      const res = await fetch("https://api.fixer.io/latest");

      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      else {
        const json = await res.json();
        this.setState({ rates: json.data });
      }
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
