var fs = require("fs");
var arr = fs.readFileSync("./input.txt", "utf8").split("\n");

var status = 0;

arr.forEach(function(element) {
  number = element.slice(1);
  if (element[0] == "+") {
    status += parseInt(number);
  } else {
    status -= parseInt(number);
  }
});

console.log("Status: ");
console.log(status);
