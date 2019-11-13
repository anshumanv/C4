import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import PlayerContext from '../utils/PlayerContext'
import Column from './Column'

const BoardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const BoardRoot = styled.div`
	display: flex;
`

const Board = props => {
	const players = useContext(PlayerContext)
	const [PLAYER_1] = Object.keys(players)
	// console.log(players)
	// Standard rows and columns, can be later customized by taking user input and passing it appropriately.
	const [rows, columns] = [6, 7]

	// init our initial board state
	const initialBoard = [...Array(rows)].map(() => new Array(columns).fill(null))
	const [board, setBoard] = useState(initialBoard)
	const [turn, setTurn] = useState(PLAYER_1)
	// console.log(board)

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
			<span>{`${players[turn].name}'s turn`}</span>
			<BoardRoot>{BoardDOM}</BoardRoot>
		</BoardContainer>
	)
}

export default Board
