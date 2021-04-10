import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { getBubbleSortAnimations, getMergeSortAnimations } from '../sortingAlgorithms.js';

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
            sortingAlgos: ["Bubble Sort", "Merge Sort", "Heap Sort"],
            sortingAlgoIdx: 0,
            sparkAFireButton: "Spark A Fire",
            fireSize: 10,
            isFireAlive: false,
            constantFire: true,
        };
    }

    resetArray() {
        const array = [];
        const arrayBars = document.getElementsByClassName("array-bar");

        for (let i = 0; i < this.state.fireSize; i++) {
            array.push(Math.floor((Math.random() * this.state.fireSize * 5) + 1));
        }
        this.setState({ array });
        var arrayLength = arrayBars.length;
        
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
            this.BubbleSort();
        }

        if (algorithm === "Merge Sort") {
            this.mergeSort();
        }

        if (algorithm === "Heap Sort") {
            this.HeapSort();
        }
    }

    randomFireColour() {
        let randomIndex = (Math.floor((Math.random() * 5)));
        let colors = ["red", "orange", "orange", "orange", "yellow"];
        return colors[randomIndex];
    }

    BubbleSort() {
        console.log("in bubblesort");
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    HeapSort() {
        console.log("in heapsort");
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
                        <Button className="algoButton" variant="success" onClick={() => this.previousAlgo()}>🢀</Button><Button onClick={() => this.startSort()} variant="primary">{this.state.sortingAlgos[this.state.sortingAlgoIdx]}</Button><Button className="algoButton" variant="success" onClick={() => this.nextAlgo()}>🢂</Button>
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