import React from "react";
import Select from "./elements/Select";

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

export default ConverterConvertedCurrencySelector;
