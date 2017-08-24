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
        <h3>Compare it to another currency</h3>
        <Select
          options={rates.map(rate => rate.Country)}
          onChange={handlers.selectCompareCurrency}
          value={selectedCompareCurrency}
        />
        <h4>
          Convert {selectedCurrency} to {selectedCompareCurrency}
        </h4>
        <Input
          min="0"
          type="number"
          value={convertAmount}
          onChange={handlers.updateConversion}
        />
        <h5>
          Result: {result}
        </h5>
        <h4>Historical Prices:</h4>
        <ExchangeRates rates={comparedRates} headers={["Date", "Rate"]} />
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
