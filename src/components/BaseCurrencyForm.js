import React from "react";
import Select from "./elements/Select";
import Button from "./elements/Button";

const BaseCurrencyForm = props => {
	const {
		rates,
		baseCurrency,
		switch_currency,
		setDate,
		date,
		currenciesArray
	} = props;
	return (
		<form className="container" id="ChooseBaseCurrency">
			<Select
				className="form-control"
				name="baseCurrency"
				form="ChooseBaseCurrency"
				handleSwitch={switch_currency}
				data={currenciesArray}
				baseValue={baseCurrency}
			/>
			<input
				className="form-control"
				type="date"
				name="rateDate"
				value={date}
				onChange={setDate}
			/>
			<br />
		</form>
	);
};

BaseCurrencyForm.defaultProps = {
	type: "button",
	color: "default",
	children: "Submit"
};

export default BaseCurrencyForm;
