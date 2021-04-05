import styled from 'styled-components'

export const GenerateButton = styled.button`
	font-size: 2em;
	padding: 0.25em 1em;
	border: 2px solid blue;
	width: 200px;
	height: 50px;
	background-color: ${(props) => props.backgroundColour ? props.backgroundColour : "blue" };

	&:hover {
		background-color: black;
	}
`;


	// const Button = styled.button`
	// background: transparent;
	// border-radius: 3px;
	// border: 6px solid red;
	// color: red;
	// margin: 0 1em;
	// padding: 0.25em 1em;
	// `