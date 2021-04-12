import React from 'react';

class FirePlace extends React.Component {
	render() {
		return(
			<div sm={8} className="array-container">
				<div className="flames">
					{this.props.array.map((value, idx) => (
					<div
						className="array-bar"
						key={idx}
						style={{height: `${value}px`, backgroundColor: this.props.randomFireColour()}}>
					</div>
					))}
				</div>
			</div>
		);
	}
}

export default FirePlace;