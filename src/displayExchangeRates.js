import React, { Component } from "react";

const DisplayRates = ({ rates, title }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th colspan="2">
            {title}
          </th>
        </tr>
      </thead>
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
