function subClass(obj) {
  var parent = this === global ? Function : this;
  var F = function () {};

  var child = function () {
    var _parent = child.parent;
    if (_parent && _parent !== Function) {
      _parent.apply(this, arguments);
    }
    if (child.prototype._init) {
      child.prototype._init.apply(this, arguments);
    }
  };

  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
  child.parent = parent;
  child.subClass = arguments.callee;

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      child.prototype[i] = obj[i];
    }
  }
  return child;
}

var person_obj = {
  _init: function () {
    console.log("person init");
  },
  getName: function () {
    return this._name;
  },
  setName: function (name) {
    this._name = name;
  },
};

var student_obj = {
  _init: function () {
    console.log("student init");
  },
  getName: function () {
    return `Student name: ${this._name}`;
  },
};

var Person = subClass(person_obj); // Person 클래스 정의
var person = new Person(); // person init 출력

var Student = Person.subClass(); // Student 클래스 정의
var student = new Student(); // person init, student init 출력

student.setName("hi");
console.log(student.getName());
// var person = function (arg) {
//   var name = undefined;

//   return {
//     _init: function (arg) {
//       name = arg ? arg : "zzoon";
//     },
//     getName: function () {
//       return name;
//     },
//     setName: function (arg) {
//       name = arg;
//     },
//   };
// };

// Person = subClass(person());
// var iamhjoo = new Person("iamhjoo");
// console.log(iamhjoo.getName());

// Student = Person.subClass();
// var student = new Student("student");
// console.log(student.getName());
