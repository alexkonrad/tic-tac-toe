(function callbackExercises() {
  var ClockLibrary = callbackExercises.ClockLibrary = (callbackExercises.ClockLibrary || {});
  var Clock = ClockLibrary.Clock = function () {
    this.date = new Date();
    this.hour = this.date.getHours();
    this.min  = this.date.getMinutes();
    this.sec  = this.date.getSeconds();
  };

  Clock.prototype.run = function () {
    var clock = this;
    setInterval(function() {
      clock.tick();
    }, 5000);
  };

  Clock.prototype.tick = function () {
    if(this.sec < 55) {
      this.sec += 5;
    } else if (this.min < 59) {
      this.min += 1;
      this.sec -= 55;
    } else if (this.hour < 23) {
      this.hour += 1;
      this.min = 0;
      this.sec -= 55;
    } else {
      this.hour = 0;
      this.min = 0;
      this.sec -= 55;
    }
    console.log(this.hour + ":" +
                this.min  + ":" +
                this.sec);
  };

  var clock = new Clock();
  clock.run();
})(this);