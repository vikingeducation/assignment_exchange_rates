import React from "react";

const Table = ({ headers, rows }) =>
  <table class="table table-striped">
    <thead>
      <tr>
        {headers.map(name =>
          <th>
            {name}
          </th>
        )}
      </tr>
    </thead>
    <tbody>
      {rows.map(row => {
        <tr>
          {headers.map(name =>
            <td>
              {rows[name]}
            </td>
          )}
        </tr>;
      })}
    </tbody>
  </table>;

export default Table;
