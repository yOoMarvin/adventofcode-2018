// Try to use lodash for the first time
var _ = require("lodash");

// Read file into an array, line by line
var fs = require("fs");
var lines = fs.readFileSync("./input.txt", "utf8").split("\n");

var initialPolymer = lines[0];

// ===== HELPERS =====
function reaction(polymer) {
  polymer = polymer.split("");
  // playing with fire here
  while (true) {
    didSomething = false;

    for (let i = 0; i < polymer.length - 1; i++) {
      // helper variables for the upcoming if. Check if the char is a upper or lower letter
      let upper = polymer[i].toUpperCase();
      let lower = polymer[i].toLowerCase();
      // learning about ternary operator today!
      //
      if (
        // first check the first part
        // if this is true go the the thing after the ?
        // if false then go to the part at the end
        polymer[i] === lower
          ? polymer[i + 1] === upper
          : polymer[i + 1] === lower
      ) {
        polymer = polymer.slice(0, i).concat(polymer.slice(i + 2));
        didSomething = true;
        break;
      }
    }
    if (!didSomething) break;
  }
  return polymer.length;
}

// ===== PART 1 =====
console.log("REACTED POLYMER LENGTH:", reaction(initialPolymer));

// ===== PART 2 ====

// result object where everything is saved
let table = {};

// loop through alphabet
for (let i = 0; i < 26; i++) {
  // unicode small a and big A
  let lowercase = String.fromCharCode(97 + i);
  let uppercase = String.fromCharCode(65 + i);
  // learn about regex magix today
  regex = new RegExp("[" + lowercase + uppercase + "]", "g");
  let tempInput = initialPolymer.replace(regex, "");
  table[uppercase] = reaction(tempInput);
}

console.log(table);
