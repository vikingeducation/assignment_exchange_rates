import React, { Component } from 'react';


const TableTodays = ({isFetching, latestRates}) => {
  const ratesData = Object.keys(latestRates).map( (key) => (
      <tr key={key} >
        <th scope="row">{key}</th>
        <td>{latestRates[key]}</td>
      </tr>
  ))

  return (
    <table className="table table-sm table-inverse">
      <thead>
        <tr>
          <th>Currency</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {ratesData}
      </tbody>
    </table>
  )

}

export default TableTodays
