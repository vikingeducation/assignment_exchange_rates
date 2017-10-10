import React from "react";

const CurrencyConverterOutput = ({
  converterBaseValue,
  converterBaseCurrency,
  convertingOutcome,
  convertedCurrency
}) => {
  return (
    <div className="outcome">
      <p>{converterBaseValue}</p>
      <p>{converterBaseCurrency}</p>
      <p id="converter_equals">=</p>
      <p>{convertingOutcome}</p>
      <p>{convertedCurrency}</p>
    </div>
  );
};

export default CurrencyConverterOutput;
