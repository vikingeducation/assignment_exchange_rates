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

const CurrencyControlsWidget = ({
  value,
  countries,
  changeHandler,
  label,
  exclude
}) => {
  return (
    <div className="col-md-3">
      <Form inline>
        <FormGroup controlId="baseCurrency">
          <ControlLabel>
            <strong>
              {label}:&nbsp;
            </strong>
          </ControlLabel>
          <FormControl
            componentClass="select"
            value={value}
            onChange={changeHandler}
          >
            {!exclude
              ? <option key={value} value={value}>
                  {value}
                </option>
              : ""}

            {countries.map(country =>
              <option key={country} value={country}>
                {country}
              </option>
            )}
          </FormControl>
        </FormGroup>
      </Form>
    </div>
  );
};

const DateWidget = ({ date }) =>
  <div className="col-md-3">
    <strong>Date: </strong>
    {date}
  </div>;

class CurrencyControls extends React.PureComponent {
  onBaseCurrencyChange = async e => {
    const baseCurrency = e.target.value;
    this.props.changeBase(baseCurrency);
  };

  onComparisonCurrencyChange = async e => {
    const comparisonCurrency = e.target.value;
    // this.props.getLatest(this.props.base, comparisonCurrency);
    this.props.changeComparison(comparisonCurrency);
  };

  render() {
    const { base, comp } = this.props;
    const { date, rates } = this.props.latestRates;
    const countries = rates.map(rate => rate.country);
    return (
      <ListGroupItem>
        <div className="row">
          <BaseWidget base={base} />
          <CurrencyControlsWidget
            value={base}
            countries={countries}
            changeHandler={this.onBaseCurrencyChange}
            label="Currency"
          />
          <CurrencyControlsWidget
            value={comp}
            countries={countries}
            changeHandler={this.onComparisonCurrencyChange}
            label="Comparison"
            exclude={true}
          />
          <DateWidget date={date} />
        </div>
      </ListGroupItem>
    );
  }
}

export default CurrencyControls;
