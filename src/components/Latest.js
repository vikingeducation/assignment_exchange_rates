import React from 'react';
import { ListGroup } from 'react-bootstrap';
import CurrencyControls from './elements/CurrencyControls';
import ExchangeRate from './elements/ExchangeRate';

class Latest extends React.PureComponent {
	render() {
		console.log(this.props);
		return (
			<ListGroup>
				<CurrencyControls
					base={this.props.base}
					comp={this.props.comp}
					getLatest={this.props.getLatest}
					{...this.props.latestRates}
				/>
				<div className="container">
					{this.props.latestRates.rates.map(latestRate =>
						<ExchangeRate {...latestRate} key={latestRate.country} />
					)}
				</div>
			</ListGroup>
		);
	}
}

export default Latest;
