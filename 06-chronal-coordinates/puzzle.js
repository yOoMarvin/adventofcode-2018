// ===== DISCLAIMER =====
// NOT EVERYTHING MY CODE
// Got amazing help today from a more experienced developer
// Learned a ton of stuff, and actually he just banged out the code while I had no idea 😂
// Need to learn so many things!

// Read file
var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf8");

// Goal: array of arrays with coords as int [[12,24], [...]]
const cs = input
  .trim()
  .split("\n")
  .map(c => c.split(", ").map(s => parseInt(s)));

// ===== PART 1 =====
const run = (b0, b1) => {
  const ps = {};
  for (let y = b0[1]; y < b1[1]; ++y) {
    for (let x = b0[0]; x < b1[0]; ++x) {
      const cd = cs
        .map(c => [c, Math.abs(c[0] - x) + Math.abs(c[1] - y)])
        .reduce((a, b) => {
          if (a[1] < b[1]) return a;
          if (b[1] < a[1]) return b;
          return [[NaN, NaN], a[1]];
        });
      console.log(cd);
      ps[cd[0]] = (ps[cd[0]] || 0) + 1;
    }
  }
  return ps;
};

const x_min = cs.reduce((a, c) => (a[0] < c[0] ? a : c))[0];
const x_max = cs.reduce((a, c) => (a[0] > c[0] ? a : c))[0];
const y_min = cs.reduce((a, c) => (a[1] < c[1] ? a : c))[1];
const y_max = cs.reduce((a, c) => (a[1] > c[1] ? a : c))[1];

const bb = run([x_min, y_min], [x_max, y_max]);
const bb2 = run([x_min - 1, y_min - 1], [x_max + 1, y_max + 1]);

const a = cs
  .filter(c => bb[c] === bb2[c])
  .reduce((a, b) => (bb[b] && bb[a] < bb[b] ? b : a));

console.log(bb[a]);

// ===== PART 2 =====
const run2 = (b0, b1) => {
  let v = 0;
  for (let y = b0[1]; y < b1[1]; ++y) {
    for (let x = b0[0]; x < b1[0]; ++x) {
      if (
        cs
          .map(c => Math.abs(c[0] - x) + Math.abs(c[1] - y))
          .reduce((a, b) => a + b) < 10000
      ) {
        v += 1;
      }
    }
  }
  return v;
};
console.log(run2([x_min, y_min], [x_max, y_max]));
