import React from 'react';


class FireAudio extends React.Component {

	playAudio() {
        let x = document.getElementById("audio");
        x.play();
    }

    pauseAudio() {
        let x = document.getElementById("audio");
        x.pause();
    }

	render() {
		return (
			<div >
			<audio loop="loop" id="audio" src="fire1.mp3" type="audio/mpeg" />
			</div >
		);
	};
}

export default FireAudio;