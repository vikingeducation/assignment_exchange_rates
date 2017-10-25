import React from "react";
import JumbotronFluid from "./elements/JumbotronFluid";
import Dropdown from "./elements/Dropdown";
import Results from "./elements/Results";

const App = ({
  currency,
  isFetching,
  currToConvert,
  currConverted,
  converted,
  onChangeInput,
  onChangeOutput
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
      <Results
        converted={converted}
        currency1={currToConvert}
        currency2={currConverted}
        isFetching={isFetching}
      />
    </div>
  );
};

export default App;
