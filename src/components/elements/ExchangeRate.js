import React from "react";
import { ListGroupItem } from "react-bootstrap";

class ExchangeRate extends React.PureComponent {
  render() {
    const { historicals } = this.props;

    return (
      <div className="row">
        <ListGroupItem className="col-md-3">
          <div>
            {this.props.country}: <strong>{this.props.rate}</strong>
          </div>
        </ListGroupItem>
        {historicals !== undefined && this.props.selection === "historicals"
          ? historicals.map(h =>
              <ListGroupItem className="col-md-3">
                <div key={h.date} className="col-md-3">
                  ({h.date}): <strong>{h.rates[this.props.country]}</strong>
                </div>
              </ListGroupItem>
            )
          : ""}
      </div>
    );
  }
}

export default ExchangeRate;
