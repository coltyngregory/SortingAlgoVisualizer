import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { getBubbleSortAnimations } from '../SortingAlgorithms/BubbleSort.js';
import { getMergeSortAnimations } from '../SortingAlgorithms/MergeSort.js';
import { getSelectionSortAnimations } from '../SortingAlgorithms/SelectionSort.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'black';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

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

    clearArray() {
        const array = [];
        const arrayBars = document.getElementsByClassName("array-bar");

    }

    previousAlgo() {
        let idx = this.state.sortingAlgoIdx;

        if (idx === 0) {
            this.setState({ sortingAlgoIdx: 2 });
        }else {
            this.setState({ sortingAlgoIdx: idx - 1 });
        };
    }

    nextAlgo() {
        const idx = this.state.sortingAlgoIdx;

        if (idx === 2) {
            this.setState({ sortingAlgoIdx: 0 });
        }else {
            this.setState({ sortingAlgoIdx: idx + 1 });
        };
    }

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

    handleFireButton() {

        this.playAudio();

        if (this.state.sparkAFireButton === "Add A Log") {
            this.setState({ fireSize: this.state.fireSize + 10});
            
        }else {
            this.setState({ sparkAFireButton: "Add A Log" }, () => { this.keepFireGoing() });
            
        }
    }

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

    setTimeoutForKeepFireGoing() {

        fireOn = setTimeout(() => { this.keepFireGoing() }, 5000);
        this.keepFireGoing();
    }

    stopKeepFireGoingSetTimeout() {
        clearTimeout(fireOn);
    }

    playAudio() {
        let x = document.getElementById("audio");
        x.play();
    }

    pauseAudio() {
        let x = document.getElementById("audio");
        x.pause();
    }

    startSort() {
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
    //     setTimeout(() => )
    }

    randomFireColour() {
        let randomIndex = (Math.floor((Math.random() * 5)));
        let colors = ["red", "orange", "orange", "orange", "yellow"];
        return colors[randomIndex];
    }

    bubbleSort() {
        const [animations,sortArray] = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [swap, barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
    }

    mergeSort() {
        const [animations,sortArray] = getMergeSortAnimations(this.state.array);
        console.log(animations);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] == "comparision1" || animations[i][0] == "comparision2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const [comparision, barOneIndex, barTwoIndex] = animations[i];
                const color = (animations[i][0] == "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                //If we don't multiply by the index then every animations[i] wait for exactly ANIMATION_SPEED_MS and immediately change into final state
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
                
            }
            else {
                setTimeout(() => {
                    const [overwrite, barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                  },i * ANIMATION_SPEED_MS);
            }
        }
    }

    selectionSort() {
        const [animations,sortArray] = getSelectionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
    }

    render() {
        return (
            <Container>
                <Row noGutters={true}>
                    <Col sm={4} className="control-container">
                        <h3>Sorting Visualizer</h3>
                        <audio loop="loop" id="audio" src="fire.mp3" type="audio/mpeg" />
                        <p className="buttons"></p>
                        <Button disabled={this.state.fireSize >= 30} variant="danger" onClick={() => this.handleFireButtonState()}>{this.state.sparkAFireButton}</Button>
                        <p className="buttons"></p>
                        <Button disabled={!this.state.sortButton} className="algoButton" variant="success" onClick={() => this.previousAlgo()}>🢀</Button><Button disabled={!this.state.sortButton} onClick={() => this.startSort()} variant="primary">{this.state.sortingAlgos[this.state.sortingAlgoIdx]}</Button><Button disabled={!this.state.sortButton} className="algoButton" variant="success" onClick={() => this.nextAlgo()}>🢂</Button>
                    </Col>
                    <Col>
                        <div>
                            <div sm={8} className="array-container">
                                <div className="flames">
                                    {this.state.array.map((value, idx) => (
                                    <div
                                        className="array-bar"
                                        key={idx}
                                        style={{height: `${value}px`, backgroundColor: this.randomFireColour()}}>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SortingVisualizer;