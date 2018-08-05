import React, { Component } from 'react';
import Select from './elements/Select';
import Input from './elements/Input';
import { round } from '../helpers/math';
import { fetchRates, fetchCurrencies } from '../helpers/fixer_api';

class ConversionForm extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      convertAmount: 1,
      currencies: []
    };

    this.onConvertChange = this.onConvertChange.bind(this);
    this.onConvertAmountChange = this.onConvertAmountChange.bind(this);
  }

  componentDidMount() {
    fetchCurrencies(this);
    fetchRates(this, 'converted', this.state.fromCurrency, null, this.state.toCurrency);
  }

  onConvertChange(e) {
    const value = e.target.value;
    const cb = () => {
      fetchRates(this, 'converted', this.state.fromCurrency, null, this.state.toCurrency);
    };

    if (e.target.name === 'from') {
      this.setState({ fromCurrency: value }, cb);
    } else if (e.target.name === 'to') {
      this.setState({ toCurrency: value }, cb);
    }
  }

  onConvertAmountChange(e) {
    const convertAmount = e.target.value;
    const convertedTotal = this.state.convertedRate * convertAmount;
    this.setState({ convertAmount, convertedTotal });
  }

  render() {
    const {
      fromCurrency,
      toCurrency,
      convertAmount,
      convertedTotal,
      isFetching,
      currencies
    } = this.state;

    let convertedAmount;

    if (fromCurrency === toCurrency) {
      convertedAmount = <p className="text-danger text-center">Currencies must be different</p>;
    } else if (!convertAmount) {
      convertedAmount = <p className="text-danger text-center">Select an amount</p>;
    } else {
      convertedAmount = <p className="text-center">{convertAmount} {fromCurrency} = {round(convertedTotal)} {toCurrency}</p>;
    }

    if (isFetching) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="ConversionForm container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Input type="number" value={convertAmount} onChange={this.onConvertAmountChange} />
            </div>
            <div className="col-md-6">
              <Select
                options={currencies}
                className="currency-select"
                name="from"
                exchangeCurr={fromCurrency}
                onChange={this.onConvertChange}
              />
            </div>
          </div>

          <div className="text-center">to</div>

          <div className="row justify-content-center">
            <div className="col-md-6">
              <Select
                options={currencies}
                className="currency-select"
                name="to"
                exchangeCurr={toCurrency}
                onChange={this.onConvertChange}
              />
            </div>
          </div>

          {convertedAmount}
        </div>
      );
    }
  }
}

export default ConversionForm;
