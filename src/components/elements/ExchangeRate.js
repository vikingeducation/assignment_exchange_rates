import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

class ExchangeRate extends React.PureComponent {
	render() {
		const { historicals } = this.props;
		console.log(historicals);

		return (
			<ListGroupItem>
				<div className="row">
					<div className="col-md-3">
						{this.props.country}: <strong>{this.props.rate}</strong>
					</div>
					{historicals !== undefined
						? historicals.map(h =>
								<div key={h.date} className="col-md-3">
									({h.date}): <strong>{h.rates[this.props.country]}</strong>
								</div>
							)
						: ''}
				</div>
			</ListGroupItem>
		);
	}
}

export default ExchangeRate;
