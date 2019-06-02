import React from "react";
import PropTypes from "prop-types";

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

CurrencyConverterOutput.propTypes = {
  converterBaseValue: PropTypes.number,
  converterBaseCurrency: PropTypes.string.isRequired,
  convertingOutcome: PropTypes.number,
  convertedCurrency: PropTypes.string.isRequired,
  customConverterBaseValue: function(
    props,
    converterBaseValue,
    CurrencyConverterOutput
  ) {
    if (typeof converterBaseValue !== "number") {
      return new Error("Value must be a number");
    }
  }
};

export default CurrencyConverterOutput;
