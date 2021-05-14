class Game {
  constructor(p1, p2, column = 6, row = 7) {
    this.column = column;
    this.players = [p1, p2];
    this.row = row;
    this.board = [];
    this.currPlayer = p1;
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameOver = false;
  }
  makeBoard() {
    for (let y = 0; y < this.column; y++) {
      this.board.push(Array.from({ length: this.row }));
    }
  }
  makeHtmlBoard() {
    const board = document.getElementById("board");
    const topRow = document.createElement("tr");
    topRow.setAttribute("id", "column-top");
    this.handleGameClick = this.handleClick.bind(this);
    topRow.addEventListener("click", this.handleGameClick);

    for (let x = 0; x < this.row; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      topRow.append(headCell);
    }
    board.append(topRow);

    for (let y = 0; y < this.column; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.row; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }
  findSpotForCol(x) {
    for (let y = this.column - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }
  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundColor = this.currPlayer.color;
    // why should I set the position here?
    // piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  endGame(msg) {
    alert(msg);
    const top = document.querySelector("#column-top");
    top.removeEventListener("click", this.handleGameClick);
    const restart = prompt("Play again? y/n");
    if (restart === "y") {
      location.reload();
    }
  }
  handleClick(evt) {
    const x = +evt.target.id;

    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // this is not working...
    if (this.checkForWin()) {
      console.log(checkforWin());
      this.gameOver = true;
      return this.endGame(`Player with color : ${this.currPlayer.color} won!`);
    }

    if (this.board.every((row) => row.every((cell) => cell))) {
      return this.endGame("Tie!");
    }

    this.currPlayer =
      this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
  }
  checkForWin() {
    const _win = (cells) =>
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.column &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );

    for (let y = 0; y < this.column; y++) {
      for (let x = 0; x < this.row; x++) {
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

const body = document.querySelector("body");
const btn = document.createElement("button");
const input1 = document.createElement("input");
const input2 = document.createElement("input");

input1.setAttribute("id", "p1-color");
input1.setAttribute("placeholder", "player 1 color");
input2.setAttribute("id", "p2-color");
input2.setAttribute("placeholder", "player 2 color");
body.append(input1);
body.append(input2);
btn.innerHTML = "New Game";
body.append(btn);

btn.addEventListener("click", () => {
  let p1 = new Player(document.getElementById("p1-color").value);
  let p2 = new Player(document.getElementById("p2-color").value);
  new Game(p1, p2);
  btn.remove();
});
