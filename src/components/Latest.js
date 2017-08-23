import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import ExchangeRate from './elements/ExchangeRate';

class Latest extends React.PureComponent {
	render() {
		return (
			<ListGroup>
				<ListGroupItem>
					<h3>
						<strong>Base: </strong>
						{this.props.latestRates.base}
					</h3>
				</ListGroupItem>
				{this.props.latestRates.rates.map(latestRate =>
					<ExchangeRate {...latestRate} />
				)}
			</ListGroup>
		);
	}
}

export default Latest;
