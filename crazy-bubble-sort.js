var readline = require('readline');
READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askLessThan (el1, el2, callback) {
  READER.question("is " + el1 + " < " + el2 + "?", function(input) {
    if (input == "yes") { callback(true) }
    else { callback(false) }
  });
};

function performSortPass (arr, i, madeAnySwaps, callback) {
  if (i < arr.length - 1) {
    askLessThan(arr[i], arr[i+1], function (lessThan) {
      if (lessThan === false) {
        var tmp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = tmp;
        madeAnySwaps = true;
      }
      performSortPass(arr, i+1, madeAnySwaps, callback);
    });
  } else {
    callback(madeAnySwaps);
  }
}

function crazyBubbleSort (arr, sortCompletionCallback) {
  (function sortPassCallback (madeAnySwaps) {
    if (madeAnySwaps === true) {
      performSortPass(arr, 0, false, sortPassCallback);
    }
    else {
      sortCompletionCallback(arr);
    }
  })(true);
};

crazyBubbleSort([3,2,1], function (arr) { console.log(arr) });