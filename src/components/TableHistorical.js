import React, { Component } from 'react';
import Select from './elements/Select'
import InputGroup from './elements/InputGroup'
import Input from './elements/Input'
import {getTodayDateFormat} from './helpers/conversion'


const TableHistorical = ({currencyOptions, currency1, currency2, startDate, onChangeHistoryInput, historicalRates}) => {
  console.log(historicalRates)
  const historicalData = historicalRates.map( (dayRate) => (
      <tr key={dayRate.date} >
        <th scope="row">{dayRate.date}</th>
        <td>{dayRate.rate}</td>
      </tr>
  ))

  return (

    <div className='historical'>
      <InputGroup name="currency1" labelText="Choose which currency">
        <Select name="currency1"
                options={currencyOptions}
                value={currency1}
                onChange={onChangeHistoryInput}
                placeholder={currency1}
        />
      </InputGroup>
      <InputGroup name="currency2" labelText="... to compare with ">
        <Select name="currency2"
                options={currencyOptions}
                value={currency2}
                onChange={onChangeHistoryInput}
                placeholder={currency2}
        />
      </InputGroup>
      <InputGroup name="startDate" labelText="Since when?">
        <Input type="date" name='startDate' value={startDate} min="1999-01-10" onChange={onChangeHistoryInput} />
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
