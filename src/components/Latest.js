import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ExchangeRate from "./elements/ExchangeRate";

class Latest extends React.PureComponent {
  render() {
    return (
      <ListGroup>
        <ListGroupItem>
          <h3>
            <strong>Base: </strong>
            {this.props.latestRates.base}
          </h3>
        </ListGroupItem>
        <div className="container">
          {this.props.latestRates.rates.map(latestRate =>
            <ExchangeRate {...latestRate} key={latestRate.country} />
          )}
        </div>
      </ListGroup>
    );
  }
}

export default Latest;
