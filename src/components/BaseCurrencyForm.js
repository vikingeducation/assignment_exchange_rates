import React from "react";
import Select from "./elements/Select";
import Button from "./elements/Button";

const BaseCurrencyForm = props => {
  const {
    rates,
    baseCurrency,
    switch_currency,
    onSubmit,
    setDate,
    date
  } = props;

  return (
    <form className="container" id="ChooseBaseCurrency" onSubmit={onSubmit}>
      <Select
        className="form-control"
        name="baseCurrency"
        form="ChooseBaseCurrency"
        switch_currency={switch_currency}
        rates={rates}
        baseCurrency={baseCurrency}
      />
      <input
        className="form-control"
        type="date"
        name="rateDate"
        value={date}
        onChange={setDate}
      />
      <br />
      <Button type="submit" color="primary" />
    </form>
  );
};

BaseCurrencyForm.defaultProps = {
  type: "button",
  color: "default",
  children: "Submit"
};

export default BaseCurrencyForm;
