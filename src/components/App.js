import React from 'react';
import Latest from './Latest';

class App extends React.PureComponent {
	render() {
		return (
			<div className="App">
				<Latest {...this.props} />
			</div>
		);
	}
}

export default App;
