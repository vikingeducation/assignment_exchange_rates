import React from "react";
import Input from "./elements/Input";
import ConverterBaseCurrencySelector from "./ConverterBaseCurrencySelector";
import ConverterConvertedCurrencySelector from "./ConverterConvertedCurrencySelector";

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

export default CurrencyConverterForm;
