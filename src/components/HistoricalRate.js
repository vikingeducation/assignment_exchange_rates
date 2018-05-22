import React from 'react';
import {Segment} from 'semantic-ui-react';

const HistoricalRate = ({rate}) => {
  return (
    <Segment>
      <p>
        <strong>Rate:</strong> {rate}
      </p>
    </Segment>
  )
};

export default HistoricalRate;