import React, { Component } from "react";
import "./Landing.css";

const Landing = props => {
	const currencies = [];

	const exchangeRates = Object.keys(props.rates).map(key => {
		currencies.push(key);
		let value = props.rates[key];
		return (
			<li key={key}>
				<p>
					{key} : {value}
				</p>
			</li>
		);
	});

	return (
		<div>
			<select name="Select Currency">
				<option value="usd">Value 1</option>
				<option value="value2" selected>
					Value 2
				</option>
				<option value="value3">Value 3</option>
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
