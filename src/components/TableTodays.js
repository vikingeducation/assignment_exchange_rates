import React, { Component } from 'react';
import Select from './elements/Select'
import InputGroup from './elements/InputGroup'


const TableTodays = ({isFetching, latestRates, currencyOptions, baseCurrency, onChangeToday}) => {
  const ratesData = Object.keys(latestRates).map( (key) => (
      <tr key={key} >
        <th scope="row">{key}</th>
        <td>{latestRates[key]}</td>
      </tr>
  ))
  console.log('base currency is: ')
  console.log(baseCurrency)

  return (
    <div className='todays-rates'>

      <InputGroup name="baseCurrency" labelText="Choose Base Currency">
        <Select name="baseCurrency"
                options={currencyOptions}
                value={baseCurrency}
                onChange={onChangeToday}
                placeholder={baseCurrency}
        />
      </InputGroup>

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
    </div>
  )

}

export default TableTodays
