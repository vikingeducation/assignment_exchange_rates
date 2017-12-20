import React from "react";
import Rate from "./Rate";

const ExchangeRates = ({ rates }) => {
  let allRates = [];

  for (let k in rates) {
    allRates.push(<Rate currency={k} value={rates[k]} />);
  }
  console.log("allRates-----------------");
  console.log(allRates);

  return <ul>{allRates}</ul>;
};

export default ExchangeRates;
