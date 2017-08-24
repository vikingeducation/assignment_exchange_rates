import React from "react";
import { ListGroup } from "react-bootstrap";
import CurrencyControls from "./elements/CurrencyControls";
import ExchangeRate from "./elements/ExchangeRate";
import Selection from "./elements/Selection";

class Latest extends React.PureComponent {
  render() {
    return (
      <ListGroup>
        <CurrencyControls {...this.props} />
        <Selection {...this.props} />
        <div className="container">
          <h3>Today</h3>
          {this.props.latestRates.rates.map(latestRate =>
            <ExchangeRate
              {...latestRate}
              selection={this.props.selection}
              key={latestRate.country}
            />
          )}
        </div>
      </ListGroup>
    );
  }
}

export default Latest;
