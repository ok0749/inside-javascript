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
