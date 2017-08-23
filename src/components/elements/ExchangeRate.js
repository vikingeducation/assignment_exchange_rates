import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const ExchangeRate = ({ country, rate }) => {
	<ListGroupItem>
		{country}: {rate}
	</ListGroupItem>;
};

export default ExchangeRate;
