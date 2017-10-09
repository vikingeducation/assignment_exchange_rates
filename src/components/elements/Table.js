import React from "react";
import Converter from "./Converter";

const Table = props => {
  const { baseCurrency, rates } = props;
  const currenciesArr = [];

  const currencies = Object.keys(rates).forEach(function(key, index) {
    currenciesArr.push(
      <tr key={index}>
        <td>{key}</td>
        <td>{rates[key]}</td>
        <td>{1 / rates[key]}</td>
      </tr>
    );
  });
  return (
    <table>
      <tr>
        <th>Currency</th>
        <th>Units per {baseCurrency}</th>
        <th>{baseCurrency} per Unit</th>
      </tr>
      {currenciesArr}
    </table>
  );
};

export default Table;
