// Read file into an array, line by line
var fs = require("fs");
var lines = fs.readFileSync("./input.txt", "utf8").split("\n");

// max sheet size and empty array
var sheetSize = 2000;
var sheet = [];

// setup 2d array with the sheets. 0 as default value
for (var i = 0; i < sheetSize; i++) {
  sheet[i] = [];
  for (var j = 0; j < sheetSize; j++) {
    sheet[i][j] = 0;
  }
}

// main loop - prepare the sheet
for (var loop = 0; loop < lines.length; loop++) {
  var cut = parseStrings(lines[loop]);
  // destructuring assignment
  var { id, coords, size } = cut;

  // loop through the cords for the size and increase the sheet at this cord everytime
  for (var i = coords[0]; i < coords[0] + size[0]; i++) {
    for (var j = coords[1]; j < coords[1] + size[1]; j++) {
      sheet[i][j]++;
    }
  }
}
var overlap = 0;

// loop through the finished sheet and increase overlap if counter is >1
for (var i = 0; i < sheetSize; i++) {
  for (var j = 0; j < sheetSize; j++) {
    if (sheet[i][j] > 1) overlap++;
  }
}

// ===== SOLUTION PART 1 =====
console.log("OVERLAP: " + overlap);

// ===== PART 2 =====

for (var loop = 0; loop < lines.length; loop++) {
  var cut = parseStrings(lines[loop]);
  // destructuring assignment
  var { id, coords, size } = cut;

  // helper variable
  var match = true;

  // loop through the cords for the size and increase the sheet at this cord everytime
  for (var i = coords[0]; i < coords[0] + size[0]; i++) {
    for (var j = coords[1]; j < coords[1] + size[1]; j++) {
      // loop throught he sheet again. If there is anywhere a zero, we have found something
      if (sheet[i][j] > 1) {
        match = false;
      }
    }
  }
  if (match) {
    console.log("ID WITH NO OVERLAP: " + id);
    return;
  }
}

// ===== HELPERS =====

function parseStrings(str) {
  // split every line to an array
  var array = str.split(" ");
  var obj = {};

  // setup object with input format. Every part has a own kvp. The @ is dropped out
  obj.id = Number(array[0].substr(1));
  obj.coords = array[2]
    .substr(0, array[2].length - 1)
    .split(",")
    .map(Number);
  obj.size = array[3].split("x").map(Number);

  // return the object in the end
  return obj;
}
