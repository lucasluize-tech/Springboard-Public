/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board[y] = [];
    for (let x = 0; x < WIDTH; x++) {
      board[y][x] = "";
    }
  }

  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.querySelector("#board");

  // Creating The first row, clickable in every column line
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: Creating the grid to be played.
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    row.setAttribute("id", y);
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  const column = board.map((v) => v[x]);
  //return last null spot
  const spot = column.filter((v) => v === "");
  // if no spots
  if (spot.length === 0) return null;
  // return spot available
  return spot.length - 1;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newDiv = document.createElement("div");
  if (currPlayer === 2) {
    newDiv.setAttribute("class", "piece2");
  } else {
    newDiv.setAttribute("class", "piece1");
  }

  const placePiece = document.getElementById(`${y}-${x}`);
  placePiece.append(newDiv);
  board[y][x] = currPlayer;
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell // + converts to intenger.
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  console.log(`Player ${currPlayer} placed the piece!`);

  // check for win
  if (checkForWin()) {
    return endGame(`Congratulations Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (
    board.every((v) => {
      return v.every((v) => v != "");
    })
  ) {
    return endGame("it's a TIE!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 2) {
    currPlayer = 1;
  } else {
    currPlayer = 2;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // his is list of cells [y,x] , every item in the list is a horizontal win
      let horiz = [
        [y, x], //[0,0]
        [y, x + 1], //[0,1]
        [y, x + 2], //[0,2]
        [y, x + 3], //[0,3]
      ];

      // this is list of cells [y,x] , every item in the list is a vertical win
      let vert = [
        [y, x], //[0,0] ...first
        [y + 1, x], //[1,0] ...second
        [y + 2, x], //[2,0] ... third
        [y + 3, x], //[3,0] ...fourth
      ];

      // this is list of cells [y,x] , every item in the list is a diagonal win from left-right
      let diagDR = [
        [y, x], //[0,0]...
        [y + 1, x + 1], // [1,1]...
        [y + 2, x + 2], // [2,2] ...
        [y + 3, x + 3], // [3,3] ...
      ];

      // this is list of cells [y,x] , every item in the list is a diagonal win from right-left
      let diagDL = [
        [y, x], // [0,6]
        [y + 1, x - 1], //[1,5]
        [y + 2, x - 2], //[2,4]
        [y + 3, x - 3], //[3,3]
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
