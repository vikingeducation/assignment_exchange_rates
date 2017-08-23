import React from "react";

const Table = ({ base, date, rates }) => {
  if (!base) return null;

  const headerData = ["Currency", "Rate"];
  let tableHeader = headerData.map(data =>
    <th key={data}>
      {data}
    </th>
  );

  const tableDataRows = Object.keys(rates).map(key => {
    return (
      <tr key={key}>
        <td>
          {key}
        </td>
        <td>
          {rates[key]}
        </td>
      </tr>
    );
  });

  return (
    <div className="row">
      <div className="col-xs-12">
        <h2>
          {base}
        </h2>
        <h3>
          {date}
        </h3>
        <table className="table table-striped">
          <thead>
            <tr>
              {tableHeader}
            </tr>
          </thead>
          <tbody>
            {tableDataRows}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
