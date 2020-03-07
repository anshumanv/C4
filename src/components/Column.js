import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { checkWin } from '../utils/CheckWin'
import PlayerContext from '../utils/PlayerContext'
import Element from './Element'

const ColumnRoot = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 1rem;
	&:hover {
		background-color: #242424;
		opacity: 0.6;
	}
`

const Column = props => {
	const { rows, columns, colIndex, turn, board, setBoard, setTurn } = props

	// read players information using context api.
	const players = useContext(PlayerContext)

	// Function to handle turns by players.
	const makeTurn = turn => {
		let colVal = board.map(col => col[colIndex]).reverse()

		const present = colVal.indexOf(null)

		// Column is full.
		if (present < 0) return
		let newBoard = [...board]
		Swal.fire({
			title: 'Move type?',
			text: 'Do you want to drop or place your coin?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Place it!'
		}).then(res => {
			console.log(res)
			if (res.hasOwnProperty('value')) {
				// create a copy of out initial state for mutation.
				newBoard[rows - present - 1][colIndex] = turn
			} else {
				// console.log(colVal)
				colVal = [...colVal.slice(1, colVal.length), null]

				for (let i = 0; i < rows; i++) {
					newBoard[i][colIndex] = colVal[rows - i - 1]
				}
				console.log({ newBoard, colVal }, rows - present - 1)
			}
			// Check win
			const winner = checkWin(newBoard)
			// If winner exists fire an alert.

			if (winner) {
				Swal.fire({
					title: 'Game Over',
					text: `${winner === 'TIE' ? "It's a tie" : `${winner} Won!`}`,
					icon: 'success',
					confirmButtonText: 'New Game'
				}).then(() => {
					const initialBoard = [...Array(rows)].map(() =>
						new Array(columns).fill(null)
					)
					setTurn(Object.keys(players)[0])
					return setBoard(initialBoard)
				})
			}

			// flip turns
			setTurn(turn === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1')

			// update the overall board state
			setBoard(newBoard)
		})
	}

	// Building DOM of a single column
	const ColumnDOM = []
	for (let i = 0; i < rows; i++) {
		ColumnDOM.push(
			<Element players={players} player={board[i][colIndex]} key={i} />
		)
	}

	return <ColumnRoot onClick={() => makeTurn(turn)}>{ColumnDOM}</ColumnRoot>
}

Column.propTypes = {
	rows: PropTypes.number.isRequired,
	columns: PropTypes.number.isRequired,
	colIndex: PropTypes.number.isRequired,
	turn: PropTypes.string.isRequired,
	board: PropTypes.array.isRequired,
	setBoard: PropTypes.func.isRequired,
	setTurn: PropTypes.func.isRequired
}

export default Column
