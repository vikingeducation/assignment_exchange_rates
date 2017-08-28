import React from "react";

const Table = ({ headers, rows }) =>
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
      {rows.map((row, i) =>
        <tr key={`row${i}`}>
          {headers.map(name =>
            <td key={name}>
              {row[name]}
            </td>
          )}
        </tr>
      )}
    </tbody>
  </table>;

export default Table;
