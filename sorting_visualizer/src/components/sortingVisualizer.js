import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';


class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            array: [],
            sortingAlgos: ["Bubble Sort", "Merge Sort", "Heap Sort"],
            sortingAlgoIdx: 0,
            sparkAFireButton: "Spark A Fire",
            fireSize: 10,
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

    handleFireButtons() {

        this.playAudio();

        if (this.state.sparkAFireButton === "Add A Log") {
            this.setState({ fireSize: this.state.fireSize + 10})
            
        }else {
            this.setState({ sparkAFireButton: "Add A Log" });
            this.keepFireGoing();
            
        }
    }

    randomFireColour() {
        let randomIndex = (Math.floor((Math.random() * 5)));
        let colors = ["red", "orange", "orange", "orange", "yellow"];
        return colors[randomIndex];
    }

    keepFireGoing() {
        console.log("In keepFireGoing");
        for (let i=0; i < 10000; i++) {
            setTimeout(() => {
                this.resetArray();
            }, i * 200);
        }
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

        if (algorithm === "Bubble Sort") {
            this.BubbleSort();
        }

        if (algorithm === "Merge Sort") {
            this.MergeSort();
        }

        if (algorithm === "Heap Sort") {
            this.HeapSort();
        }
    }

    BubbleSort() {
        console.log("in bubblesort");
    }

    MergeSort() {
        console.log("in mergesort");
    }

    HeapSort() {
        console.log("in heapsort");
    }

    testfunc() {
        console.log('in testfunc');
    }

    render() {
        return (
            <Container>
                <Row noGutters={true}>
                    <Col sm={4} className="control-container">
                        <h3>Control Panel</h3>
                        <audio loop="loop" id="audio" src="fire.mp3" type="audio/mpeg" />
                        <p className="buttons"></p>
                        <Button disabled={this.state.fireSize >= 30} variant="danger" onClick={() => this.handleFireButtons()}>{this.state.sparkAFireButton}</Button>
                        <p className="buttons"></p>
                        <Button className="algoButton" variant="success" onClick={() => this.previousAlgo()}>🢀</Button><Button onClick={() => this.startSort()} variant="primary">{this.state.sortingAlgos[this.state.sortingAlgoIdx]}</Button><Button className="algoButton" variant="success" onClick={() => this.nextAlgo()}>🢂</Button>
                        <Button disabled={this.state.fireSize >= 30} variant="danger" onClick={() => this.handleFire()}>{this.state.sparkAFireButton}</Button>
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






































