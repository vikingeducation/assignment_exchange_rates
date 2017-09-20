import React, { PureComponent } from "react";
import "./Landing.css";

class Landing extends PureComponent {
	constructor(props) {
		super(props);

		this.currencies = [];
	}

	getExchangeRates = () => {
		return Object.keys(this.props.rates).map(key => {
			let value = this.props.rates[key];

			this.currencies.push(key);

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
		return this.currencies.map((currency, index) => {
			return (
				<option value={currency} key={index}>
					{currency}
				</option>
			);
		});
	};

	getSingleHistoricRate = () =>{
	
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<div className="exchange-box">
					<h1> Latest Exchange Rates </h1>
					<ul className="exchange-list">
						{this.getExchangeRates()}
					</ul>
				</div>
				<p>Current Base Rate Currency: {this.props.currency}</p>
				<select
					value={this.props.currency}
					name="Select Currency"
					onChange={this.props.changeBaseRate}
				>
					{this.getCurrencyOptions()}
				</select>
				<div className="exchange-box">
					<h1> Historic Exchange Rates </h1>
					<ul className="exchange-list">
						{this.getExchangeRates()}
					</ul>
				</div>
				<p>Historic Rate Currency: {this.props.historicRate}</p>
				<select
					value={this.props.historicRate}
					name="Select Currency"
					onChange={this.props.changeHistoricRate}
				>
					{this.getCurrencyOptions()}
				</select>
			</div>
		);
	}
}

export default Landing;
