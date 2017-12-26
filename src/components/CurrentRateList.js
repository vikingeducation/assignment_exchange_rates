import React, { Component } from 'react';
import Select from './elements/Select';
import { getLists } from '../helpers/lists';
import { fetchRates } from '../helpers/fixer_api';

class CurrentRateList extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      currentExchangeCurr: 'USD'
    };

    this.onCurrentCurrencyChange = this.onCurrentCurrencyChange.bind(this);
  }

  componentDidMount() {
    fetchRates(this, 'current', this.state.currentExchangeCurr);
  }

  onCurrentCurrencyChange(e) {
    const currency = e.target.value;

    this.setState({ currentExchangeCurr: currency });
    fetchRates(this, 'current', currency);
  }

  render() {
    const lists = getLists(this.state.currentRates);

    if (this.state.isFetching) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-3">
              <Select
                options={lists.currencies}
                className="currency-select"
                exchangeCurr={this.state.currentExchangeCurr}
                onChange={this.onCurrentCurrencyChange}
              />
            </div>
          </div>
          <dl className="row justify-content-left">
            {lists.rateList}
          </dl>
        </div>
      );
    }
  }
}

export default CurrentRateList;
