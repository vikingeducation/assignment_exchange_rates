import React from "react";
import Converter from "./Converter";

const Table = props => {
  const { baseCurrency, baseValue, convertedCurrency, exchangeRate } = props;

  return (
    <table>
      <tr>
        <th>Currency</th>
        <th>Units per {baseCurrency}</th>
        <th>{baseCurrency} per Unit</th>
      </tr>
      <tr>
        <td>{convertedCurrency}</td>
        <td>{Converter(baseValue, exchangeRate).exchangeValue}</td>
        <td>{Converter(baseValue, exchangeRate).reverseExchangeValue}</td>
      </tr>
    </table>
  );
};

export default Table;
