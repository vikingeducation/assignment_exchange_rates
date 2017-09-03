Project Summary:

This application allows the user to compare values of currency exchange rates for a specified currency. Users have the option to select the currency of comparison, the year of comparison, and the number of exchange tables for X number of previous years.

When these options are selected, the data will be displayed to the user in table format.

Link for running this application on heroku:

https://currency-exchange-rates-react.herokuapp.com/

Application Instructions:

To use the app, simply change one of the selection options: "Currency Options", "Year Options", or "Previous Years Options". Based upon the options selected, the correct information with appropriate number of tables will display.


Emphasized Technologies:
  1. React

Interesting Technical Components:

One of my first React projects and I'm already falling in love with the component modularity. Super easy to make modular table and select components but it's pretty standard for the most part. The components make it so that modifying the date options is as easy as changing the sizes of the arrays for "dateYearOptions" and "previousYearsOptions" in the state for App.js so you can increase or restrict year and previousYears options.

When using react, used fetch to get the currency exchange rate info from the fixer.io API which was interesting to play with. Each time currency was data selected, it was mapped onto an array (because there was the option to select multiple years), so we wrapped the mapped array in a Promise.all

Lastly, I personally enjoyed the structure in which when a selection option was pressed, it set off a handler which then ran the getExchangeRates function, thus changing the overall state of App.js, which in turn rerendered the tables. Not sure if this would work well in a deeply nested structure. I feel like it's bad practice to pass a handler through many layers.
