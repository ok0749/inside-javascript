// 3-1
var intNum = 10;
var floatNum = 0.1;
var str = "string";
var singleChar = "a";
var boolVar = true;
var emptyVar;
var nullVar = null;

console.log(
  typeof intNum, // number
  typeof floatNum, // number
  typeof str, // string
  typeof singleChar, // string
  typeof boolVar, // boolean
  typeof emptyVar, // undefined
  typeof nullVar // object
);

// 3-2
var num = 5 / 2;

console.log(num); // 2.5
console.log(Math.floor(num)); // 2

// 3-3
var str = "test";
console.log(str[0], str[1], str[2], str[3]); // t e s t

str[0] = "T";
console.log(str); // test
