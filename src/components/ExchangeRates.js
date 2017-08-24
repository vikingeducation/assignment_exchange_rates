import React from "react";

const ExchangeRates = ({ rates, headers }) =>
  <div>
    <table className="table table-striped table-condensed">
      <thead>
        <tr>
          {headers.map(name =>
            <th key={name}>
              {name}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {rates.map((row, i) =>
          <tr key={`row${i}`}>
            {headers.map(name =>
              <td key={name}>
                {row[name]}
              </td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  </div>;

export default ExchangeRates;
