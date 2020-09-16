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

// Object() 생성자 함수 이용
var foo = new Object();
foo.name = "foo";
foo.age = 30;
foo.gender = "male";

console.log(typeof foo, foo); // object, {name : 'foo', age : 30, gender : 'male'}

// 객체 리터럴 방식 이용
var foo = {
  name: "foo",
  age: 30,
  gender: "male",
};

console.log(typeof foo, foo); // object  {name : 'foo', age : 30, gender : 'male'}

var foo = {
  name: "foo",
  major: "computer science",
};

// 객체 프로퍼티 읽기
console.log(foo.name, foo["name"]);

// 객체 프로퍼티 갱신
foo.major = "electronics engineering";
foo["name"] = "bar";
console.log(foo.major, foo["major"], foo.name, foo["name"]);

// 객체 프로퍼티 동적 생성
foo.age = 30;
foo["gender"] = "male";
console.log(foo.age, foo["age"], foo.gender, foo["gender"]);

var foo = {
  name: "foo",
  age: 30,
  major: "computer science",
};

for (var prop in foo) {
  console.log(prop, foo[prop]);
}

var a = 100;
var b = 100;

var objA = { value: 100 };
var objB = { value: 100 };
var objC = objB;

console.log(a == b);
console.log(objA == objB);
console.log(objB == objC);

var a = 100;
var objA = { value: 100 };

function changeArg(num, obj) {
  num = 200;
  obj.value = 200;

  console.log(num, obj);
}

changeArg(a, objA); // 200 200

console.log(a, objA); // 100 200

var foo = {
  name: "foo",
  age: 30,
};

console.log(foo.toString()); //

var colorArr = ["orange", "yellow", "blue"];
console.log(colorArr[0], colorArr[1], colorArr[2]); // orange yellow blue

var emptyArr = [];
emptyArr[0] = 100;
emptyArr[3] = "eight";
emptyArr[7] = true;

console.log(emptyArr);

var arr = [];
console.log(arr.length); // 0

arr[0] = 0;
arr[1] = 1;
arr[100] = 100;
console.log(arr.length); // 101

arr.length = 100;
console.log(arr[100]); // undefined

var colorsArray = ["orange", "yellow", "green"];
var colorsObj = {
  0: "orange",
  1: "yellow",
  2: "green",
};

console.log(typeof colorsArray, typeof colorsObj); // object object
console.log(colorsArray.length, colorsObj.length); // 3 undefined

colorsArray.push("red"); // ['orange', 'yellow', 'green', 'red']
// colorsObj.push("red"); // Uncaught TypeError: Object #<Object> has no method 'push'

var arr = ["zero", "one", "two"];

arr.color = "blue";
arr.name = "numberArray";

console.log(arr);
console.log(arr.length);

for (var prop in arr) {
  console.log(prop, arr[prop]);
}

for (var i = 0; i < arr.length; i++) {
  console.log(i, arr[i]);
}

var arr = ["zero", "one", "two", "three"];

arr.splice(2, 1); // 2번째 요소를 시작점으로 1개의 원소를 삭제한다.
console.log(arr);
arr.splice(1, 2, "four"); // 1번째 요소를 시작점으로 2개의 원소를 삭제하고 'four'을 추가한다.
console.log(arr);

var foo = new Array(3);
console.log(foo);
console.log(foo.length);

var bar = new Array(1, 2, 3);
console.log(bar);

var obj = {
  name: "foo",
  length: 1,
};

Array.prototype.push.apply(obj, ["baz"]);
console.log(obj);

console.log(1 == "1"); // true
console.log(1 === "1"); // false
