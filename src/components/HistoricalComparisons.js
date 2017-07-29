import React from 'react';
import Select from './elements/Select';
import InputGroup from './elements/InputGroup';
import Table from './elements/Table';

const HistoricalComparisons = (props) => {
  const {
    baseCurrency,
    allCurrencies,
    comparisons,
    comparisonCurrency,
    isFetchingComparisons,
    onChange
  } = props;
  return(
    <div className="col-md-4">
      <h3>Historical Rates for</h3>
      <h3>{baseCurrency} to {comparisonCurrency}</h3>
      <form>
        <InputGroup labelText="Select Comparison Currency">
          <Select
            options={allCurrencies}
            onChange={onChange}
            defaultValue="USD"
          />
        </InputGroup>
      </form>
      {isFetchingComparisons ? <span className="img-loader"></span> : 
        <Table 
          headers={["Date", "Exchange Rate"]}
          data={comparisons}
        />
      }
    </div>
  );
};
export default HistoricalComparisons;