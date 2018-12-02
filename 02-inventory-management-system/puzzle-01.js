// Read file into an array, line by line
var fs = require("fs");
var lines = fs.readFileSync("./input.txt", "utf8").split("\n");

const symbolCounts = lines.map(countSymbols);
const twosAndThrees = symbolCounts.reduce(countTwosAndThrees, {
  "2s": 0,
  "3s": 0
});
const solution = twosAndThrees["2s"] * twosAndThrees["3s"];

console.log("SOLUTION", solution);

function countSymbols(line) {
  const symbolCount = line.split("").reduce((acc, char) => {
    // check if char is on acc object
    acc[char] = acc[char] || 0;
    acc[char] = acc[char] + 1;
    return acc;
  }, {});

  return symbolCount;
}

function countTwosAndThrees(acc, symbolCount) {
  // check this for every kvp in the object e.g c:1
  const containsExactly2ofTheSame =
    Object.entries(symbolCount).filter(kvp => kvp[1] === 2).length > 0;
  if (containsExactly2ofTheSame) {
    acc["2s"]++;
  }
  const containsExactly3ofTheSame =
    Object.entries(symbolCount).filter(kvp => kvp[1] === 3).length > 0;
  if (containsExactly3ofTheSame) {
    acc["3s"]++;
  }
  return acc;
}
