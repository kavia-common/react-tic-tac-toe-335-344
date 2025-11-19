import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import Square from "./Square";

/**
 * PUBLIC_INTERFACE
 * Board for Tic Tac Toe game. Renders a 3x3 board.
 * @component
 * @param {Array} squares - Current board as array of 9 elements (string or null)
 * @param {Function} onSquareClick - Handler invoked with (i) when a square is clicked
 * @param {Array} winningLine - Array of 3 indices forming the winning line (optional)
 * @param {boolean} disabled - If true, disables board interaction (game over)
 * @returns {JSX.Element}
 */
function Board({
  squares,
  onSquareClick,
  winningLine,
  disabled
}) {
  // Guard: Fallback to safe empty state if squares is not a valid length-9 array
  let safeSquares = Array.isArray(squares) && squares.length === 9 ? squares : Array(9).fill(null);

  // winnerSet: Used to highlight squares, guard if winningLine is invalid
  let winnerSet = null;
  if (
    Array.isArray(winningLine) &&
    winningLine.length === 3 &&
    winningLine.every((idx) =>
      typeof idx === "number" && idx >= 0 && idx < 9
    )
  ) {
    winnerSet = new Set(winningLine);
  }

  // Memoized Square renderer
  const MemoizedSquare = memo(function MemoizedSquareComp({
    idx,
    value,
    isWinning,
    onClickSquare,
    disabled: squareDisabled
  }) {
    // Handle keyboard (Enter/Space) for accessibility
    const handleKeyDown = useCallback(
      (e) => {
        if (squareDisabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClickSquare(idx);
        }
      },
      [idx, onClickSquare, squareDisabled]
    );

    // Compose accessible label for screen readers
    const ariaLabel = `Row ${Math.floor(idx / 3) + 1} Column ${(idx % 3) + 1}${value ? `, ${value}` : ""}${isWinning ? ", part of winning line" : ""}`;

    return (
      <Square
        key={idx}
        value={value}
        onClick={() => {
          // Defensive: Ignore if disabled or invalid idx
          if (squareDisabled) return;
          if (typeof idx !== "number" || idx < 0 || idx > 8) return;
          onClickSquare(idx);
        }}
        isWinning={!!isWinning}
        ariaLabel={ariaLabel}
        tabIndex={squareDisabled ? -1 : 0}
        aria-pressed={value ? true : false}
        role="button"
        onKeyDown={handleKeyDown}
        disabled={squareDisabled}
      />
    );
  });

  // Error boundary: if any render error, fallback UI
  // (React 18+ only, can also use optional chaining with try/catch, but simplest: inline boundary)
  let boardContent;
  try {
    boardContent = [0, 1, 2].map((row) => (
      <div className="ttt-row" role="row" key={row}>
        {[0, 1, 2].map((col) => {
          const idx = row * 3 + col;
          // Defensive: If idx out of bounds, skip square
          if (typeof idx !== "number" || idx < 0 || idx > 8) {
            return null;
          }
          return (
            <MemoizedSquare
              idx={idx}
              value={safeSquares[idx]}
              onClickSquare={onSquareClick}
              isWinning={winnerSet ? winnerSet.has(idx) : false}
              disabled={!!disabled || typeof onSquareClick !== "function"}
              key={idx}
            />
          );
        })}
      </div>
    ));
  } catch (err) {
    boardContent = (
      <div role="alert" className="ttt-error" style={{ color: "#dc2626", padding: 16 }}>
        Something went wrong rendering the board. {err && err.message}
      </div>
    );
  }

  return (
    <div
      className="ttt-board"
      role="grid"
      aria-label="Tic Tac Toe Board"
      aria-disabled={!!disabled}
      tabIndex={-1}
      style={disabled ? { pointerEvents: "none", opacity: 0.7 } : undefined}
    >
      {boardContent}
      {/* Overlay for disabled state: ensure no interaction */}
      {disabled && (
        <div className="ttt-overlay" aria-hidden="true"></div>
      )}
    </div>
  );
}

// PropTypes validation
Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.oneOf([null])])
  ),
  onSquareClick: PropTypes.func.isRequired,
  winningLine: PropTypes.arrayOf(PropTypes.number),
  disabled: PropTypes.bool
};

// Default props fallback
Board.defaultProps = {
  squares: Array(9).fill(null),
  winningLine: null,
  disabled: false
};

export default Board;
