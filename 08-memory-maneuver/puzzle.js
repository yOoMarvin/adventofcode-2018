var fs = require("fs");
var data = fs.readFileSync("./input.txt", "utf8").split(" ");
data = data.map(e => parseInt(e));
var inp2 = data.slice();

// ===== PART 1 =====
// getting crazy with recursive function
function part1() {
  const count = data.shift();
  const meta = data.shift();

  let result = 0;

  for (let i = 0; i < count; i++) {
    result += part1();
  }

  for (let i = 0; i < meta; i++) {
    result += data.shift();
  }

  return result;
}

console.log("SUM OF META DATA ENTRIES: ", part1());

// ===== PART 2 =====
// * With help from the subreddit and some copied code *

function part2() {
  const count = inp2.shift();
  const meta = inp2.shift();

  if (count) {
    const c = [];
    for (let i = 0; i < count; i++) {
      c.push(part2());
    }

    const m = [];

    for (let i = 0; i < meta; i++) {
      m.push(inp2.shift());
    }

    let result = 0;

    for (const u of m) {
      const ix = u - 1;
      if (ix >= 0 && ix < c.length) {
        result += c[ix];
      }
    }

    return result;
  } else {
    let result = 0;
    for (let i = 0; i < meta; i++) {
      result += inp2.shift();
    }
    return result;
  }
}

console.log("VALUE OF ROOT NODE: ", part2());
