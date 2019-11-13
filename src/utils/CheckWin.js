// Check if a given line is a win
const chkLine = (a, b, c, d) => {
	return a !== null && a === b && a === c && a === d
}

// O(n^2) simple winner check
export const checkWin = board => {
	const totalRows = board.length
	const totalColumns = board[0].length
	let tie = true
	// Tie condition
	for (let i = 0; i < totalRows; i++) {
		for (let j = 0; j < totalColumns; j++) {
			if (board[i][j] === null) tie = false
		}
		if (!tie) break
	}
	if (tie) return 'TIE'

	// Vertival checks
	for (let r = 0; r < totalRows - 3; r++)
		for (let c = 0; c < totalColumns; c++)
			if (
				chkLine(board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c])
			)
				return board[r][c]

	// Horizontal checks
	for (let r = 0; r < totalRows; r++)
		for (let c = 0; c < totalColumns - 3; c++)
			if (
				chkLine(board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3])
			)
				return board[r][c]

	// Diagonal checks
	for (let r = 0; r < totalRows - 3; r++)
		for (let c = 0; c < totalColumns - 3; c++)
			if (
				chkLine(
					board[r][c],
					board[r + 1][c + 1],
					board[r + 2][c + 2],
					board[r + 3][c + 3]
				)
			)
				return board[r][c]

	// Check down-left
	for (let r = 3; r < totalRows; r++)
		for (let c = 0; c < totalColumns - 3; c++)
			if (
				chkLine(
					board[r][c],
					board[r - 1][c + 1],
					board[r - 2][c + 2],
					board[r - 3][c + 3]
				)
			)
				return board[r][c]

	return false
}
