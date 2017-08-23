import React from "react";
import JumbotronFluid from "./elements/JumbotronFluid";
import Alert from "./elements/Alert";
import Showable from "./elements/Showable";
import ExchangeRates from "./ExchangeRates";
import Select from "./elements/Select";
import Input from "./elements/Input";
import bigMacData from "../big_mac_2017_01";

const App = ({
  error,
  rates,
  handlers,
  selectedCurrency,
  selectedCompareCurrency,
  comparedRates,
  convertAmount
}) => {
  let usdRate;
  const rate = rates.reduce((acc, rate) => {
    if (rate.Country === "USD") {
      usdRate = rate.Rate;
    }
    return rate.Country === selectedCompareCurrency ? rate.Rate : acc;
  }, null);
  const result = rate * convertAmount;
  const burgerPrice = bigMacData.data.map(country => {
    return {
      Country: country.Country,
      Price: (country.dollar_price / usdRate).toFixed(2)
    };
  });

  return (
    <div className="container">
      <JumbotronFluid heading="xChange Rates" lead="Use ALL THE MONEY" />
      <Showable show={error}>
        <Alert type="danger">Oops, there was a problem...</Alert>
      </Showable>
      <div className="col-sm-4">
        <h3>Select a Currency</h3>
        <Select
          options={rates.map(rate => rate.Country)}
          onChange={handlers.selectCurrency}
          value={selectedCurrency}
        />
        <ExchangeRates rates={rates} headers={["Country", "Rate"]} />
      </div>
      <div className="col-sm-4">
        <h3>Compare it to another currency, Across THE SPAN OF TIME</h3>
        <Select
          options={rates.map(rate => rate.Country)}
          onChange={handlers.selectCompareCurrency}
          value={selectedCompareCurrency}
        />
        <ExchangeRates rates={comparedRates} headers={["Year", "Rate"]} />
      </div>
      <div className="col-sm-4">
        <h3>
          Convert from {selectedCurrency} to {selectedCompareCurrency}
        </h3>
        <Input value={convertAmount} onChange={handlers.updateConversion} />
        <h4>
          Result: {result}
        </h4>
      </div>
      <div className="col-sm-4">
        <h3>
          Big Mac Price in {selectedCurrency}
        </h3>
        <ExchangeRates rates={burgerPrice} headers={["Country", "Price"]} />
      </div>
    </div>
  );
};

export default App;
