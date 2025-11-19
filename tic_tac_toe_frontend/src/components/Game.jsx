import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner, isDraw } from "../utils/gameUtils";

// PUBLIC_INTERFACE
export default function Game() {
  /**
   * Top-level component to manage tic tac toe game state and UI.
   */
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const current = history[stepNumber];

  const { winner, line } = calculateWinner(current);
  const draw = isDraw(current) && !winner;
  const status = winner
    ? `Winner: ${winner} 🎉`
    : draw
    ? "It's a draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    if (winner || current[idx]) return;
    const next = current.slice();
    next[idx] = xIsNext ? "X" : "O";
    const nextHistory = history.slice(0, stepNumber + 1).concat([next]);
    setHistory(nextHistory);
    setStepNumber(nextHistory.length - 1);
    setXisNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function jumpTo(step) {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXisNext(true);
  }

  return (
    <div className="ttt-game-container">
      <header className="ttt-header">
        <h1 className="ttt-title" style={{ color: "var(--ttt-primary)" }}>
          Tic Tac Toe
        </h1>
        <div className="ttt-player-indicator" role="status" aria-live="polite">
          <span className={`ttt-badge${winner ? " win" : ""}`}>
            {status}
          </span>
        </div>
      </header>
      <main>
        <Board
          squares={current}
          onSquareClick={handleClick}
          winningLine={line}
          disabled={!!winner || draw}
        />
        <div className="ttt-actions">
          <button
            className="ttt-btn"
            onClick={handleReset}
            aria-label="Reset the game"
            type="button"
            style={{
              background: "var(--ttt-primary)",
              color: "#fff"
            }}
          >
            New Game
          </button>
        </div>
        <aside className="ttt-history">
          <span className="ttt-move-count">
            {stepNumber === 0
              ? "Game start"
              : `Move #${stepNumber} (${xIsNext ? "O to move" : "X to move"})`}
          </span>
          {history.length > 1 && (
            <ol>
              {history.map((_, move) => (
                <li key={move}>
                  <button
                    className={`ttt-btn ttt-btn-small${move === stepNumber ? " active" : ""}`}
                    onClick={() => jumpTo(move)}
                    aria-label={move === 0 ? "Go to start" : `Go to move #${move}`}
                  >
                    {move === 0 ? "Start" : `Move #${move}`}
                  </button>
                </li>
              ))}
            </ol>
          )}
        </aside>
      </main>
      <footer className="ttt-footer">
        <span>
          Made with React |{" "}
          <a href="https://github.com/" style={{ color: "var(--ttt-success)" }}>
            Source
          </a>
        </span>
      </footer>
    </div>
  );
}
