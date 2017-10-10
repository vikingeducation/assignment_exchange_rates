import React from "react";
import Select from "./elements/Select";
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

export default ConverterBaseCurrencySelector;
