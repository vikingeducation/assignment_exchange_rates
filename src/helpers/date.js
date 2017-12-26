export function getHistoricalDates() {
  let thisYear = new Date().getFullYear();
  let dates = [];

  for (var i = 1; i <= 5; i++) {
    let date = new Date();
    date.setYear(thisYear - i);
    dates.push(formatDate(date));
  }

  return dates;
}

function formatDate(date) {
  return `${date.getFullYear()}-${ date.getMonth() + 1 }-${ date.getDate()}`;
}
