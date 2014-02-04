var readline = require('readline');
READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    READER.question("Enter 4 numbers:", function(num) {
      var input = parseInt(num);
      sum += input;
      numsLeft -= 1;
      console.log(sum);
      addNumbers(sum, numsLeft, completionCallback);
    });
  } else  {
    completionCallback(sum);
  }
};

addNumbers(0, 4, function() {console.log("complete")});
