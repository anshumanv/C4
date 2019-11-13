import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import PlayerContext from '../utils/PlayerContext'
import Column from './Column'

// Can be rather replaced by a generic flex container HOC.
const BoardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const BoardRoot = styled.div`
	display: flex;
`

const BoardInfo = styled.div`
	margin-bottom: 3rem;
	display: flex;
	align-items: center;
`

const ActiveSpan = styled.span(
	props => `
	height: 2rem;
	width: 2rem;
	background-color: ${props.color};
	border-radius: 50%;
	margin-left: 0.5rem;
`
)

const Board = () => {
	const players = useContext(PlayerContext)
	const [PLAYER_1] = Object.keys(players)

	// Standard rows and columns, can be later customized by taking user input and passing it appropriately.
	const [rows, columns] = [6, 7]

	// init our initial board state
	const initialBoard = [...Array(rows)].map(() => new Array(columns).fill(null))

	const [board, setBoard] = useState(initialBoard)
	const [turn, setTurn] = useState(PLAYER_1)

	const BoardDOM = []
	for (let i = 0; i < columns; i++) {
		BoardDOM.push(
			<Column
				board={board}
				setBoard={setBoard}
				turn={turn}
				setTurn={setTurn}
				columns={columns}
				rows={rows}
				key={i}
				colIndex={i}
			/>
		)
	}

	return (
		<BoardContainer>
			<BoardInfo>
				<h2>{`${players[turn].name}'s turn`} -</h2>
				<ActiveSpan color={players[turn].color} />
			</BoardInfo>
			<BoardRoot>{BoardDOM}</BoardRoot>
		</BoardContainer>
	)
}

export default Board
