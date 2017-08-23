import React from "react";
import Table from "./elements/Table";

const ExchangeRates = ({ rates }) => {
  let headers = ["Country", "Rate"];
  let rows = Object.entries(rates).map(([Country, Rate]) => {
    return {
      Country: Country,
      Rate: Rate
    };
  });
  return (
    <div>
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default ExchangeRates;
