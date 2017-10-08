import React from "react";
import Select from "./elements/Select";
import Button from "./elements/Button";

const BaseCurrencyForm = props => {
  const { onSubmit, date, setDate } = props;

  return (
    <form className="container" id="ChooseBaseCurrency" onSubmit={onSubmit}>
      <Select
        className="form-control"
        name="baseCurrency"
        form="ChooseBaseCurrency"
        {...props}
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
