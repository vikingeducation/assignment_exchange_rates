

export function convertedValue(inputAmount, conversionRate) {
  return inputAmount*conversionRate
}

export function getConversionR(fromCurrency, value, toCurrency, latestRates) {
  return parseInt(value) * parseInt(latestRates[toCurrency]) / parseInt(latestRates[fromCurrency])
}
