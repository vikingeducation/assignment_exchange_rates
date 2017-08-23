import React from 'react';
import Latest from './Latest';

class App extends React.PureComponent {
	render() {
		return (
			<div className="App">
				<Latest
					getLatest={this.props.getLatest}
					latestRates={this.props.latestRates}
				/>
			</div>
		);
	}
}

export default App;
