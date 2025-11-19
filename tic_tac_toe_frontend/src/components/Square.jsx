import React from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
export default function Square({ value, onClick, isWinning, ariaLabel }) {
  /**
   * Square for Tic Tac Toe board
   * @param {string} value - Value to display ('X', 'O', or null)
   * @param {Function} onClick - Function called when square is clicked
   * @param {boolean} isWinning - If the square is part of the winning line
   * @param {string} ariaLabel - Accessible label for the square
   */

  return (
    <button
      className={`ttt-square${isWinning ? " win" : ""}`}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-live="polite"
      tabIndex={0}
      style={{
        outline: isWinning ? "2px solid var(--ttt-success)" : undefined,
      }}
      type="button"
    >
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onClick: PropTypes.func.isRequired,
  isWinning: PropTypes.bool,
  ariaLabel: PropTypes.string
};

Square.defaultProps = {
  value: null,
  isWinning: false,
  ariaLabel: "Tic Tac Toe square"
};
