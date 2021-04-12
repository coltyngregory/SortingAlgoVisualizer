import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { getBubbleSortAnimations } from '../SortingAlgorithms/BubbleSort.js';
import { getMergeSortAnimations } from '../SortingAlgorithms/MergeSort.js';
import { getSelectionSortAnimations } from '../SortingAlgorithms/SelectionSort.js';

import FirePlace from './FirePlace.jsx';
import ControlPanel from './ControlPanel.jsx';


// This is the main color of the array bars.
const PRIMARY_COLOR = 'black';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// needed for makeFlamesMoveHelper function
var fireOn;

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            array: [],
            sortingAlgos: ["Bubble Sort", "Merge Sort", "Selection Sort"],
            sortingAlgoIdx: 0,
            sparkAFireButton: "Spark A Fire",
            fireSize: 10,
            isFireAlive: false,
            constantFire: true,
            sortButton: true,
            animationSpeed: 50,
            sliderSpeed: 50,
        };
    }

    resetArray() {
        const array = [];
        const arrayBars = document.getElementsByClassName("array-bar");

        for (let i = 0; i < this.state.fireSize; i++) {
            array.push(Math.floor((Math.random() * this.state.fireSize * 5) + 1));
        }
        this.setState({ array });
    }

    // handles state change for slider speed
    changeSliderSpeed = (e) => {
        this.setState({ sliderSpeed: e });
        console.log(this.state.sliderSpeed);
    }

    // changes the value for the sorting button which determines algorithm to execute
    previousAlgo = () => {
        let idx = this.state.sortingAlgoIdx;

        if (idx === 0) {
            this.setState({ sortingAlgoIdx: 2 });
        }else {
            this.setState({ sortingAlgoIdx: idx - 1 });
        };
    }

    nextAlgo = () => {
        const idx = this.state.sortingAlgoIdx;

        if (idx === 2) {
            this.setState({ sortingAlgoIdx: 0 });
        }else {
            this.setState({ sortingAlgoIdx: idx + 1 });
        };
    }


    // handles state change for child component ControlPanel
    handleChildStateIsFireAlive = (childState) => {
        this.setState({ isFireAlive: childState.isFireAlive });
        this.handleFireButtonState();
    }

    // handles actions required after fireButtonState state change. Is called from the helper function above
    handleFireButtonState() {
        if (!this.state.isFireAlive) {
            this.playAudio();
            this.makeFlamesMove();
        }
        this.setState({ isFireAlive: true }, () => {this.handleFireSize()});
    }  

    handleFireSize() {
        if (this.state.sparkAFireButton === "Add A Log") {
            this.setState({ fireSize: this.state.fireSize + 10});
        }else {
            this.setState({ sparkAFireButton: "Add A Log" });
        }
    }

    // updates the name of the "Spark A Fire" button
    handleFireButton() {

        this.playAudio();

        if (this.state.sparkAFireButton === "Add A Log") {
            this.setState({ fireSize: this.state.fireSize + 10});
            
        }else {
            this.setState({ sparkAFireButton: "Add A Log" }, () => { this.keepFireGoing() });
            
        }
    }

    // setTimeout's asynchronous nature is tricky. Flames stop when "Sort" button is called. 
    // to do this I call the makeFlamesMove method with a helper which is using a timeout which can be stopped using clearTimeout() method
    makeFlamesMoveHelper() {
        fireOn = setTimeout(() => { this.makeFlamesMove() }, 200);
    }

    makeFlamesMove() {
        this.resetArray();
        this.makeFlamesMoveHelper();
    }

    stopFlamesMoving() {
        clearTimeout(fireOn);
        this.setState({ sortButton: false });
    }


    // toggle audio
    playAudio() {
        let x = document.getElementById("audio");
        x.play();
    }

    pauseAudio() {
        let x = document.getElementById("audio");
        x.pause();
    }


    // executes the intended sort method using DRY principles
    startSort = () => {
        let algorithm = this.state.sortingAlgos[this.state.sortingAlgoIdx];

        this.pauseAudio();
        this.stopFlamesMoving();

        if (algorithm === "Bubble Sort") {
            this.bubbleSort();
        }

        if (algorithm === "Merge Sort") {
            this.mergeSort();
        }

        if (algorithm === "Selection Sort") {
            this.selectionSort();
        }
    }

    // animates virtual flames
    randomFireColour() {
        let randomIndex = (Math.floor((Math.random() * 5)));
        let colors = ["red", "orange", "orange", "orange", "yellow"];
        return colors[randomIndex];
    }

    // Sorting algorithms
    bubbleSort() {
        const [animations,sortArray] = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] == "comparisonOne" || animations[i][0] == "comparisonTwo";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] == "comparisonOne") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * this.state.sliderSpeed);
            }
            else {
                const [swap, barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * this.state.sliderSpeed);  
            }
            setTimeout(() => {
                if (i === animations.length - 1) {
                        console.log('here');
                        this.turnBarsGreen();
                    }
            }, i * this.state.sliderSpeed);
        }
    }

    mergeSort() {
        const [animations,sortArray] = getMergeSortAnimations(this.state.array);
        console.log(animations);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] == "comparisonOne" || animations[i][0] == "comparisonTwo";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const color = (animations[i][0] == "comparisonOne") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                //If we don't multiply by the index then every animations[i] wait for exactly this.state.sliderSpeed and immediately change into final state
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * this.state.sliderSpeed);
                
            }
            else {
                setTimeout(() => {
                    const [overwrite, barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                  },i * this.state.sliderSpeed);
            }
            setTimeout(() => {
                if (i === animations.length - 1) {
                        console.log('here');
                        this.turnBarsGreen();
                    }
            }, i * this.state.sliderSpeed);
        }
    }

    selectionSort() {
        const [animations,sortArray] = getSelectionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "comparisonOne") || (animations[i][0] === "comparisonTwo");
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] === "comparisonOne") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * this.state.sliderSpeed);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * this.state.sliderSpeed);  
            }
            setTimeout(() => {
                if (i === animations.length - 1) {
                        console.log('here');
                        this.turnBarsGreen();
                    }
            }, i * this.state.sliderSpeed);
        }
    }

    // Green sweep at the end to signal sorting completion
    turnBarsGreen() {
        const bars = document.getElementsByClassName("array-bar");
        const arrayLength = bars.length;
        for (let i = 0; i < arrayLength; i++) {
            setTimeout(() => {
                const barStyle = bars[i].style;
                barStyle.backgroundColor = 'green';
            }, i * this.state.sliderSpeed);
        }
    }

    render() {
        return (
            <Container>
                <Row noGutters={true}>
                    <Col sm={4} className="control-container">
                        <ControlPanel
                            fireSize={this.state.fireSize}
                            sparkAFireButton={this.state.sparkAFireButton}
                            sortButton={this.state.sortButton}
                            sortingAlgos={this.state.sortingAlgos}
                            sortingAlgoIdx={this.state.sortingAlgoIdx}
                            handleSortingAlgoIdx={(childState) => this.handleChildStateSortingAlgoIdx(childState)}
                            handleFireButtonState={(childState) => this.handleChildStateIsFireAlive(childState)}
                            nextAlgo={this.nextAlgo}
                            previousAlgo={this.previousAlgo}
                            startSort={this.startSort}
                            changeSliderSpeed={this.changeSliderSpeed}
                            sliderSpeed={this.state.sliderSpeed}
                        />
                    </Col>
                    <Col>
                        <FirePlace 
                            array={this.state.array}
                            randomFireColour={this.randomFireColour}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SortingVisualizer;