import React, { Component } from "react";
import App from "../components/App";
import serialize from "form-serialize";

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      isFetching: false,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });
    fetch("https://api.fixer.io/latest")
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          currencies: [json.data],
          isFetching: false
        });
      });
  }

  render() {
    return <App {...this.state} />;
  }
}

export default AppContainer;
