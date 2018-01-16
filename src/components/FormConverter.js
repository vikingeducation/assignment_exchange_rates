import React, { Component } from 'react';
import Input from './elements/Input'
import InputGroup from './elements/InputGroup'
import Button from './elements/Button'
import Select from './elements/Select'
import ConversionResults from './ConversionResults'


const FormConverter = ({isFetching, currencyOptions, inputCurrency, outputCurrency, inputAmount, onChangeInput, conversionRate}) => {

  return (

    <div className='well'>

      <InputGroup name="inputCurrency" labelText="Calculate from currency...">
        <Select name="inputCurrency" value={inputCurrency} options={currencyOptions} onChange={onChangeInput} placeholder={inputCurrency}/>
      </InputGroup>


      <InputGroup name='inputAmount' labelText='Amount to Convert'>
        <Input name='inputAmount' value={inputAmount}  onChange={onChangeInput}/>
      </InputGroup>

      <InputGroup name='outputCurrency' labelText='...to currency'>
        <Select name='outputCurrency' options={currencyOptions} value={outputCurrency} onChange={onChangeInput} placeholder={outputCurrency}/>
      </InputGroup>

      <ConversionResults
        inputCurrency={inputCurrency}
        outputCurrency={outputCurrency}
        inputAmount={inputAmount}
        conversionRate={conversionRate}
      />

    </div>

  )

}



export default FormConverter
