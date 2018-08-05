export function  fetchRates(origin, type, baseCurrency, date, toCurrency) {
  origin.setState({isFetching: true});

  fetch(`https://api.fixer.io/${ date || 'latest' }?base=${baseCurrency}${ toCurrency ? '&symbols=' + toCurrency : ''}`)
    .then(response => {
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then(json => {
      if (type === 'current') {
        origin.setState({ isFetching: false, currentRates: json });
      } else if (type === 'historical') {
        origin.setState({
          isFetching: false,
          rates: [...origin.state.rates, json.rates[toCurrency]]
        });
      } else {
        const convertedRate = json.rates[origin.state.toCurrency];
        const convertedTotal = convertedRate * origin.state.convertAmount;
        origin.setState({ isFetching: false, convertedRate, convertedTotal });
      }
    })
    .catch(error => {
      origin.setState({
        isFetching: false,
        error
      });
    });
}

export function fetchCurrencies(origin) {
  origin.setState({isFetching: true});

  fetch('https://api.fixer.io/latest')
    .then(response => {
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .then(json => {
      const currencies = Object.keys(json.rates);
      currencies.push(json.base);
      origin.setState({
        isFetching: false,
        currencies: currencies.sort()
      });
    })
    .catch(error => {
      origin.setState({
        isFetching: false,
        error
      });
    });
}
