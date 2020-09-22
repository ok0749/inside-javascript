# 객체 지향 프로그래밍

자바스크립트는 프로토타입 기반의 객체지향 언어이다. Java, C++과 같은 언어는 클래스 기반의 객체지향 언어이고, 이런 유형의 언어는 모든 인스턴스가 클래스에 정의된 대로 같은 구조이고 보통 런타임에 바꿀 수 없다. 반면에 프로토타입 기반의 언어는 객체의 자료구조, 메서드 등을 동적으로 바꿀 수 있다.

정확성, 안전성, 예측성 등의 관점에서 클래스 기반 언어는 프로토타입 기반의 언어보다 좀 더 나은 결과를 보장한다. 하지만 프로토타입 기반의 언어는 동적으로 자유롭게 객체의 구조와 동작 방식을 바꿀 수 있다는 장점이 있다.

[6.1 클래스, 생성자, 메서드](#6.1-클래스,-생성자,-메서드)  
[6.2 상속](#6.2-상속)  
[6.3 캡슐화](#6.3-캡슐화)  
[6.4 객체지향 프로그래밍 응용 예제](#6.4-객체지향-프로그래밍-응용-예제)

## 6.1 클래스, 생성자, 메서드

자바스크립트는 거의 모든 것이 객체이고, 특히 함수 객체로 많은 것을 구현해낸다. 클래스, 생성자, 메서드도 모두 함수로 구현이 가능하다.

    function Person(arg) {
        this.name = arg;

        this.getName = function() {
            return this.name;
        }

        this.setName = function(value) {
            this.name = value;
        }
    }

    var me = new Person('me');
    var you = new Person('you');

이 형태는 기존 객체지향 프로그래밍 언어에서 한 클래스의 인스턴스를 생성하는 코드와 매우 유사하다. 함수 Person이 클래스이자 생성자 역할을 한다. 사용자는 new 키워드로 인스턴스를 생성하여 사용할 수 있다. 생성된 me와 you는 Person의 인스턴스로서 name 변수가 있고, getName()과 setName() 함수(메서드)가 있다.  
이와 같이 객체를 생성하면 동작에는 문제가 없지만 각 객체가 setName() 함수와 getName() 함수를 따로 생성하므로 메모리의 낭비를 가져온다.

    function Person(arg) {
        this.name = arg;
    }

    Person.prototype.getName = function() {
        return this.name;
    }

    Person.prototype.setName = function(value) {
        this.name = value;
    }

    var me = new Person('me');
    var you = new Person('you');

Person 함수 객체의 prototype 프로퍼티에 getName()과 setName() 함수를 정의하면, 각 객체는 각자 따로 함수 객체를 생성할 필요 없이 프로토타입 체인으로 접근할 수 있다.

더글라스 크락포드의 방법

    Function.prototype.method = function(name, func) {
        if(!this.prototype[name])
            this.prototype[name] = func;
        }
    }

더글라스 크락포드 방법으로 변경

    Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    };

    function Person(arg) {
    this.name = arg;
    }

    Person.method("getName", function () {
    return this.name;
    });

    Person.method("setName", function (value) {
    this.name = value;
    });

    var me = new Person("me");
    var you = new Person("you");

## 6.2 상속

상속 구현 방식

1. 클래스 기반 전통적인 상속 방식 흉내
2. 클래스 개념 없이 객체의 프로토타입으로 상속 구현

### 6.2.1 프로토타입을 이용한 상속

더글라스 크락포드의 객체 상속 방법

    function create_object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }

create_object() 함수는 인자로 들어온 객체를 부모로 하는 자식 객체를 생성하여 반환한다.

예)

    var person = {
        name : 'name',
        getName : function() {
            return this.name;
        },
        setName : function(value) {
            this.name = value;
        }
    };

    function create_object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }

    var me = create_object(person);
    console.log(me.getName()); // name

클래스에 해당하는 생성자 함수를 만들지도 않았고, 그 클래스의 인스턴스를 따로 생성하지도 않았다. 단지 부모 객체에 해당하는 person 객체와 이 객체를 프로토타입 체인으로 참조할 수 있는 자식 객체 me를 만들어서 사용하였다.

extend 함수로 자식 객체에 메서드를 추가하는 코드

    var person = {
    name: "name",
    getName: function () {
        return this.name;
    },
    setName: function (value) {
        this.name = value;
    },
    };

    function create_object(o) {
    function F() {}
    F.prototype = o;
    return new F();
    }

    function extend(obj, prop) {
    if (!prop) {
        prop = obj;
        obj = this;
    }
    for (var i in prop) {
        obj[i] = prop[i];
    }
    return obj;
    }

    var me = create_object(person);
    var added = {
    setAge: function (age) {
        this.age = age;
    },
    getAge: function () {
        return this.age;
    },
    };

    extend(me, added);
    me.setAge("25");
    console.log(me.getAge());

얕은 복사를 사용하는 extend() 함수를 사용하여 me 객체를 확장시켰다.  
**얕은 복사** : 문자 혹은 숫자 리터럴 등이 아닌 객체인 경우 해당 객체를 복사하지 않고, 참조한다. 이는 두 번째 객체의 프로퍼티가 변경되면 첫 번째 객체의 프로퍼티도
같이 변경됨을 의미한다. 그러므로 보통 extend 함수를 구현하는 경우 대상이 객체일 때는 깊은 복사를 하는 것이 일반적이다.

### 6.2.2 클래스 기반의 상속

    function Person(arg) {
        this.name = arg;
    }

    Person.prototype.setName = function(value) {
        this.name = value;
    }

    Person.prototype.getName = function() {
        return this.name;
    }

    function Student(arg) {}

    var you = new Person('you');
    console.log(you.getName()); // you
    Student.prototype = you;

    var me = new Student('me');
    console.log(me.getName()); // you
    me.setName('she');
    console.log(me.getName()); // she

var me = new Student('me'); 에서 me를 인자로 넘겼으나 Student 함수에는 이를 반영하는 코드가 없다. 그러므로 me.getName() 메서드를 호출할 때 you 객체에 있는 name 프로퍼티 값을 참조한다. setName() 메서드가 호출되고 나서야 me 객체에 name 프로퍼티가 만들어진다. 이렇게 부모의 생성자가 호출되지 않으면, 인ㅅ턴스의 초기화가 제대로 이루어지지 않아 문제가 발생할 수 있다. 이를 해결하려면 다음의 코드를 추가하여 부모 클래스의 생성자를 호출해야 한다.

    function student(arg) {
        Person.apply(this, arg);
    }

현재는 자식 클래스의 prototype이 부모 클래스의 인스턴스를 참조한다. 이 구조는 자식 클래스의 prototype에 메소드를 추가할 때 문제가 된다. 이는 부모 클래스의 인스턴스인 you와 자식 클래스의 인스턴스인 me가 독립적이어야 함을 의미한다.

두 클래스의 프로토타입 사이에 중개자를 하나 만든다.

    function Person(arg) {
        this.name = arg;
    }

    Funtion.prototype.method = function(name, func) {
        this.prototype[name] = func;
    }

    Person.method("setName", function(value) {
        this.name = value;
    });

    Person.method('getName', function(){
        return this.name;
    });

    function Student(arg) {}

    function F() {}
    F.prototype = Person.prototype;
    Student.prototype = new F();
    Student.prototype.constructor = Student;
    Student.super = Person.prototype;

    var you = new Person('you');

    var me = new Student();
    Person.setName('person');
    me.setName('me');
    console.log(me.getName()); // me

빈 함수의 객체를 중간에 두어 Person의 인스턴스와 Student의 인스턴스를 서로 독립적으로 만들었다. 이제 Person 함수 객체에서 this에 바인딩 되는 것은 Student의 인스턴스가 접근할 수 없다.

Javascript Patterns의 저자 스토얀 스테파노프는 상속 관계를 즉시 실행 함수와 클로저를 활용하여 최적화된 함수로 소개 하였는데 다음과 같다.

    var inherit = (function(Parent, Child) {
        var F = function() {};
        return function(Parent, Child) {
            F.prototype = Parent.prototype;
            Child.prototype = new F();
            Child.prototype.constructor = Child;
            Child.super = Parent.prototype;
        };
    })();

## 6.3 캡슐화

캡슐화란 기본적으로 관련된 여러 가지 정보를 하나의 틀 안에 담는 것을 의미한다. 여기에서 중요한 것은 정보의 공개 여부이다. C++이나 Java에서는 public, private 멤버를 선언함으로써 해당 정보를 외부로 노출시킬지 여부를 결정하지만 자바스크립트는 이러한 키워드 자체를 지원하지 않는다. 자바스크립트에서는 다른 방법으로 정보 은닉이 가능하다.

    var Person = function(arg) {
        var name = arg ? arg : 'name';
        this.getName = () => name;
        this.setName = (newName) => {
            name = newName;
        }
    };

    var me = new Person();
    console.log(me.getName()); // name
    me.setName('me');
    console.log(me.getName()); // me
    console.log(me.name); // undefined

this 객체의 프로퍼티로 선언하면 외부에서 new 키워드로 생성한 객체로 접근할 수 있지만, var로 선언된 멤버들은 외부에서 접근이 불가능하다. 그리고 public 메서드가 클로저 역할을 하면서 private 멤버인 name에 접근할 수 있다. 이것이 자바스크립트에서 할 수 있는 기본적인 정보 은닉 방법이다.

코드를 조금 더 깔끔하게 다듬으면 다음과 같이 된다.

    var Person = function(arg) {
        var name = arg ? arg : 'name';

        return {
            getName : function() {
                return name;
            },
            setName : function(newName) {
                name = newName;
            }
        };
    };

    var me = new Person();
    console.log(me.getName()); // name

여기서 주의할 점은 접근하는 private 멤버가 객체나 배열이면 얕은 복사로 참조만을 반환하므로 사용자가 이후 이를 쉽게 변경할 수 있다는 점이다.

    var ArrCreate = function(arg) {
        var arr = [1, 2, 3];

        return {
            getArr: function() {
                return arr;
            }
        };
    };

    var obj = new ArrCreate();
    var arr = obj.getArr();
    arr.push(5);
    console.log(obj.getArr()); // [1, 2, 3, 5]

이와 같은 문제가 있으므로 객체를 반환하는 경우 신중해야 한다. 보통의 경우, 객체를 반환하지 않고 객체의 주요 정보를 새로운 객체에 담아서 반환하는 방법을 많이 사용한다. 하지만 꼭 객체가 반환되어야 하는 경우에는 깊은 복사로 복사본을 만들어서 반환하는 방법을 사용하는 것이 좋다.

위 코드에서 사용자가 반환받은 객체는 Person 함수 객체의 프로토타입에는 접근할 수 없다는 단점이 있다. 이를 보완하려면 객체를 반환하는 것이 아닌, 함수를 반환하는 것이 좋다.

    var Person = (function(arg){
        var name = arg ? arg : 'name';

        var Func = function() {}
        Func.prototype = {
            getName: function() {
                return name;
            },
            setName: function(newName) {
                name = newName;
            }
        };
        return Func;
    })();

    var me = new Person();
    console.log(me.getName()); // name
    console.log(me.name) // undefined

클로저를 활용하여 name에 접근할 수 없게 했다. 즉시 실행 함수에서 반환되는 Func이 클로저가 되고 이 함수가 참조하는 name 프로퍼티가 자유 변수가 된다. 따라서 사용자는 name에 대한 접근이 불가능하다.

## 6.4 객체지향 프로그래밍 응용 예제

### 6.4.1 클래스의 기능을 가진 subClass 함수

기존 클래스와 같은 기능을 하는 자바스크립트 함수를 만들기 위해 다음 세가지를 활용해서 구현 한다. 함수의 이름은 subClass로 한다.

- 함수의 프로토타입 체인
- extend 함수
- 인스턴스를 생성할 때 생성자 호출(여기선느 생성자를 \_init 함수로 정한다.)

#### 6.4.1.1 subClass 함수 구조

**subClass는 상속받을 클래스에 넣을 변수 및 메서드가 담긴 객체를 인자로 받아 부모 함수를 상속 받는 자식 클래스를 만든다.** 여기서 부모 함수는 subClass() 함수를 호출할 때 this 객체를 의미한다.

예를 들면 다음과 같다.

    var SuperClass = subClass(obj);
    var SubClass = Superclass.subClass(obj);

이처럼 SuperClass를 상속받는 subClass를 만들고자 할 때, SuperClass.subClass()의 형식으로 호출하게 구현한다. 참고로 최상위 클래스인 SuperClass는 자바스크립트의 Function을 상속받게 한다.

함수 subClass 구조는 다음과 같이 구성된다.

    function subClass(obj) {
        // 자식 클래스 (함수 객체) 생성
        // 생성자 호출
        // 프로토타입 체인을 활용한 상속 구현
        // obj를 통해 들어온 변수 및 메서드를 자식 클래스에 추가
        // 자식 함수 객체 반환
    }

#### 6.4.1.2 자식 클래스 생성 및 상속

    function subClass(obj) {
        var parent = this;
        var F = function() {};

        var child = function() {};

        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.parent = parent.prototype;
        child.parent_constructor = parent;

        return child;
    }

#### 6.4.1.3 자식 클래스 확장

사용자가 인자로 넣은 객체를 자식 클래스에 넣어 자식 클래스를 확장한다.

    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            child.prototype[i] = obj[i];
        }
    }

#### 6.4.1.4 생성자 호출

클래스의 인스턴스가 생성될 때, 클래스 내에 정의된 생성자가 호출돼야 한다. 물론 부모 클래스의 생성자 역시 호출되어야 한다.

    var child = function() {
    var parent = child.parent; // = parent.prototype;
    if (parent.hasOwnProperty('\_init')){
    parent.\_init.apply(this, arguments);
    }
    if(child.prototype.hasOwnProperty('\_init')){
    child.prototype.\_init.apply(this, arguments);
    }
    };

위의 코드는 단순히 부모와 자식이 한쌍을 이루었을 때만 제대로 동작한다. 자식을 또 다른 함수가 다시 상속 받았을 때는 문제가 있다.

    var SuperClass = subClass();
    var SubClass = SuperClass.subClass();
    var Sub_SubClass = SubClass.subClass();

    var instance = new Sub_SubClass();

위 코드에서 instance를 생성할 때, 그 상위 클래스의 상위 클래스인 SuperClass의 생성자가 호출 되지 않는다. 따라서 부모 클래스의 생성자를 호출하는 코드는 재귀적으로 구현할 필요가 있다. 이미 child.parent_constructor에 부모의 생성자 함수를 참조시켜 놓았으므로 구현에 문제가 없다.

    var child = function() {
        var _parent = child.parent_constructor; // parent

        if (_parent && _parent !== Function) { // 부모 생성자가 있고 부모가 Function이 아니면 true
            // 현재 클래스의 부모 생성자가 있으면 그 함수를 호출한다. 다만 부모가 Function인 경우는 최상위 클래스에 도달 했으므로 실행하지 않는다.
            _parent.apply(this. arguments); // 부모 함수의 재귀적 호출
        }

        if (child.prototype.hasOwnProperty('_init')) {
            child.prototype._init.apply(this, arguments);
        }
    };

#### 6.4.1.5 subClass 보완

parent를 단순히 this.prototype으로 지정해서는 안된다. 처음에 최상위 클래스를 Function을 상속받는 것으로 정했는 데, 현재 코드에는 이를 처리하는 코드가 없다.
따라서, 다음과 같이 수정한다.

    var parent = this === window ? Function : this; // Node.js의 경우에는 global을 사용한다.

또 하나, subClass 안에서 생성하는 자식 클래스의 역할을 하는 함수는 subClass 함수가 있어야 한다.

    child.subClass = arguments.callee;

arguments.callee는 현재 호출된 함수를 의미하는 데, 현재 호출된 함수가 subClass이므로 child.subClass는 subClass 함수를 참조한다.

subClass 함수의 전체 코드는 다음과 같다.

    function subClass(obj) {
        var parent = this === window ? Function : this;
        var F = function() {};

        var child = function() {
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

#### 6.4.1.6 subClass 활용

subClass 함수로 상속하는 예제

    var person_obj = {
        _init : function() {
            console.log('person init');
        },
        getName : function() {
            return this._name;
        },
        setName : function(name) {
            this._name = name;
        }
    };

    var student_obj = {
        _init : funtion() {
            console.log('student init');
        },
        getName : function() {
            return `Student name: ${this._name}`;
        }
    };

    var Person = subClass(person_obj); // Person 클래스 정의
    var person = new Person(); // person init 출력
    person.setName('zzoon');
    console.log(person.getName()); // zzoon

    var Student = Person.subClass(student_obj); // Student 클래스 정의
    var student = new Student(); // person init, student init 출력
    student.setName('iamjoo');
    console.log(student.getName()); // Student name: iamjoo

    console.log(Person.toString()); // Person이 Function을 상속 받는지 확인
![subClass descripttion image](/subclass%20image.jpeg)

#### 6.4.1.7 subClass 함수에 클로저 적용
위의 코드에서 subClass 함수가 호출될 때마다 생성되는 임시 함수 객체 F를  클로저로 단 한 번만 생성되게 수정한다. 

    var subclass = (function(){
        var F = function(){};

        var subClass = function(obj) {
            ......
        }

        return subClass;
    })();


### 6.4.2 subClass 함수와 모듈 패턴을 이용한 객체지향 프로그래밍 
    var person = function(arg) {
        var name = undefined;

        return {
            _init: function(arg) {
                name = arg? arg : 'zzoon';
            },
            getName: function() {
                return name;
            },
            setName: function() {
                name = arg;
            }
        };
             
    }

    Person = subClass(person());
    var iamhjoo = new Person('iamhjoo');
    console.log(iamhjoo.getName()); // iamhjoo

    Student = Person.subClass();
    var student = new Student('student');
    console.log(student.getName()); /// student
person 함수 객체는 name의 정보를 캡슐화시킨 객체를 반환받는 역할을 한다. 이렇게 반환받은 객체는 subClass() 함수의 인자로 들어가 클래스의 역할을 하는 Person 함수 객체를 완성시킬 수 있다. 
