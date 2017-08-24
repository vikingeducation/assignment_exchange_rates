async function bob() {
  // Serially == BAD
  let history = [];
  for (let date of COMPARE_DATES) {
    const year = await this.doTheFetch(againstCurrency, date);
    history.push({
      Year: year.date,
      Rate: year.rates[compareCurrency]
    });
  }

  let history = [];
  for (let date of COMPARE_DATES) {
    history.push(
      this.doTheFetch(againstCurrency, date).then(year => {
        return {
          Year: year.date,
          Rate: year.rates[compareCurrency]
        };
      })
    );
  }

  let history = [];
  for (let date of COMPARE_DATES) {
    history.push(
      (async () => {
        const year = await this.doTheFetch(againstCurrency, date);
        return {
          Year: year.date,
          Rate: year.rates[compareCurrency]
        };
      })()
    );
  }

  let history = await Promise.all(
    COMPARE_DATES.map(async date => {
      const year = await this.doTheFetch(againstCurrency, date);
      return {
        Year: year.date,
        Rate: year.rates[compareCurrency]
      };
    })
  );
}
