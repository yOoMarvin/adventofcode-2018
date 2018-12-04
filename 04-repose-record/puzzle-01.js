// Try to use lodash for the first time
var _ = require("lodash");

// Read file into an array, line by line
var fs = require("fs");
var lines = fs.readFileSync("./input.txt", "utf8").split("\n");
// THIS IS SO IMPORTANT 😂
lines.sort();

var guards = {};

var currentGuard;

// ===== MAIN LOOP =====
for (var i = 0; i < lines.length; i++) {
  // if line contains: "Guard" --> This guard begins the shift
  if (lines[i].indexOf("Guard") != -1) {
    //get id of the guard
    currentGuard = lines[i].split("#")[1].split(" ")[0];
    // add guard to the guards object with the current id as id prop.
    if (!guards[currentGuard]) {
      guards[currentGuard] = {
        id: currentGuard
      };
    }
  } else {
    // get the times of the event
    const startMinute = parseInt(lines[i].substr(15, 2));
    const endMinute = parseInt(lines[i + 1].substr(15, 2));
    // if the guard does not already have the sleepTotal prop, set it to 0
    if (!guards[currentGuard].sleepTotal) {
      guards[currentGuard].sleepTotal = 0;
    }
    // duration of total sleep
    guards[currentGuard].sleepTotal += endMinute - startMinute;

    // loop through the available minutes
    for (var minute = startMinute; minute < endMinute; minute++) {
      // create new minutes object
      if (!guards[currentGuard].minutes) {
        guards[currentGuard].minutes = {};
      }
      // create new object for every minute slept
      if (!guards[currentGuard].minutes[minute]) {
        guards[currentGuard].minutes[minute] = {
          minute: minute,
          slept: 0
        };
      }
      // increase counter of slept
      guards[currentGuard].minutes[minute].slept += 1;
    }
    // skip over the next line, because it then the line of endMinute
    i++;
  }
}

// ==== PART ONE: ====

// use lodash here 😏
const chosenGuard = _.sortBy(guards, ["sleepTotal"])
  .reverse()
  .filter(guard => guard.sleepTotal)[0];
// also sort the minute object in the chosen guard
const mostSleptMinute = _.sortBy(chosenGuard.minutes, ["slept"]).reverse()[0];

// ==== SOLUTION PART ONE: ====

console.log(
  "id:",
  chosenGuard.id,
  "most slept minute:",
  mostSleptMinute.minute,
  "result strategy one: ",
  parseInt(chosenGuard.id) * parseInt(mostSleptMinute.minute)
);

// ===== PART TWO =====
var maxSlept = 0;
var guardId;
var chosenMinute;

// Loop through all guards
for (var guard of Object.values(guards)) {
  if (guard.minutes) {
    const mostSleptMinute = _.sortBy(guard.minutes, ["slept"]).reverse()[0];
    // check if mostSleptMinute is larger than before. We get the best at the end!
    if (mostSleptMinute.slept > maxSlept) {
      maxSlept = mostSleptMinute.slept;
      guardId = guard.id;
      chosenMinute = mostSleptMinute.minute;
    }
  }
}

// ===== SOLUTION PART TWO =====
console.log(
  "id: ",
  guardId,
  "most slept minute: ",
  chosenMinute,
  "Result Strategy2: ",
  parseInt(guardId) * parseInt(chosenMinute)
);
