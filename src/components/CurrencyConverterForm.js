import React from "react";
import Input from "./elements/Input";
import Select from "./elements/Select";

const CurrencyConverterForm = props => {
  const {
    converterBaseCurrency,
    convertedCurrency,
    converterBaseValue,
    convertedValue,
    baseCurrencyInput,
    converterExchangeRate,
    selectCurrency
  } = props;
  return (
    <div id="currencyConverterFormWrapper">
      <form className="container" id="currencyConverterForm">
        <Input
          name="converterBaseCurrency"
          form="CurrencyConverterForm"
          value={converterBaseValue}
          onChange={baseCurrencyInput}
        />
        {/*
        <Select
          name="baseCurrency"
          form="CurrencyConverterForm"
          handleSwitch={selectCurrency}
          baseValue={converterBaseCurrency}
        />
        <p className="converter_to">to</p>
        <Select
          name="convertedCurrency"
          form="CurrencyConverterForm"
          handleSwitch={selectCurrency}
          baseValue={convertedCurrency}
        />
        
        */}
      </form>
    </div>
  );
};

export default CurrencyConverterForm;
