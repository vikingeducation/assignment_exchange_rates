import React from "react";
import { ListGroupItem } from "react-bootstrap";

class Selection extends React.PureComponent {
  onGetAll = async e => {
    const selection = e.target.value;
    await this.props.changeSelection(selection);
    await this.props.getData();
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <ListGroupItem className="col-sm-12">
            <div>
              <select onChange={this.onGetAll}>
                <option value="">Select a filter</option>
                <option value="current">Current</option>
                <option value="historicals">Historicals</option>
                <option value="all">All</option>
              </select>
            </div>
          </ListGroupItem>
        </div>
      </div>
    );
  }
}

export default Selection;
