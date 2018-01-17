

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

export function getTodayDateFormat(dateNumerical) {
  let today = new Date(dateNumerical);
  let dd = today.getDate();
  let mm = today.getMonth()+1;
  const yyyy = today.getFullYear();
  if(dd<10) {
    dd=`0${dd}`;
  }
  if(mm<10) {
    mm=`0${mm}`;
  }
  return`${yyyy}-${mm}-${dd}`;
}

export function getDatesArray(startDate) {
  let start = new Date(startDate);
  let finish = new Date();
  let array = [];
  while (start < finish) {
    array.push(getTodayDateFormat(start));
    start = start.setMonth(start.getMonth() + 1);
    start = new Date(start)
  }
  return array
}
