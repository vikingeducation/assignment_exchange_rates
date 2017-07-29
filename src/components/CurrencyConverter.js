import React from 'react';
import Input from './elements/Input';

const CurrencyConverter = ({baseCurrency, comparisonCurrency, conversionAmount, conversionResult, onChange}) => {
  return(
    <div className="col-md-4">
      <h3>Currency Converter</h3>
      <form className="form-inline">
        <p className="converter-emphasis">
          Today, 
          <Input 
            className="form-control currency-amount"
            name="currencyAmount"
            defaultValue={conversionAmount}
            onChange={onChange}
            type="number"
            />
          {baseCurrency} is worth {conversionResult} {comparisonCurrency}
        </p>
      </form>
      
    </div>
  );
};
export default CurrencyConverter;