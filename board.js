(function (root) {
  var TicTacToe = root.TicTacToe = (root.TicTacToe || {});

  var Board = TicTacToe.Board = function Board () {
    this.rows = [["_","_","_"],
                 ["_","_","_"],
                 ["_","_","_"]];
  }

  Board.prototype.addMark = function (pos, mark) {
    if (this.rows[pos[0]][pos[1]] === "_") {
      this.rows[pos[0]][pos[1]] = mark;
    }
  }

  Board.prototype.get = function (pos) {
    this.rows[pos[0]][pos[1]];
  }

  Board.prototype.display = function () {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (j == 2) {
          process.stdout.write(this.rows[i][j]);
        } else {
          process.stdout.write(this.rows[i][j] + "|")
        }
      }
      process.stdout.write("\n");
    }
    process.stdout.write("\n");
  }

  Board.prototype.isOver = function () {
    return this.isWinner("X") || this.isWinner("O") || this.isFull;
  }

  Board.prototype.isFull = function () {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (this.rows[i][j] === "_") {
        return false;
        }
      }
    }
    return true;
  };

  Board.prototype.isWinnerDiagonal = function(mark) {
    return ((this.rows[0][0] === this.rows[1][1]) &&
            (this.rows[1][1] === this.rows[2][2]) &&
            (this.rows[2][2] === mark)) ||
           ((this.rows[2][0] === this.rows[1][1]) &&
            (this.rows[1][1] === this.rows[0][2]) &&
            (this.rows[0][2] === mark))
  }

  Board.prototype.isWinner = function (mark) {
    for (var i = 0; i < 3; i++) {
      if (((this.rows[i][0] === this.rows[i][1]) &&
          (this.rows[i][1] === this.rows[i][2]) &&
          (this.rows[i][2] === mark)) ||
         ((this.rows[0][i] === this.rows[1][i]) &&
          (this.rows[1][i] === this.rows[2][i]) &&
          (this.rows[2][i] === mark))) {
        return true;
      }
    }
    if (this.isWinnerDiagonal) {
      return true;
    }
    return false;
  }

})(this);

// var board = new this.TicTacToe.Board();
// board.addMark([0,0], "X");
// board.display();
// board.addMark([1,1], "X");
// board.display();
// board.addMark([2,2], "X");
// board.display();
// console.log(board.isWinner("X"));