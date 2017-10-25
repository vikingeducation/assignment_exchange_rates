import React from "react";
import JumbotronFluid from "./elements/JumbotronFluid";
import Dropdown from "./elements/Dropdown";
import Results from "./elements/Results";
import Input from "./elements/Input";

const App = ({
  currency,
  isFetching,
  currToConvert,
  currConverted,
  converted,
  convertedAmount,
  lastYearConverted,
  twoYearsAgoConverted,
  threeYearsAgoConverted,
  onChangeInput,
  onChangeOutput,
  onChangeAmount
}) => {
  return (
    <div className="container-fluid">
      <JumbotronFluid
        heading="Exchange Rates and Big Macs"
        lead="Currency Exchange Rate App"
      />
      <Dropdown
        currency={currency}
        selected={currToConvert}
        isFetching={isFetching}
        onChange={onChangeInput}
        label={"Currency To Convert"}
        name={"currToConvert"}
      />
      <Dropdown
        currency={currency}
        selected={currConverted}
        isFetching={isFetching}
        onChange={onChangeOutput}
        label={"Currency Converted"}
        name={"currConverted"}
      />
      <label>
        <h4>Amount:</h4>
      </label>
      <Input
        name={"amount"}
        value={convertedAmount}
        onChange={onChangeAmount}
      />
      <br />
      <h3>--Today--</h3>
      <Results
        converted={converted}
        amountEntered={convertedAmount}
        currency1={currToConvert}
        currency2={currConverted}
        isFetching={isFetching}
      />{" "}
      <br />
      <h3>--Last Year--</h3>
      <Results
        converted={lastYearConverted}
        amountEntered={convertedAmount}
        currency1={currToConvert}
        currency2={currConverted}
        isFetching={isFetching}
      />{" "}
      <br />
      <h3>--2 Years Ago--</h3>
      <Results
        converted={twoYearsAgoConverted}
        amountEntered={convertedAmount}
        currency1={currToConvert}
        currency2={currConverted}
        isFetching={isFetching}
      />{" "}
      <br />
      <h3>--3 Years Ago--</h3>
      <Results
        converted={threeYearsAgoConverted}
        amountEntered={convertedAmount}
        currency1={currToConvert}
        currency2={currConverted}
        isFetching={isFetching}
      />{" "}
      <br />
    </div>
  );
};

export default App;
