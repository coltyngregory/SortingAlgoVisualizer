import React from 'react';
import { bubbleSortAnimations } from './sortingAlgorithms.js';
import { mergeSortAnimations } from './sortingAlgorithms.js';
import './sortingVisualizer.css';

const ANIMATIONS_SPEED_MS = 1;

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
		console.log("did it once");
		const array = this.state.array;
		const animations = bubbleSortAnimations(array);
		console.log(animations);
		const bars = document.getElementsByClassName("array-bar");
		// Make object for "for loop" efficiency: https://www.w3schools.com/js/js_performance.asp
		const animationLen = animations.length 
		console.log(animationLen);

		for (let i = 0; i < animationLen; i++) {
			setTimeout(() => {
				var [oldPosition, newPosition] = animations[i];
				var oldBarStyle = bars[oldPosition].style;
				var newBarStyle = bars[newPosition].style;

				var temp = this.state.array[oldPosition];
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
					this.makeAllBarsGreen();
					this.buttonToggle();
				}

			}, i * ANIMATIONS_SPEED_MS);
		}
		// this.buttonToggle(); it is because setTimeout() is async 
		console.log("did it again");
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
			<button disabled={!this.state.enableButtons} onClick={() => this.resetArray()}>Generate New Array</button>
			<button disabled={!this.state.enableButtons} onClick={() => this.bubbleSort()}>Bubble Sort this whore</button>
			</div>
			);
	}
}

export default SortingVisualizer;
