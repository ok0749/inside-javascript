// // // var add = function (x, y) {
// // //   return x + y;
// // // };

// // // var plus = add;

// // // console.log(add(3, 4), plus(5, 6));

// // // var factorialVar = function factorial(n) {
// // //   if (n <= 1) {
// // //     return 1;
// // //   }
// // //   return n * factorial(n - 1);
// // // };

// // // console.log(factorialVar(3)); // 6

// // // console.log(add(2, 3));

// // // function add(x, y) {
// // //   return x + y;
// // // }

// // // console.log(add(3, 4));

// // // function add(x, y) {
// // //   return x + y;
// // // }

// // // add.result = add(3, 2);
// // // add.status = "OK";

// // // console.log(add.result, add.status); // 5 'OK'
// // // console.log(add);

// // // (function (name) {
// // //   console.log("This is the immediate function --> " + name);
// // // })("foo");

// // // function parent() {
// // //   var a = 100;
// // //   var child = function () {
// // //     console.log(a);
// // //   };
// // //   return child;
// // // }

// // // var inner = parent();
// // // inner();

// // // var self = function () {
// // //   console.log("a");
// // //   return function () {
// // //     console.log("b");
// // //   };
// // // };

// // // self = self();
// // // self();

// // // function func(arg1, arg2) {
// // //   console.log(arg1, arg2);
// // // }

// // // func();
// // // func(1);
// // // func(1, 2);
// // // func(1, 2, 3);

// // function add(a, b) {
// //   console.dir(arguments);
// //   return a + b;
// // }

// // console.log(add(1, 2, 3));

// // function sum() {
// //   var result = 0;
// //   for (var i = 0; i < arguments.length; i++) {
// //     result += arguments[i];
// //   }
// //   return result;
// // }

// // console.log(sum(1, 2, 3, 4, 5)); // 15
// // console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9)); // 45

// // var value = 100;
// // var myObject = {
// //   value: 1,
// //   func1: function () {
// //     this.value += 1;
// //     console.log("func1() called this.value : " + this.value);

// //     func2 = function () {
// //       this.value += 1;
// //       console.log("func2() called this.value : " + this.value);

// //       func3 = function () {
// //         this.value += 1;
// //         console.log("func3() called this.value : " + this.value);
// //       };
// //       func3();
// //     };
// //     func2();
// //   },
// // };

// // myObject.func1(); // 2 101 102

// // var value = 100;
// // var myObject = {
// //   value: 1,
// //   func1: function () {
// //     var that = this;
// //     this.value += 1;
// //     console.log("func1() called this.value : " + this.value);

// //     func2 = function () {
// //       that.value += 1;
// //       console.log("func2() called this.value : " + that.value);

// //       func3 = function () {
// //         that.value += 1;
// //         console.log("func3() called this.value : " + that.value);
// //       };
// //       func3();
// //     };
// //     func2();
// //   },
// // };

// // myObject.func1();

// // function Person(name, age, gender) {
// //   this.name = name;
// //   this.age = age;
// //   this.gender = gender;
// // }
// // var qux = Person("qux", 20, "man");
// // console.log(qux); // undefined

// // function A(arg) {
// //   if (!(this instanceof A)) {
// //     return new A(arg);
// //   }
// //   this.value = arg ? arg : 0;
// // }
// // var a = A(10);
// // var b = new A(10);
// // var c = A();
// // console.log(a.value, b.value, c.value);

// // function Person(name, age, gender) {
// //   this.name = name;
// //   this.age = age;
// //   this.gender = gender;
// // }

// // var foo = {};

// // Person.apply(foo, ["foo", 30, "man"]);
// // console.log(foo); // { name: 'foo', age: 30, gender: 'man' }

// // var bar = {};
// // Person.call(bar, "foo", 30, "man");
// // console.log(bar);

// // function myFunction() {
// //   console.log(arguments);

// //   Array.prototype.shift.apply(arguments);
// //   // Array.prototype.shift() 메서드를 호출하고, this를 arguments 객체로 바인딩 한다.

// //   console.log(arguments);
// // }

// // myFunction(1, 2, 3);

// // var noReturnFunc = function () {
// //   console.log("This function has no return statement.");
// // };

// // var result = noReturnFunc(); // 'This function has no return statement'
// // console.log(result);

// // function Person(name, age, gender) {
// //   this.name = name;
// //   this.age = age;
// //   this.gender = gender;

// //   return { name: "bar", age: 20, gender: "woman" };
// // }

// // var foo = new Person("foo", 30, "man");
// // console.log(foo);

// // function People(name, age, gender) {
// //   this.name = name;
// //   this.age = age;
// //   this.gender = gender;

// //   return 100;
// // }

// // var foo = new People("foo", 30, "man");
// // console.log(foo); //

// function Person(name, age, gender) {
//   this.name = name;
//   this.age = age;
//   this.gender = gender;
// }

// var foo = new Person("foo", 30, "tennis");
// console.log(foo.hasOwnProperty("name"));
// console.log(Person.prototype);

// String.prototype.testMethod = function () {
//   console.log("This is the String.prototype.testMethod()");
// };

// var str = "this is test";
// str.testMethod(); // this is test

// function Person(name) {
//   this.name = name;
// }

// var foo = new Person("foo");

// Person.prototype.sayHello = function () {
//   console.log("hello");
// };

// foo.sayHello(); // hello

function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

var foo = new Person("foo");

Person.prototype = {
  country: "korea",
};

var bar = new Person("bar");
console.log(foo.getName()); // foo
// console.log(bar.getName()); //
console.log(foo.country); //
console.log(bar.country); // korea
console.log(foo.constructor);
console.log(bar.constructor);
