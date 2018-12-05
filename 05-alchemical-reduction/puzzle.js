// Try to use lodash for the first time
var _ = require("lodash");

// Read file into an array, line by line
var fs = require("fs");
var lines = fs.readFileSync("./input.txt", "utf8").split("\n");

var polymer = lines[0];
var count = 0;
console.log("Inital Lenght:", polymer.length);

for (var i = 0; i < polymer.length; i++) {
  var char = polymer[i];
  var nextChar = polymer[i + 1];
  if (nextChar != null) {
    if (char == char.toLowerCase()) {
      if (nextChar == nextChar.toUpperCase()) {
        if (char.toLowerCase() == nextChar.toLowerCase()) {
          //   polymer = polymer.slice(0, i - 1) + polymer.slice(i);
          count++;
          count++;
          //console.log("Killed two chars: ", char, " and ", nextChar);
          i++;
        }
      }
    }
    if (char == char.toUpperCase()) {
      if (nextChar == nextChar.toLowerCase()) {
        if (char.toLowerCase() == nextChar.toLowerCase()) {
          //   polymer = polymer.slice(0, i - 1) + polymer.slice(i);
          count++;
          count++;
          //console.log("Killed two chars: ", char, " and ", nextChar);
          i++;
        }
      }
    }
  }
}

console.log("Reacted: ", count);

console.log("Remaining length: ", polymer.length - count);
