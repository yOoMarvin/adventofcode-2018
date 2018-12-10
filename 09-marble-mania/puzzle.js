const _ = require("lodash");

const getHighestScore = (maxPlayers, lastMarble) => {
  let currentMarble = {
    marble: 0,
    next: null, //clockwise
    prev: null //anti clockwise
  };

  let nextMarble = 0;
  let scores = Array(maxPlayers).fill(0);

  do {
    nextMarble++;
    if (nextMarble % 23 === 0) {
      currentMarble = currentMarble.prev.prev.prev.prev.prev.prev.prev; //ouch, just move 7 anti clockwise
      scores[nextMarble % maxPlayers] += nextMarble + currentMarble.marble;
      currentMarble.prev.next = currentMarble.next;
      currentMarble.next.prev = currentMarble.prev;
      currentMarble = currentMarble.next;
    } else {
      let newMarble = { marble: nextMarble };
      if (currentMarble.next === null) {
        //end of circle
        currentMarble.next = newMarble;
        newMarble.next = currentMarble;
        currentMarble.prev = newMarble;
        newMarble.prev = currentMarble;
      } else {
        currentMarble = currentMarble.next;
        newMarble.next = currentMarble.next;
        currentMarble.next = newMarble;
        newMarble.prev = currentMarble;
        newMarble.next.prev = newMarble;
      }
      currentMarble = newMarble;
    }
  } while (nextMarble !== lastMarble);
  return _.max(scores);
};

console.log("SOLUTION PART 1 ", getHighestScore(459, 71320));

console.log("SOLUTION PART 2 ", getHighestScore(459, 71320 * 100));
