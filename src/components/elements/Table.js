import React from 'react';


const buildTableData = data => {
  let results = [];
  for (let key in data) {
    results.push(
      <tr key={key}>
        <td>{key}</td>
        <td>{data[key]}</td>
      </tr>
    )
  }

  return results;
};

const Table = ({headers, data}) => {
  let tableHeadings;
  let tableData;
  if (data) {
    tableHeadings = headers.map(header => {
      return <th key={header}>{header}</th>;
    });
    tableData = buildTableData(data);

  }
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {tableHeadings}
        </tr>
      </thead>
      <tbody>
        {tableData}
      </tbody>
    </table>
  );
};

export default Table;