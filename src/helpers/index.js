export function getAllCurrencies(json) {
  let results = ["EUR"];
  for (let currency in json.rates) {
    results.push(currency);
  }

  return results.sort();
};