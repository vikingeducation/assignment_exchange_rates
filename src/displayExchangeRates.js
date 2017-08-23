import React, { Component } from "react";

const DisplayRates = ({ rates }) => {
  return (
    <table className="table table-striped">
      <tbody>
        {rates.map(rate =>
          <tr key={rate.currency}>
            <th>
              {rate.currency}
            </th>
            <td>
              {rate.value}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DisplayRates;
