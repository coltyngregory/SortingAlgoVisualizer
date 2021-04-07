import React from 'react';
import { Conatiner, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

	const GenerateButton = styled.button`
		font-size: 2em;
		padding: 0.25em 1em;
		border: 2px solid blue;
		background-color: ${(props) => props.backgroundColour ? props.backgroundColour : "blue" };

		&:hover {
			background-color: green;
		}
	`;


export class InputLayout extends React.Component {
	constructor(props) {
		super(props);
	}

	// increment() {
	// 	this.props.increment;
	// 	console.log('increment');
	// }

	// decrement() {
	// 	this.props.decrement;
	// 	console.log('decrement');
	// }

	// decideAlgorithm() {
	// 	this.props.decideAlgorithm;
	// 	console.log('decideAlgorithm');
	// }

	render() {
		return(
			<div>
				<Col >
					<GenerateButton backgroundColour="red" onClick={(() => this.setState({ fireOn: true }))}>Spark a fire</GenerateButton >
				</Col >
				<Col >
					<GenerateButton disabled={this.props.countIdx == 0} backgroundColour='yellow' onClick={this.props.decrement}>/* == */</GenerateButton >
					<GenerateButton onClick={this.props.decideAlgorithm}>{ this.props.sortingAlgo[this.props.countIdx] }</GenerateButton >
					<GenerateButton disabled={this.props.countIdx == 2} backgroundColour='teal' onClick={this.props.increment}>/* ==> */</GenerateButton >
				</Col >
			</div>
		);
	}
}

export default InputLayout;