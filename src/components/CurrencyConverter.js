import React from 'react';
import Input from './elements/Input';

const CurrencyConverter = ({baseCurrency}) => {
  return(
    <div className="col-md-12">
      <h3>Currency Converter</h3>
      <form className="form-inline">
        <p className="converter-emphasis">
          Today, 
          <Input className="form-control currency-amount" name="currencyAmount"/>
          {baseCurrency} is worth ?? USD
        </p>
      </form>
      
    </div>
  );
};
export default CurrencyConverter;