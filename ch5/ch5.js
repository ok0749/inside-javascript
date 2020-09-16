// function helloFunc() {
//   this.greeting = "hello";
// }

// helloFunc.prototype.call = function (func) {
//   func ? func(this.greeting) : this.func(this.greeting);
// };

// function saySomething(obj, methodName, name) {
//   return function (greeting) {
//     return obj[methodName](greeting, name);
//   };
// }

// function newObj(obj, name) {
//   console.log(this);
//   obj.func = saySomething(this, "who", name);
//   return obj;
// }

// newObj.prototype.who = function (greeting, name) {
//   console.log(greeting + (name || " everyone"));
// };

// var objHello = new helloFunc();
// var obj1 = new newObj(objHello, " donghak");
// obj1.call();

// var buffAr = ["I am ", "", ". I live in ", "", ". I am ", "", " years old."];

// function getCompletedStr(name, city, age) {
//   buffAr[1] = name;
//   buffAr[3] = city;
//   buffAr[5] = age;

//   return buffAr;
// }

// var str = new getCompletedStr("donghak", "busan", 29);
// console.log(str.join(""));

// var getCompletedStr = (function () {
//   var buffAr = ["I am ", "", ". I live in ", "", ". I am ", "", " years old."];

//   return function (name, city, age) {
//     buffAr[1] = name;
//     buffAr[3] = city;
//     buffAr[5] = age;

//     return buffAr.join("");
//   };
// })();

// var str = getCompletedStr("donghak", "busan", 29);
// console.log(str);

// function callLater(obj, a, b) {
//   return function () {
//     obj["sum"] = a + b;
//     console.log(obj["sum"]);
//   };
// }
// var sumObj = {
//   sum: 0,
// };
// var func = callLater(sumObj, 1, 2);
// setTimeout(func, 1000);

// function outerFunc(argNum) {
//   var num = argNum;
//   return function (x) {
//     num += x;
//     console.log("num: " + num);
//   };
// }
// var exam = outerFunc(40); // num = 40;
// exam(5); // num: 45
// exam(-10); //

// function func() {
//   var x = 1;
//   console.log(x);
//   return {
//     func1: function () {
//       console.log(++x);
//     },
//     func2: function () {
//       console.log(-x);
//     },
//   };
// }

// var exam = func();
// exam.func1();
// exam.func2();

// function countSeconds(howMany) {
//   for (var i = 0; i <= howMany; i++) {
//     (function (currentI) {
//       setTimeout(function () {
//         console.log(currentI);
//       }, currentI * 1000);
//     })(i);
//   }
// }
// countSeconds(3);

// function countSeconds(howMany) {
//   for (let i = 0; i <= howMany; i++) {
//     console.log(i);
//     setTimeout(function () {
//       console.log(i);
//     }, i * 1000);
//   }
// }
// countSeconds(3);

// function countSeconds(howMany) {
//   for (var i = 0; i <= howMany; i++) {
//     (function (currentI) {
//       setTimeout(function () {
//         console.log(currentI);
//       }, currentI * 1000);
//     })(i);
//   }
// }
// countSeconds(3);

function a() {
  for (let i = 0; i < 5; i++) {
    let name = "donghak";
  }
  return name;
}

console.log(a());
