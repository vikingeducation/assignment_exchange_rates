import React, { Component } from 'react';
import Input from './elements/Input'
import InputGroup from './elements/InputGroup'
import Button from './elements/Button'
import Select from './elements/Select'


const FormConverter = ({}) => {

  return (

    <div className='well'>
      <h2>Input</h2>

      <InputGroup name="measurementType" labelText="Type of Measurement">
        // <Select name="measurementType" value='' options='' />
      </InputGroup>


      <InputGroup name='inputValue' labelText='Amount'>
        <Input name='inputValue' value=''  />
      </InputGroup>

      <InputGroup name='inputUnits' labelText='Units'>
        // <Select name='inputUnits' options='' value='' />
      </InputGroup>
    </div>

  )

}



export default FormConverter
