import React, { Component } from 'react';
import Select from './elements/Select';
import { displayHistoricalList } from '../helpers/lists';
import { getHistoricalDates } from '../helpers/date';
import { fetchRates, fetchCurrencies } from '../helpers/fixer_api';

class HistoricalRatesList extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      rates: [],
      currencies: []
    };

    this.fetchHistoricalRates = this.fetchHistoricalRates.bind(this);
    this.onHistoricalRateChange = this.onHistoricalRateChange.bind(this);
  }

  componentDidMount() {
    fetchCurrencies(this);
    this.fetchHistoricalRates();
  }

  fetchHistoricalRates() {
    const dates = getHistoricalDates();
    this.setState({ rates: [] });

    dates.forEach(date => {
      fetchRates(
        this,
        'historical',
        this.state.fromCurrency,
        date,
        this.state.toCurrency
      );
    });

    this.onHistoricalRateChange = this.onHistoricalRateChange.bind(this);
  }

  onHistoricalRateChange(e) {
    if (e.target.name === 'historicalFrom') {
      this.setState({ fromCurrency: e.target.value }, () => {
        this.fetchHistoricalRates();
      });
    } else {
      this.setState({ toCurrency: e.target.value }, () => {
        this.fetchHistoricalRates();
      });
    }
  }

  render() {
    const {
      isFetching,
      fromCurrency,
      toCurrency,
      rates,
      currencies
    } = this.state;

    let ratesList;

    if (fromCurrency === toCurrency) {
      ratesList = <p className="text-danger">Please select two DIFFERENT currencies</p>;
    } else {
      ratesList = displayHistoricalList(rates);
    }

    if (isFetching) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="HistoricalRatesList container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Select
                options={currencies}
                className="currency-select"
                name="historicalFrom"
                exchangeCurr={fromCurrency}
                onChange={this.onHistoricalRateChange}
              />
            </div>
          </div>

          <div className="text-center">to</div>

          <div className="row justify-content-center">
            <div className="col-md-6">
              <Select
                options={currencies}
                className="currency-select"
                name="historicalTo"
                exchangeCurr={toCurrency}
                onChange={this.onHistoricalRateChange}
              />
            </div>
          </div>

          <dl className="HistoricalRates row text-center justify-content-center">
            {ratesList}
          </dl>
        </div>
      );
    }
  }
}

export default HistoricalRatesList;
