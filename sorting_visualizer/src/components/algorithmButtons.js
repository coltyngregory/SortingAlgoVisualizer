import React from 'react';
import { Button } from 'react-bootstrap';

class AlgorithmButtons extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
 	 		<div>
				<p className="buttons"></p>
				<Button disabled={this.props.fireSize >= 30} variant="danger" onClick={() => this.props.handleFire()}>{this.props.sparkAFireButton}</Button>
				<p className="buttons"></p>
				<Button className="algoButton" variant="success" onClick={() => this.props.previousAlgo()}>🢀</Button><Button onClick={() => this.props.startSort()} variant="primary">{this.props.sortingAlgos[this.props.sortingAlgoIdx]}</Button><Button className="algoButton" variant="success" onClick={() => this.props.nextAlgo()}>🢂</Button>
				<Button disabled={this.props.fireSize >= 30} variant="danger" onClick={() => this.props.handleFire()}>{this.props.sparkAFireButton}</Button>
			</div>		
		)
	}
}

export default AlgorithmButtons;