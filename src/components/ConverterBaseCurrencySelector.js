import React from "react";
import Select from "./elements/Select";
import PropTypes from "prop-types";

const ConverterBaseCurrencySelector = ({
	selectCurrency,
	converterBaseCurrency,
	currenciesArray
}) => {
	//currenciesArray.unshift(converterBaseCurrency);
	return (
		<Select
			name="baseCurrency"
			form="CurrencyConverterForm"
			handleSwitch={selectCurrency}
			baseValue={converterBaseCurrency}
			data={currenciesArray}
		/>
	);
};

ConverterBaseCurrencySelector.propTypes = {
	convertedCurrency: PropTypes.string.isRequired,
	selectCurrency: PropTypes.func.isRequired,
	currenciesArray: PropTypes.array.isRequired
};
export default ConverterBaseCurrencySelector;

