import React from 'react'
import Alert from './elements/Alert'
import {convertedValue} from './helpers/conversion'

const ConversionResult = ({inputCurrency, inputAmount, outputCurrency, getConversionRate}) => {
  if (!inputAmount || !inputCurrency || !outputCurrency) {
    return null
  }
  const conversionRate = getConversionRate(inputCurrency, outputCurrency)

  return (
    <div>
      <label>New Quantity</label>
      <Alert>
        {convertedValue(inputAmount, conversionRate)}
      </Alert>
    </div>
  )
}

export default ConversionResult
