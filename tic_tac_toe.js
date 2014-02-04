(function (root) {
  var TicTacToe = root.TicTacToe = (root.TicTacToe || {});

  var Board = TicTacToe.Board = function Board () {
    this.rows = [["_","_","_"],
                 ["_","_","_"],
                 ["_","_","_"]];
  }

  var Game = TicTacToe.Game = function Game (player1, player2) {
    this.board = new Board();
    this.turn = "";
    this.players = [player1, player2]
  }

  var ComputerPlayer = TicTacToe.ComputerPlayer = function ComputerPlayer () {
    this.name = "Computer 500";
  }

  ComputerPlayer.prototype.makeMove = function(board, waitForInput) {
    waitForInput([0,0])
  }

  var HumanPlayer = TicTacToe.HumanPlayer = function HumanPlayer (name) {
    this.name = name;
    var readline = require('readline');
    this.READER = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  HumanPlayer.prototype.makeMove = function(board, waitForInput) {
    var that = this;
    board.display();
    this.READER.question("Enter row number: ", function(row) {
      that.READER.question("Enter column number: ", function(column) {

        waitForInput([row, column])
      })
    });
  }

  Game.prototype.play = function() {
    // decide which player's turn it is
    this.turn = (this.turn === "X" ? "O" : "X");
    var player = (this.turn === "X" ? this.players[1] : this.players[0])
    console.log(player.name + "'s turn:");

    this.untilOver(player);
  };

  Game.prototype.takeTurn = function(player, markSpotAndStartOver) {
    player.makeMove(this.board, function (pos) {
      markSpotAndStartOver(pos);
    });
    //this.players[0].makeMove(function (pos) {
    //  markSpotAndStartOver(pos);
    //});
  }

  Game.prototype.untilOver = function(player) {
    if (this.board.isOver() === true) {
      console.log("over");
      player.READER.close();

      if(this.board.isWinner("X")) { console.log(player.name + "X won!"); }
      else if(this.board.isWinner("O")) { console.log(player.name + "O won!"); }
      else { console.log("Stalemate!"); }

    } else {
      var that = this;

      function markSpotAndStartOver(pos) {
              that.board.addMark(pos, that.turn);
              that.play();
      }

      this.takeTurn(player, markSpotAndStartOver);
    };
  };

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
    return (this.isWinner("X") || this.isWinner("O") || this.isFull());
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
    if (this.isWinnerDiagonal(mark)) {
      return true;
    }
    return false;
  }

})(this);

var h1 = new this.TicTacToe.ComputerPlayer();
var h2 = new this.TicTacToe.HumanPlayer("Alex");
var tic = new this.TicTacToe.Game(h1, h2);
tic.play();
// tic.board.addMark([0,0], "X");
// tic.board.addMark([0,1], "X");
// tic.board.addMark([0,2], "X");
// tic.board.display();
// console.log(tic.board.isWinner("X"));
// console.log(tic.board.isOver());
// console.log(tic.board.isOver() === true);