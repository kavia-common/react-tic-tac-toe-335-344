//
// Utilities for Tic Tac Toe game logic
//

// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  /**
   * Determines if a winning condition is met on the board.
   * @param {Array} squares - Board state as array of 9 elements
   * @returns {Object} {winner: 'X'|'O'|null, line: [idx, idx, idx]|null}
   */
  const lines = [
    [0, 1, 2], [3, 4, 5],[6, 7, 8], // Rows
    [0, 3, 6],[1, 4, 7],[2, 5, 8],  // Columns
    [0, 4, 8],[2, 4, 6],            // Diagonals
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: null };
}

// PUBLIC_INTERFACE
export function isDraw(squares) {
  /**
   * Determines if the board is full and no winner.
   * @param {Array} squares - Board state.
   * @returns {boolean}
   */
  return squares.every(Boolean);
}
