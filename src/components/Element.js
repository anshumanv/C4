import styled from 'styled-components'

const Element = styled.span(
	props => `
	height: 2rem;
	width: 2rem;
	background-color: ${(props.players[props.player] &&
		props.players[props.player].color) ||
		'white'};
	padding: 1rem;
	margin: 0.5rem;
	border-radius: 50%;
	transition: all 0.5s ease;
`
)

export default Element
