import React, { Component } from "react";
import "./Landing.css";

const Landing = props => {
	const currencies = [];
	const objectCurrencies=[];

	const exchangeRates = Object.keys(props.rates).map(key => {
		currencies.push(key);
		let value = props.rates[key];
		// objectCurrencies.push(key: value)
		return (
			<li key={key}>
				<p>
					{key} : {value}
				</p>
			</li>
		);
	});

console.log(objectCurrencies)

	const currencyOptions = currencies.map(currency =>{
		return (
			<option defaultValue={props.currency}value={currency} key={currency}>{currency}</option>
		)
	})


	return (
		<div>
			<select name="Select Currency" onChange={props.changeBaseRate.bind(this)} >
				{currencyOptions}
			</select>
			<div className="exchange-box">
				<h1> Historical Exchange Rates </h1>
				<ul className="exchange-list">
					{exchangeRates}
				</ul>
			</div>
		</div>
	);
};

export default Landing;
