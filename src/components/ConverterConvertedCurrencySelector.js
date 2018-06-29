import React from "react";
import Select from "./elements/Select";
import PropTypes from "prop-types";

const ConverterConvertedCurrencySelector = ({
	selectCurrency,
	convertedCurrency,
	currenciesArray
}) => {
	//currenciesArray.unshift(convertedCurrency);
	return (
		<Select
			name="baseCurrency"
			form="CurrencyConverterForm"
			handleSwitch={selectCurrency}
			baseValue={convertedCurrency}
			data={currenciesArray}
		/>
	);
};

ConverterConvertedCurrencySelector.propTypes = {
	convertedCurrency: PropTypes.string.isRequired,
	selectCurrency: PropTypes.func.isRequired,
	currenciesArray: PropTypes.array.isRequired
};

export default ConverterConvertedCurrencySelector;
