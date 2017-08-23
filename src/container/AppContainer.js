import React from 'react';
import App from '../components/App';
import fetch from 'node-fetch';

const FIXER_LATEST_PATH = 'http://api.fixer.io/latest';

class AppContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			isFetching: true,
			latestRates: []
		};
	}
	componentDidMount() {
		this.getLatest('EUR');
	}

	getLatest = async base => {
		if (!base) return;
		try {
			this.setState({
				isFetching: true
			});

			let latestPath = FIXER_LATEST_PATH + `?base=${base}`;
			let response = await fetch(latestPath);
			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}`);
			}
			let json = await response.json();
			let latestRates = {
				base: json.base,
				date: json.date,
				rates: []
			};
			for (let country in json.rates) {
				latestRates.rates.push({ country, rate: json.rates[country] });
			}
			this.setState({
				isFetching: false,
				latestRates
			});
		} catch (err) {
			this.setState({
				isFetching: false
			});
		}
	};

	render() {
		if (this.state.isFetching) return <p>Loading...</p>;
		return (
			<App getLatest={this.getLatest} latestRates={this.state.latestRates} />
		);
	}
}

export default AppContainer;
