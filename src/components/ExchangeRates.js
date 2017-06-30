import React from 'react';
import Select from './elements/Select';
import InputGroup from './elements/InputGroup';
import Table from './elements/Table';

const ExchangeRates = ({baseCurrency, allCurrencies, exchangeRates, isFetchingRates, onChange}) => {
  return(
    <div className="col-md-4">
      <h3>Exchange Rates for</h3>
      <h3>{baseCurrency}</h3>
      <form>
        <InputGroup labelText="Select Base Currency">
          <Select
            options={allCurrencies}
            defaultValue="EUR"
            onChange={onChange}
          />
        </InputGroup>
      </form>
      {isFetchingRates ? <span className="img-loader"></span> : 
        <Table 
          headers={["Base Currency", "Exchange Rate"]}
          data={exchangeRates}
        />
      }
    </div>
  );
};
export default ExchangeRates;