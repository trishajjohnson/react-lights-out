import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=6, ncols=6, chanceLightStartsOn=0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values
    let initialBoard = [];
    for(let y = 0; y < nrows; y++) {
      let row = [];
      for(let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for(let y = 0; y < nrows; y++) {
      for(let x = 0; x < ncols; x++) {
        if(board[y][x] === true) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copyBoard = oldBoard.map(row => [...row]);
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, copyBoard); //actual coordinate to flip
      flipCell(y - 1, x, copyBoard); //light above
      flipCell(y, x - 1, copyBoard); //light to the left
      flipCell(y, x + 1, copyBoard); //light to the right
      flipCell(y + 1, x, copyBoard); //light below
      // TODO: return the copy
      return copyBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()) return <div>You have won!</div>
  // TODO

  // make table board
  let tableBoard = [];

  for(let y = 0; y < nrows; y++) {
    let tableRow = [];
    for(let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      tableRow.push(<Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={() => flipCellsAround(coord)} />);
    }
    tableBoard.push(<tr key={y}>{tableRow}</tr>);
  }

  // TODO
  return (
    <table className="Board">
      <tbody>
        {tableBoard}
      </tbody>
    </table>
  );
}

export default Board;
