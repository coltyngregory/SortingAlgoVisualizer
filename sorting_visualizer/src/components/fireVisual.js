import React from 'react';

class FireVisual extends React.Component {

	randomFireColour() {
        let randomIndex = (Math.floor((Math.random() * 5)));
        let colors = ["red", "orange", "orange", "orange", "yellow"];
        return colors[randomIndex];
    }

	render() {
		return (
			<div className="flames">
                {this.props.array.map((value, idx) => (
                <div
                    className="array-bar"
                    key={idx}
                    style={{height: `${value}px`, backgroundColor: this.randomFireColour()}}>
                </div>
                ))}
            </div>
		)
	}
}

export default FireVisual;