var fs = require("fs");
var data = fs.readFileSync("./input.txt", "utf8");

// ===== PART 1 =====
// Everyday something different. Let's work with functions today
function part1(data) {
  // get the data in form of only chars
  data = data.split("\n").map(a => a.match(/ [A-Z] /g).map(a => a.trim()));

  let counts = [];
  []
    .concat(...data)
    // element, index, array
    .filter((e, i, a) => i == a.indexOf(e))
    .forEach((e, i, a) => {
      counts.push({
        c: e,
        r: () => data.filter(b => b[1] == e)
      });
    });

  var result = "";
  // as long as counts has a length
  while (counts.filter(a => a).length) {
    var next = counts
      .filter(a => !a.r().length)
      .sort((a, b) => (b.c > a.c ? -1 : 1))[0];
    delete counts[counts.indexOf(next)];
    result += next.c;
    data
      .filter(a => a[0] == next.c)
      .forEach(a => {
        delete data[data.indexOf(a)];
      });
  }
  return result;
}

console.log("PART 1, RIGHT ORDER: ", part1(data));

// ===== PART 2 =====
// Got some help here 🤷‍♂️
function part2(data, workers) {
  data = data.split("\n").map(a => a.match(/ [A-Z] /g).map(a => a.trim()));
  let counts = [];
  []
    .concat(...data)
    .filter((e, i, a) => i == a.indexOf(e))
    .forEach((e, i, a) => {
      counts.push({
        c: e,
        r: () => data.filter(b => b[1] == e),
        t: 60 + e.charCodeAt() - 64
      });
    });
  var stash = [];
  var count = -1;
  var result = "";
  var desired = counts.length;
  while (result.length != desired) {
    count++;
    let newStash = [];
    stash.forEach(e => {
      if (e.t > 1) {
        newStash.push({ c: e.c, t: e.t - 1 });
      } else {
        result += e.c;
        data
          .filter(a => a[0] == e.c)
          .forEach(a => {
            delete data[data.indexOf(a)];
          });
      }
    });
    stash = newStash;
    if (stash.length == workers) continue;
    var candidates = counts
      .filter(a => !a.r().length)
      .sort((a, b) => (b.c > a.c ? -1 : 1))
      .slice(0, workers - stash.length);
    candidates.forEach(e => {
      delete counts[counts.indexOf(e)];
      stash.push({
        c: e.c,
        t: e.t
      });
    });
  }
  return count;
}

console.log(part2(data, 5));
