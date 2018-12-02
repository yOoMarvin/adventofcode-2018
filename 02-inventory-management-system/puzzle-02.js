// Read file into an array, line by line
var fs = require("fs");
var lines = fs.readFileSync("./input.txt", "utf8").split("\n");

const matches = [];
lines.forEach(firstLine => {
  lines.forEach(secondLine => {
    if (firstLine === secondLine) {
      return;
    }
    const nearlyMatchingString = findNearlyMatchingStrings(
      firstLine,
      secondLine
    );
    if (nearlyMatchingString) {
      matches.push(nearlyMatchingString);
    }
  });
});

const solution = matches[0];
console.log("SOLUTION: " + solution);

// ===== HELPERS =====

function findNearlyMatchingStrings(str1, str2) {
  let diff = 0;
  let matchingChars = "";
  let i = 0;

  while (i < str1.length) {
    if (str1.charAt(i) !== str2.charAt(i)) {
      diff++;
    } else {
      matchingChars += str1.charAt(i);
    }
    i++;
  }
  if (diff === 1) {
    return matchingChars;
  }
  return false;
}
