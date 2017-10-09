import React from "react";
import CurrencyRatesTable from "./CurrencyRatesTable";
import BaseCurrencyForm from "./BaseCurrencyForm";

const CurrencyRatesTableContainer = props => {
  //console.log("Table props", props);
  return (
    <section>
      <BaseCurrencyForm {...props} />
      <CurrencyRatesTable {...props} />
    </section>
  );
};

export default CurrencyRatesTableContainer;
