import React from "react";

const Converter = (baseValue, rate) => {
  let exchangeValue = baseValue * rate;
  let reverseExchangeValue = baseValue / rate;
  return {
    exchangeValue,
    reverseExchangeValue
  };
};

export default Converter;
