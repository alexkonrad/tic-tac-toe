(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Game = Hanoi.Game = function Game () {
    var readline = require('readline');
    this.READER = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.piles = [[3,2,1], [], []];
  }

  Game.prototype.getMove = function(piles, callback) {
    var that = this;

    that.READER.question("Enter the pile to take a disc from:", function(from) {

      that.READER.question("Enter the pile to move the disc to: ", function(to) {
        var fromPile = parseInt(from);
        var toPile = parseInt(to);

        callback(fromPile, toPile);
      });
    });
  };

  Game.prototype.moveLoop = function(piles, gameOver, callback) {
    if (gameOver === false) {
      var that = this;
      console.log(this.piles);
      this.getMove(piles, function (fromPile, toPile) {
        // move the disc
        var toLastEl = that.piles[toPile].length - 1;
        var fromLastEl = that.piles[fromPile].length - 1;

        if ((that.piles[fromPile].length > 0) &&
            (that.piles[toPile][toLastEl] > that.piles[fromPile][fromLastEl] ||
             that.piles[toPile].length === 0 )) {

          that.piles[toPile].push(that.piles[fromPile].pop());
        } else { console.log("Invalid Move.")}

        callback(that.piles)
      })
    }
  }

  Game.prototype.checkGameOver = function(piles) {
    var that = this;
    this.moveLoop(piles, false, (function (piles) {
      if (piles[2][2] === 1 ) {
        console.log("you won");
        that.READER.close();
      } else {
        that.moveLoop(piles, false, that.checkGameOver.bind(that));
      }
    })(piles))
  };
})(this);

var game = new this.Hanoi.Game();
game.checkGameOver(game.piles)