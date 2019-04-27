import React from 'react'
import Alert from './elements/Alert'
import {convertedValue} from './helpers/conversion'

const ConversionResult = ({inputCurrency, inputAmount, outputCurrency, conversionRate}) => {
  if (!inputAmount || !inputCurrency || !outputCurrency) {
    return null
  }
  const finalValue = convertedValue(inputAmount, conversionRate)
  console.log('I am in results component')
  return (
    <div>
      <label>New Quantity</label>
      <Alert>
        {finalValue}
      </Alert>
    </div>
  )
}

export default ConversionResult
