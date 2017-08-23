import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const ExchangeRate = ({ country, rate }) => {
	return (
		<ListGroupItem>
			{country}: {rate}
		</ListGroupItem>
	);
};

export default ExchangeRate;
