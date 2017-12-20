import React, { Component } from "react";
import serialize from "form-serialize";
import react from "react";
import App from "../App";

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      rates: [],
      isFetching: false
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });
    fetch("https://api.fixer.io/latest")
      .then(response => response.json())
      .then(json => {
        this.setState({
          rates: json.data,
          isFetching: false
        });
      });
  }

  // Send our state and functions as props
  render() {
    return <App />;
  }
}

export default AppContainer;
