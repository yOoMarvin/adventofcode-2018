var fs = require("fs");
var arr = fs.readFileSync("./input.txt", "utf8").split("\n");

var status = 0;
var temp = [];

var i = 0;
var loop = true;

while (loop) {
  for (i; i < arr.length; i++) {
    element = arr[i];
    number = element.slice(1);
    var result = parseInt(number);
    if (element[0] == "+") {
      status += result;
    } else {
      status -= result;
    }

    if (temp.includes(status)) {
      console.log("STOP. FREQ WAS ALREADY PRESENT");
      console.log(status);
      loop = false;
      return false;
    }

    temp.push(status);
  }
  i = 0;
}
