

export function convertedValue(inputAmount, conversionRate) {
  let result =  inputAmount * conversionRate
  console.log('result is:' + result)
  result = Math.round(result  * 100)/ 100
  return String(result.toPrecision())
}

export function getRatesNames(jsonObject) {
  let arr = Object.keys(jsonObject)
  arr.push('EUR')
  return arr.sort()
}


// export function getConversionR(fromCurrency, value, toCurrency, latestRatesForConversion) {
//   let result =  parseInt(value) * latestRatesForConversion[toCurrency] / latestRatesForConversion[fromCurrency]
//   return Math.round(result.toPrecision()  * 100)/ 100
// }
