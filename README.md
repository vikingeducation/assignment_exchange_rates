# assignment_exchange_rates
How much does a Big Mac cost in Italy?

1. rename the project something descriptive and interesting (name the technology after the name)

2. deploy on heroku

3. *** (optional) Add some other stuff to make the upload faster

Project Summary:

This application allows the user to compare values of currency exchange rates for a specified currency. Users have the option to select the currency of comparison, the year of comparison, and the number of exchange tables for X number of previous years.

When these options are selected, the data will be displayed to the user in table format.

2. link to where its deployed on heroku

Link for running this application on heroku:



To run this application on your own, follow these steps:

  1. Clone this repo from github
  2. run "npm i" in the root of the project to obtain libraries
  3. run "npm start" from the root of the project

4. The key technologies used

Emphasized Technologies:
  1. React

Interesting Technical Components:

One of my first React projects and I'm already falling in love with the component modularity. Super easy to make modular table and select components
but it's pretty standard for the most part.

When using react, I did use fetch to get the currency exchange rate info from the fixer.io API which was interesting to play with. Because each time currency was data selected, it was mapped onto an array (because there was the option to select multiple years), I had to wrap the mapped array in a Promise.all.

Lastly, I definitely enjoyed the structure in which when a selection option was pressed, it set off a handler which then ran the getExchangeRates function, thus changing the overall state of App.js, which in turn rerendered the tables. Not sure if this would work well in a deeply nested structure. I feel like it's bad practice to pass a handler through many layers.
