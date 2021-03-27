import React from 'react';
import { bubbleSortAnimations } from './sortingAlgorithms.js';
import './sortingVisualizer.css';

const ANIMATIONS_SPEED_MS = 1;

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
		this.makeAllBarsRed();
		
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

	bubbleSort() {
		const array = this.state.array;
		const animations = bubbleSortAnimations(array);
		const bars = document.getElementsByClassName("array-bar");

		for (let i = 0; i < animations.length; i++) {
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
				}

			}, i * ANIMATIONS_SPEED_MS);
		}
	}

	makeAllBarsGreen() {
		console.log("Sorted");
		const arrayBars = document.getElementsByClassName("array-bar");
		var arrayLength = arrayBars.length;

		for (let j = 0; j < arrayLength; j++) {
			var jBarStyle = arrayBars[j].style;
			jBarStyle.backgroundColor = "limegreen";
		}
	}

	makeAllBarsRed() {
		console.log("Sorted");
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
			<button onClick={() => this.resetArray()}>Generate New Array</button>
			<button onClick={() => this.bubbleSort()}>Bubble Sort this whore</button>
			</div>
			);
	}

}

export default SortingVisualizer;
