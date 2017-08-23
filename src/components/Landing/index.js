import React, { PureComponent } from "react";
import "./Landing.css";

class Landing extends PureComponent {
	constructor(props) {
		super(props);

		this.currencies = [];
		this.objectCurrencies = [];
	}

	getExchangeRates = () => {
		return Object.keys(this.props.rates).map(key => {
			let pair = {};
			let value = this.props.rates[key];

			this.currencies.push(key);
			pair[key] = value;
			this.objectCurrencies.push(pair);

			return (
				<li key={key}>
					<p>
						{key} : {value}
					</p>
				</li>
			);
		});
	};

	getCurrencyOptions = () => {
		return this.currencies.map(currency => {
			return (
				<option value={currency} key={currency}>
					{currency}
				</option>
			);
		});
	};

	render() {
		console.log(this.props);
		return (
			<div>
				<div className="exchange-box">
					<h1> Historical Exchange Rates </h1>
					<ul className="exchange-list">
						{this.getExchangeRates()}
					</ul>
				</div>
				<select
					value={this.props.currency}
					name="Select Currency"
					onChange={this.props.changeBaseRate}
				>
					{this.getCurrencyOptions()}
				</select>
			</div>
		);
	}
}

export default Landing;
