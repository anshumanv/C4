import React from 'react'
import styled from 'styled-components'
import Board from './components/Board'
import PlayerContext from './utils/PlayerContext'

const Root = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #282c34;
	height: 100vh;
	width: 100vw;
	color: white;
`

export const Heading = styled.h1`
	margin-bottom: 5rem;
`

// Some enums for players, we can instead take user input about color and name but this works for a simple case.
const PLAYER_1 = {
	color: 'red',
	name: 'A'
}

const PLAYER_2 = {
	color: 'blue',
	name: 'B'
}

const players = {
	PLAYER_1,
	PLAYER_2
}

function App() {
	return (
		<PlayerContext.Provider value={players}>
			<Root>
				<Heading>Connect 4</Heading>
				<Board />
			</Root>
		</PlayerContext.Provider>
	)
}

export default App
