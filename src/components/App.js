import React, { Component } from 'react';
import InfoSection from './elements/InfoSection';
import CurrentRateList from './CurrentRateList';
import HistoricalRatesList from './HistoricalRatesList';
import ConversionForm from './ConversionForm';
import { getHistoricalDates } from '../helpers/date';

class App extends Component {
  constructor() {
    super();
    this.state ={
      isFetchingCurrent: false,
      isFetchingHistoric: false,
      isFetchingConversion: false,
      currentExchangeCurr: 'USD',
      historicalFromCurrency: 'USD',
      historicalToCurrency: 'EUR',
      historicalRates: [],
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      convertAmount: 1
    };

    this.onCurrentCurrencyChange = this.onCurrentCurrencyChange.bind(this);
    this.onHistoricalRateChange = this.onHistoricalRateChange.bind(this);
    this.onConvertChange = this.onConvertChange.bind(this);
    this.onConvertAmountChange = this.onConvertAmountChange.bind(this);
  }

  fetchRates(type, baseCurrency, date, to) {
    if (type === 'current') {
      this.setState({isFetchingCurrent: true});
    } else if (type === 'historical') {
      this.setState({isFetchingHistoric: true});
    } else {
      this.setState({isFetchingConversion: true});
    }

    fetch(`https://api.fixer.io/${ date || 'latest' }?base=${baseCurrency}${ to ? '&symbols=' + to : ''}`)
      .then(response => {
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        return response.json();
      })
      .then(json => {
        if (type === 'current') {
          this.setState({ isFetchingCurrent: false, currentRates: json });
        } else if (type === 'historical') {
          this.setState({
            isFetchingHistoric: false,
            historicalRates: [...this.state.historicalRates, json.rates[to]]
          });
        } else {
          const convertedRate = json.rates[this.state.toCurrency];
          const convertedTotal = convertedRate * this.state.convertAmount;
          this.setState({ isFetchingConversion: false, convertedRate, convertedTotal });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isFetchingCurrent: false,
          isFetchingHistoric: false,
          isFetchingConversion: false,
          error
        });
      });
  }

  fetchHistoricalRates() {
    const dates = getHistoricalDates();
    this.setState({historicalRates: []});

    dates.forEach(date => {
      this.fetchRates(
        'historical',
        this.state.historicalFromCurrency,
        date,
        this.state.historicalToCurrency
      );
    });
  }

  componentDidMount() {
    this.fetchRates('current', this.state.currentExchangeCurr);
    this.fetchRates('converted', this.state.fromCurrency, null, this.state.toCurrency);
    this.fetchHistoricalRates();
  }

  onCurrentCurrencyChange(e) {
    const currency = e.target.value;

    this.setState({ currentExchangeCurr: currency });
    this.fetchRates('current', currency);
  }

  onHistoricalRateChange(e) {
    if (e.target.name === 'historicalFrom') {
      this.setState({historicalFromCurrency: e.target.value}, () => {
        this.fetchHistoricalRates();
      });
    } else {
      this.setState({historicalToCurrency: e.target.value}, () => {
        this.fetchHistoricalRates();
      });
    }
  }

  onConvertChange(e) {
    const value = e.target.value;
    const cb = () => {
      this.fetchRates('converted', this.state.fromCurrency, null, this.state.toCurrency);
    };

    if (e.target.name === 'from') {
      this.setState({fromCurrency: value}, cb);
    } else if (e.target.name === 'to') {
      this.setState({toCurrency: value}, cb);
    }
  }

  onConvertAmountChange(e) {
    const convertAmount = e.target.value;
    const convertedTotal = this.state.convertedRate * convertAmount;
    this.setState({convertAmount, convertedTotal});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="text-center">Exchange Rates</h1>
        </header>
        <div className="container">
          <div className="row justify-content-left">
            <InfoSection title="Current Rates" col='8'>
              <CurrentRateList
                currentRates={this.state.currentRates}
                isFetching={this.state.isFetchingCurrent}
                currentExchangeCurr={this.state.currentExchangeCurr}
                onCurrChange={this.onCurrentCurrencyChange}
              />
            </InfoSection>
            <InfoSection title="Quick Convert" col='4'>
              <ConversionForm
                isFetching={this.state.isFetchingConversion}
                currentRates={this.state.currentRates}
                convertedTotal={this.state.convertedTotal}
                convertAmount={this.state.convertAmount}
                fromCurrency={this.state.fromCurrency}
                toCurrency={this.state.toCurrency}
                onConvertChange={this.onConvertChange}
                onConvertAmountChange={this.onConvertAmountChange}
              />
            </InfoSection>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-end">
            <InfoSection title="Historical Rates" col='4'>
              <HistoricalRatesList
                isFetching={this.state.isFetchingHistoric}
                currentRates={this.state.currentRates}
                historicalRates={this.state.historicalRates}
                historicalFromCurrency={this.state.historicalFromCurrency}
                historicalToCurrency={this.state.historicalToCurrency}
                onHistoricalRateChange={this.onHistoricalRateChange}
              />
            </InfoSection>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
