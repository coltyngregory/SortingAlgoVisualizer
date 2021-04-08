import React from 'react';


class FireAudio extends React.Component {

	render() {
		return (
			<div>
			<audio loop="loop" id="audio" src="fire.mp3" type="audio/mpeg" />
			</div>
		);
	};
}

export default FireAudio;