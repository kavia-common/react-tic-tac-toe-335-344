import React from "react";
import Square from "./Square";

// PUBLIC_INTERFACE
export default function Board({ squares, onSquareClick, winningLine, disabled }) {
  /**
   * Board for the Tic Tac Toe game
   * @param {Array} squares - Current 3x3 board as array of 9 elements
   * @param {Function} onSquareClick - Handler when square is clicked
   * @param {Array} winningLine - Array of indices forming the winning line
   * @param {boolean} disabled - If true, disables interaction (game over)
   */
  function renderSquare(i) {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        isWinning={!!winningLine && winningLine.includes(i)}
        ariaLabel={`Row ${Math.floor(i/3) + 1} Column ${(i%3) + 1}${squares[i] ? `, ${squares[i]}` : ""}`}
      />
    );
  }

  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
      {[0, 1, 2].map((row) => (
        <div className="ttt-row" role="row" key={row}>
          {[0, 1, 2].map((col) => {
            const idx = row * 3 + col;
            return renderSquare(idx);
          })}
        </div>
      ))}
      {disabled && <div className="ttt-overlay" aria-hidden="true"></div>}
    </div>
  );
}
