import React from 'react';
import { Button } from 'react-bootstrap';

class ControlPanel extends React.Component {
	state = {
            isFireAlive: false,
	}

	// callback for handleFireButtonState
	setStateAndRunCallbackHFBS = (val) => {
		this.setState(val, () => {
			this.props.handleFireButtonState(this.state);
		});
	};

	runCallbackStartSort = () => {
		this.props.startSort();
	} 

	render() {
		return(
			<div>	
	            <h3>Sorting Visualizer</h3>
	            <audio loop="loop" id="audio" src="fire.mp3" type="audio/mpeg" />
	            <p className="buttonPadding"></p>
	            <Button disabled={this.props.fireSize >= 30} variant="danger" onClick={() => this.setStateAndRunCallbackHFBS({ isFireAlive: true })}>{this.props.sparkAFireButton}</Button>
	            <p className="buttonPadding"></p>
	            <Button disabled={!this.props.sortButton} className="algoButton" variant="success" onClick={() => this.props.previousAlgo()}>🢀</Button><Button disabled={!this.props.sortButton} onClick={() => this.runCallbackStartSort()} variant="primary">{this.props.sortingAlgos[this.props.sortingAlgoIdx]}</Button><Button disabled={!this.props.sortButton} className="algoButton" variant="success" onClick={() => this.props.nextAlgo()}>🢂</Button>
	            <p className="buttonPadding">Slow Down</p>
	            <input disabled={!this.props.sortButton} type="range" min="50" max="1000" value={this.props.sliderSpeed} onChange={(event) => this.props.changeSliderSpeed(event.target.value)}/>
            </div>
		);
	}
}

export default ControlPanel;