import React from 'react';
import App from '../components/App';
import fetch from 'node-fetch';

const FIXER_BASE_PATH = 'http://api.fixer.io/';
const FIXER_LATEST_PATH = FIXER_BASE_PATH + 'latest';

class AppContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			isFetching: true,
			latestRates: []
		};
	}
	componentDidMount() {
		this.getLatest();
	}

	getHistorical = async (dates, base = 'EUR', comparison = 'AUD') => {
		if (
			!dates ||
			!Array.isArray(dates) ||
			dates.length === 0 ||
			!base ||
			!comparison
		)
			return;

		let promises = [];
		dates.forEach(date => {
			promises.push(
				fetch(FIXER_BASE_PATH + date + `?base=${base}&symbols=${comparison}`)
			);
		});
		let exchangeByDate = await Promise.all(promises);
		return await Promise.all(exchangeByDate.map(response => response.json()));
	};

	getLatest = async (base = 'EUR', comparison = 'AUD') => {
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
				let obj = { country, rate: json.rates[country] };
				if (country === comparison) {
					let historicals = [];
					let date = new Date(latestRates.date);
					for (let i = 0; i < 3; i++) {
						date.setFullYear(date.getFullYear() - 1);
						historicals.push(new Date(date).toJSON().slice(0, 10));
					}
					obj.historicals = await this.getHistorical(
						historicals,
						base,
						comparison
					);
				}
				latestRates.rates.push(obj);
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
		if (this.state.isFetching) return <h2 class="text-center">Loading...</h2>;
		return (
			<App getLatest={this.getLatest} latestRates={this.state.latestRates} />
		);
	}
}

export default AppContainer;
