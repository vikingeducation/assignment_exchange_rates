export function getAllCurrencies(json) {
  let results = [];
  for (let currency in json.rates) {
    results.push(currency);
  }

  return results;
};