import React from "react";
import Table from "./elements/Table";

const ExchangeRates = ({ rates, headers }) => {
  return (
    <div>
      <Table headers={headers} rows={rates} />
    </div>
  );
};

export default ExchangeRates;
