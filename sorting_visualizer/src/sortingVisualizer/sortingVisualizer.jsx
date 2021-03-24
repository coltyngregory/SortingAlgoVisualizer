import React from 'react';
import './sortingVisualizer.css';

export class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
		};
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		const array = [];
		for (let i = 0; i < 99; i++) {
			array.push(this.randomInt());
		}
		this.setState({array});
		console.log(this.state.array);
	}

	randomInt() {
		return Math.floor((Math.random() * 400) + 1);
	}

	render() {
		const {array} = this.state;

		return(
			<div className="array-container">
			{array.map((value, idx) => (
				<div
				className="array-bar"
				key={idx}
				style={{height: `${value}px`}}>
				</div>
				))}
			<br/>
			<button onClick={() => this.resetArray()}>Generate New Array</button>
			</div>
			);
	}

}

export default SortingVisualizer;
