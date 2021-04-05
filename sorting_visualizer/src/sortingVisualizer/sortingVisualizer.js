import React, { useState, component } from 'react';
import styled, { css, keyframes } from 'styled-components';
//import { Button } from 'react-bootstrap';
import { Container, Row, Col, Alert } from 'react-bootstrap';
//import { GenerateButton } from '../components/Button.style.js'
import { bubbleSortAnimations } from './sortingAlgorithms.js';
import { mergeSortAnimations } from './sortingAlgorithms.js';
import './sortingVisualizer.css';

const ANIMATIONS_SPEED_MS = 1;

// function AlertDismissible() {
//   const [show, setShow] = useState(true);

//   return (
//     <div>
//       <Alert show={show} variant="success">
//         <Alert.Heading>How's it going?!</Alert.Heading>
//         <p>
//           Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
//           lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
//           fermentum.
//         </p>
//         <hr />
//         <div className="d-flex justify-content-end">
//           <Button onClick={() => setShow(false)} variant="outline-success">
//             Close me y'all!
//           </Button>
//         </div>
//       </Alert>

//       {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
//     </div>
//     );
// }
	const GenerateButton = styled.button`
	font-size: 2em;
	padding: 0.25em 1em;
	border: 2px solid blue;
	background-color: ${(props) => props.backgroundColour ? props.backgroundColour : "blue" };

	&:hover {
		background-color: green;
	}
`;


	const Visualizer = styled.div`
		display: inline;
		border: 20px solid black;
		border-radius: 50px;
	`;

	const ColDiv = styled.div`
		padding: 10px;
	`;

	const PageContainer = styled.div`
		text-align: center;
	`;



	const sideToSideSlide = keyframes`
		0%{
			background: aqua;
			box-shadow: 0 0 10px aqua;
			width: 10px;
			left: 0;
		}
		25%{
			background: aqua;
			box-shadow: 0 0 10px aqua;
			width: 100px;
			left: 0;
		}
		50%{
			background: greenyellow;
			box-shadow: 0 0 10px greenyellow;
			width: 10px;
			left: 90px;
		}
		75%{
			background: greenyellow;
			box-shadow: 0 0 10px greenyellow;
			width: 100px;
			left: 0px;			
		}
		100%{
			background: aqua;
			box-shadow: 0 0 10px aqua;
			width: 10px;
			left: 0px;
		}
	`;

	const LoadingSlider = styled.div`
		position: sticky;
		diplay: center;
		margin-top: 20px;
		margin-botton: 10px;
		height: 10px;
		width: 10px;
		border-radius: 5px;
		background: aqua;
		box-shadow: 0 0 10px aqua;
		animation: ${sideToSideSlide} 2s ease infinite;
	`;


export class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
			enableButtons: false,
			fireOn: true,
			sortingAlgo: ['Bubble Sort', 'Merge Sort', 'Selection Sort'],
			countIdx: 0,

		};
	}

	componentDidMount() {
		if (this.enableButtons) {
			this.resetArray();
		}
	}

	componentDidUpdate() {
		setTimeout(() => {
			if (this.state.fireOn) { 
				this.resetArray()  
			} 
		}, 150)
	}

	buttonToggle() {
		this.setState({ enableButtons: !this.state.enableButtons });
	}

	resetArray() {

		this.makeAllBarsRed();
		const array = [];

		for (let i = 0; i < 50; i++) {
			array.push(this.randomInt());
		}
		this.setState({array});
	}

	randomInt() {
		return Math.floor((Math.random() * 400) + 1);
	}

	bubbleSort() {
		this.setState({ fireOn: false })
		this.buttonToggle();
		const array = this.state.array;
		const animations = bubbleSortAnimations(array);
		const bars = document.getElementsByClassName("array-bar");
		// Make object for "for loop" efficiency: https://www.w3schools.com/js/js_performance.asp
		const animationLen = animations.length 

		if (animations.length === 0) {
			this.setState({ enableButtons: true });
		}

		for (let i = 0; i < animationLen; i++) {
			setTimeout(() => {
				var [oldPosition, newPosition] = animations[i];
				var oldBarStyle = bars[oldPosition].style;
				var newBarStyle = bars[newPosition].style;

				var temp = this.state.array[oldPosition];
				// https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
				this.state.array[oldPosition] = this.state.array[newPosition];
				this.state.array[newPosition] = temp;

				oldBarStyle.height = `${this.state.array[oldPosition]}px`;
				newBarStyle.height = `${this.state.array[newPosition]}px`;

				oldBarStyle.backgroundColor = "blue";
				newBarStyle.backgroundColor = "yellow";

				var currentPosition = oldPosition;
				for (let j = 0; j < currentPosition; j++) {
					var jbar = bars[j].style;
					jbar.backgroundColor = "blue";
				}
				if (i === animations.length - 1) {
					this.buttonToggle();
					this.makeAllBarsGreen();
				}

			}, i * ANIMATIONS_SPEED_MS);
		}
	}

	decideAlgorithm() {
		const array = this.state.sortingAlgo;
		const idx = this.state.countIdx;

		if (array[idx] == 'Bubble Sort') {
			console.log("bubble");
			this.bubbleSort();
		}

		if (array[idx] == 'Merge Sort') {
			console.log("Merge Sort");
		}

		if (array[idx] == 'Selection Sort') {
			console.log("Selection Sort");
		}
	}

	increment() {
		this.setState({ countIdx: this.state.countIdx + 1 });
	}

	decrement() {
		this.setState({ countIdx: this.state.countIdx - 1 });
	}


	makeAllBarsGreen() {
		const arrayBars = document.getElementsByClassName("array-bar");
		var arrayLength = arrayBars.length;

		for (let j = 0; j < arrayLength; j++) {
			setTimeout(() => {
				var jBarStyle = arrayBars[j].style;
				jBarStyle.backgroundColor = "limegreen";
			}, j * 16);
		}
	}

	makeAllBarsRed() {
		const arrayBars = document.getElementsByClassName("array-bar");
		var arrayLength = arrayBars.length;

		for (let j = 0; j < arrayLength; j++) {
			var jBarStyle = arrayBars[j].style;
			jBarStyle.backgroundColor = "red";
		}
	}

	mymethod(e) {
		alert(e);
	}

	render() {
		const test = false;
		const {array} = this.state;
		console.log("rendered");


		return(
			<PageContainer >
			<LoadingSlider />
				<Container fluid='lg'>
					<Row >
							<Col lg={true}>
								<GenerateButton disabled={test} backgroundColour="red" onClick={(() => this.setState({ fireOn: true }))}>Spark a fire</GenerateButton >
							
							</Col >
							<Col >
								<GenerateButton disabled={this.state.countIdx == 0} backgroundColour='yellow' onClick={(() => this.decrement())}>/* == */</GenerateButton >
								<GenerateButton onClick={(() => this.decideAlgorithm())}>{ this.state.sortingAlgo[this.state.countIdx] }</GenerateButton >
								<GenerateButton disabled={this.state.countIdx == 2} backgroundColour='teal' onClick={(() => this.increment())}>/* ==> */</GenerateButton >
							</Col >
					</Row >
					<Row >
						<Col lg={true}>
							<Visualizer >
								{array.map((value, idx) => (
								<div
								className="array-bar"
								key={idx}
								style={{height: `${value}px`}}>
								</div>
								))}
							</Visualizer > 
							<LoadingSlider />
						</Col >
					</Row >	
				</Container >
				<LoadingSlider />
			</PageContainer >
			);
	}
}

export default SortingVisualizer;









































