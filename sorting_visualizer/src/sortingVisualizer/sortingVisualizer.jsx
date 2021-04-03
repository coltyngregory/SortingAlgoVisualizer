import React, { useState, component } from 'react';
import styled, { css } from 'styled-components';
//import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
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

	const Button = styled.button`
	background: transparent;
	border-radius: 3px;
	border: 6px solid red;
	color: red;
	margin: 0 1em;
	padding: 0.25em 1em;
	`

	const ArrayContainer = styled.div`
		position: right;
		left: 1000px;
	`


export class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
			enableButtons: true,
		};
	}

	componentDidMount() {
		this.resetArray();
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

	render() {
		const {array} = this.state;
		console.log("rendered");


		return(
			<ArrayContainer>
			{array.map((value, idx) => (
				<div
				className="array-bar"
				key={idx}
				style={{height: `${value}px`}}>
				</div>
				))}
			<br/>
			<Button disabled={!this.enableButtons} onClick={() => this.resetArray()}>Generate New Array</Button>
			<Button disabled={this.enableButtons} onClick={() => this.bubbleSort()}>Bubble Sort</Button>
			</ArrayContainer>
			);
	}
}

export default SortingVisualizer;











































