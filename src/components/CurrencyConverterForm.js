import React from "react";
import Input from "./elements/Input";
import ConverterBaseCurrencySelector from "./ConverterBaseCurrencySelector";
import ConverterConvertedCurrencySelector from "./ConverterConvertedCurrencySelector";
import PropTypes from "prop-types";

const CurrencyConverterForm = ({
  converterBaseCurrency,
  selectBaseCurrency,
  currenciesArray, //for populating selectors
  convertedCurrency, //second selector
  selectConvertedCurrency, //function upon selection
  converterBaseValue, //value of user input
  baseCurrencyInput, //function changes converterBaseValue upon user input
  handleClick //function for submit btn
}) => {
  return (
    <div className="converter_get_input">
      <Input
        name="converterBaseCurrency"
        form="CurrencyConverterForm"
        value={converterBaseValue}
        onChange={baseCurrencyInput}
      />
      <ConverterBaseCurrencySelector
        converterBaseCurrency={converterBaseCurrency}
        selectCurrency={selectBaseCurrency}
        currenciesArray={currenciesArray}
      />
      <p id="converter_to">to</p>
      <ConverterConvertedCurrencySelector
        convertedCurrency={convertedCurrency}
        selectCurrency={selectConvertedCurrency}
        currenciesArray={currenciesArray}
      />
      <Input
        type="submit"
        onClick={handleClick}
        className="btn-primary"
        id="converter_submit_btn"
      />
    </div>
  );
};

CurrencyConverterForm.propTypes = {
  converterBaseCurrency: PropTypes.string.isRequired,
  selectBaseCurrency: PropTypes.string.isRequired,
  currenciesArray: PropTypes.array.isRequired,
  convertedCurrency: PropTypes.string.isRequired,
  selectConvertedCurrency: PropTypes.func.isRequired,
  converterBaseValue: PropTypes.number,
  baseCurrencyInput: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default CurrencyConverterForm;
