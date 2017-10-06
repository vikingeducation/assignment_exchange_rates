import React, { Component } from "react";
import CurrencyRatesTable from "./CurrencyRatesTable";
import BaseCurrencyForm from "./BaseCurrencyForm";

class CurrencyRatesTableContainer extends Component {
  render() {
    return (
      <section>
        <BaseCurrencyForm {...this.props} />
        <CurrencyRatesTable {...this.props} />
      </section>
    );
  }
}

export default CurrencyRatesTableContainer;
