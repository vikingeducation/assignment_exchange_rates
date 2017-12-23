export function getHistoricalDates() {
  let thisYear = new Date().getFullYear();
  let oneYr = new Date();
  let twoYr = new Date();
  let threeYr = new Date();
  let fourYr = new Date();
  let fiveYr = new Date();

  oneYr.setYear(thisYear - 1);
  twoYr.setYear(thisYear - 2);
  threeYr.setYear(thisYear - 3);
  fourYr.setYear(thisYear - 4);
  fiveYr.setYear(thisYear - 5);

  return [
    formatDate(oneYr),
    formatDate(twoYr),
    formatDate(threeYr),
    formatDate(fourYr),
    formatDate(fiveYr)
  ];
}

function formatDate(date) {
  return `${date.getFullYear()}-${ date.getMonth() + 1 }-${ date.getDate()}`;
}
