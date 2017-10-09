import React, { Component } from "react";
import Table from "./elements/Table";

const CurrencyRatesTable = props => {
  return (
    <div className="currency_table">
      <Table {...props} />
    </div>
  );
};

export default CurrencyRatesTable;
