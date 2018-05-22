import React from 'react';
import {Table} from 'semantic-ui-react';

const ExchangeRatesList = ({ rates }) => {
  const ratesList = [];
  for (let key in rates) {
    if (rates.hasOwnProperty(key)) {
      ratesList.push(
        <Table.Row key={key}>
          <Table.Cell>{key}</Table.Cell>
          <Table.Cell>{rates[key]}</Table.Cell>
        </Table.Row>
      )
    }
  }

  return (
    <section className="exchange-rate-list">

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