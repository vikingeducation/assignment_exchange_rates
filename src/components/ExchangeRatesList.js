import React from 'react';
import {Table, Header} from 'semantic-ui-react';

const ExchangeRatesList = ({ rates }) => {
  const ratesList = [];
  const currency = 'EUR';
  for (let key in rates) {
    if (rates.hasOwnProperty(key)) {
      ratesList.push(
        <Table.Row>
          <Table.Cell>{key}</Table.Cell>
          <Table.Cell>{rates[key]}</Table.Cell>
        </Table.Row>
      )
    }
  }

  return (
    <section>
      <Header as="h1" size="medium">Latest rates for {currency}</Header>
      <Table celled columns={2}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Currency</Table.HeaderCell>
            <Table.HeaderCell>Rate</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {ratesList}
        </Table.Body>
      </Table>
    </section>
  );
};

export default ExchangeRatesList;