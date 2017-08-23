import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

class ExchangeRate extends React.PureComponent {
	render() {
		return (
			<ListGroupItem>
				{this.props.country}: {this.props.rate}
			</ListGroupItem>
		);
	}
}

export default ExchangeRate;
