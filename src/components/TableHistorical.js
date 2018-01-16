import React, { Component } from 'react';
import Select from './elements/Select'
import InputGroup from './elements/InputGroup'



const TableHistorical = ({currencyOptions, currency1, currency2, startDate, onChangeHistory, historicalRates}) => {

  const historicalData = Object.keys(historicalRates).map( (key) => (
      <tr key={key} >
        <th scope="row">{key}</th>
        <td>{historicalRates[key]}</td>
      </tr>
  ))

  return (

    <div className='historical'>
      <InputGroup name="currency1" labelText="Choose which currency">
        <Select name="currency1"
                options={currencyOptions}
                value={currency1}
                onChange={onChangeHistory}
                placeholder={currency1}
        />
      </InputGroup>
      <InputGroup name="currency2" labelText="... to compare with ">
        <Select name="currency2"
                options={currencyOptions}
                value={currency2}
                onChange={onChangeHistory}
                placeholder={currency2}
        />
      </InputGroup>
      <InputGroup name="timeline" labelText="Since when?">
        <input className="form-control" type="date" value="2011-08-19" id="example-date-input" />
      </InputGroup>

      <table className="table table-sm table-inverse">
        <thead>
          <tr>
            <th>Date</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {historicalData}
        </tbody>
      </table>
    </div>
  )

}

export default TableHistorical
