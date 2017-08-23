import React from "react";
import {
  ListGroupItem,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";

const BaseWidget = ({ base }) =>
  <div className="col-md-3">
    <strong>Base: </strong>
    {base}
  </div>;

const CurrencyControlsWidget = ({ base, countries, changeHandler, label }) =>
  <div className="col-md-3">
    <Form inline>
      <FormGroup controlId="baseCurrency">
        <ControlLabel>
          <strong>
            {label}:&nbsp;
          </strong>
        </ControlLabel>
        <FormControl componentClass="select" onChange={changeHandler}>
          <option value={base}>
            {base}
          </option>
          {countries.map(country =>
            <option key={country} value={country}>
              {country}
            </option>
          )}
        </FormControl>
      </FormGroup>
    </Form>
  </div>;

const DateWidget = ({ date }) =>
  <div className="col-md-3">
    <strong>Date: </strong>
    {date}
  </div>;

class CurrencyControls extends React.PureComponent {
  onBaseCurrencyChange = e => {
    const baseCurrency = e.target.value;
    this.props.getLatest(baseCurrency);
  };

  render() {
    const countries = this.props.rates.map(rate => rate.country);
    return (
      <ListGroupItem>
        <div className="row">
          <BaseWidget base={this.props.base} />
          <CurrencyControlsWidget
            base={this.props.base}
            countries={countries}
            changeHandler={this.onBaseCurrencyChange}
            label="Currency"
          />
          <CurrencyControlsWidget
            base={this.props.base}
            countries={countries}
            changeHandler={this.onBaseCurrencyChange}
            label="Comparison"
          />
          <DateWidget date={this.props.date} />
        </div>
      </ListGroupItem>
    );
  }
}

export default CurrencyControls;
