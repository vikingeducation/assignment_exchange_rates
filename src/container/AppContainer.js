import React from 'react';
import App from '../components/App';
import fetch from 'fetch';

const FIXER_LATEST_PATH = 'http://api.fixer.io/latest';

class AppContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			isFetching: false
      latestRates: []
		};
	}

	async componentDidMount() {
		try {
			this.setState({
				isFetching: true
			});

			let response = await fetch(FIXER_LATEST_PATH);
			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}`);
			}
      let json = await response.json();
      let latestRates = {
        base: json.base,
        date: json.date,
        rates = []
      }
      for (country in json.rates) {
        latestRates.rates.push({country, rate: json.rates[country]});
      }
			console.log(latestRates);
      this.setState({
				isFetching: false,
        latestRates
			});

		} catch (err) {
			console.error(err);
			this.setState({
				isFetching: false
			});
		}
	}

	render() {
		if (this.state.isFetching)
			return <p>Loading...</p>
		return <App latestRates={this.state.latestRates}/>;
	}
}

export default AppContainer;
