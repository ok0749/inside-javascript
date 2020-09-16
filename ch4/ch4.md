# 4. 함수와 프로토타입 체이닝
자바스크립트에서 함수의 기능은 다른 언어에서와 마찬가지로 특정 기능을 제공하는 코드를 작성해서 함수를 정의하고, 이를 호출해서 결과값을 얻는 기능을 제공한다.
하지만 이러한 기능 이외에도 모듈화 처리나 클로저, 객체 생성 등 자바스크립트의 근간이 되는 많은 기능을 제공 한다. 

[4.1 함수 정의](#4.1-함수-정의)  
[4.2 함수 객체 : 함수도 객체다](#4.2-함수-객체-:-함수도-객체다)  
[4.3 함수의 다양한 형태](#4.3-함수의-다양한-형태)  
[4.4 함수 호출과 this](#4.4-함수-호출과-this)  
[4.5 프로토타입 체이닝](#4.5-프로토타입-체이닝)

## 4.1 함수 정의
함수 생성 방법 
1. 함수 선언문(function statement)
2. 함수 표현식(function expression)
3. Function() 생성자 함수

### 4.1.1 함수 리터럴 
자바스크립트에서는 함수도 일반 객체처럼 값으로 취급된다. 때문에 객체 리터럴 방식으로 일반 객체를 생성할 수 있는 것 처럼, 함수 리터럴을 이용해 함수를 생성할 수 있다.

    function add(x, y){
        return x + y;
    }

함수 리터럴 구성
1. function 키워드 : 함수 리터럴은 function 키워드로 시작한다.
2. 함수명 : 함수명은 선택 사항이다. 함수명이 없는 함수를 익명 함수(annonymous function)라 한다.
3. 매개변수 리스트 : 매개변수 타입을 기술하지 않는다.
4. 함수 몸체 : 함수가 호출됐을 때 실행되는 코드 부분

### 4.1.2 함수 선언문 방식으로 함수 생성하기 
함수 선언문 방식은 함수 리터럴 형태와 같다. 함수 선언문 방식으로 정의된 함수의 경우는 **반드시 함수명이 정의되어 있어야 한다.**

### 4.1.3 함수 표현식 방식으로 함수 생성하기
함수 리터럴로 하나의 함수를 만들고, 여기서 생성된 함수를 변수에 할당하여 함수를 생성하는 것을 **함수 표현식**이라고 말한다. 

    var add = function(x, y){
        return x + y;
    }

    var plus = add;

    console.log(add(3,4), plus(5,6)); // 7 11 
    // add와 plus 함수 변수는 두 개의 인자를 더하는 동일한 익명 함수를 참조한다.

- add 변수는 함수 리터럴로 생성한 함수를 참조하는 변수이지 함수 이름이 아니다. 이 책에서 이를 **함수 변수**라 한다.
- 변수 plus에 add 함수 참조값을 그대로 할당할 수 있다.
- 함수 표현식으로 생성된 함수를 호출하려면 함수 변수를 사용해야 한다. 


함수 이름이 포함된 함수 표현식을 기명 함수 표현식이라 한다. 

    var add = function sum(x, y){
        return x + y;
    };

        console.log(add(3, 4)); // 7
        console.log(sum(3, 4)); // Uncaught ReferenceError : sum is not defined 
        // 함수 표현식에서 사용된 함수 이름은 외부 코드에서 접근 불가능 하다.
함수 표현식에 사용된 함수 이름은 정의된 함수 내부에서 해당 함수를 재귀적으로 호출하거나, 디버거 등에서 함수를 구분할 때 사용된다.


앞서 함수 선언문으로 정의한 add() 함수는 자바스크립트 엔진에 의해 함수표현식 형태로 변경되지 때문에 함수 이름으로 함수가 호출되는 것처럼 보이지만, 실제로는 add 함수 변수로 함수 외부에서 호출이 가능하게 된 것이다.  


    var add = function add(x, y){
       return x + y;
     };


함수 표현식에서는 함수 이름이 선택 사항이지만, 이러한 함수 이름을 이용하면 함수 코드 내부에서 함수 이름으로 함수의 재귀적인 호출 처리가 가능하다

    var factorialVar = function factorial(n){
        if(n <= 1){
            return 1;
        }
        return n * factorial(n-1);
    };

    console.log(factorialVar(3)); // 6


**일반적으로 자바스크립트 코드를 작성할 때 함수 선언문 방식으로 선언된 함수의 경우는 함수 끝에 세미콜론(;)을 붙이지 않지만, 함수 표현식의 경우는 세미콜론(;)을 붙이는 것을 권장한다.**

### 4.1.4 Function() 생성자 함수를 통한 함수 생성하기 

    var add = new Function('x', 'y', 'return x + y');
    console.log(add(3, 4)); // 7

### 4.1.5 함수 호이스팅
위의 3가지 함수 생성 방법은 모두 같은 기능의 함수를 생성하지만 동작 방식이 약간 차이가 있다. 그중 하나가 함수 호이스팅(Function Hoisting)이다.

    console.log(add(2, 3)); // 5

    function add(x, y){
        return x + y;
    }

    console.log(add(3, 4)); // 7
    
add() 함수가 정의되지 않았음에도 아래에 있는 add() 함수를 호출하는 것이 가능하다. 함수가 자신이 위치한 코드에 상관없이 **함수 선언문 형태로 정의한 함수의 유효 법위는 코드의 맨 처음부터 시작한다**는 것을 확인할 수 있다. 이것을 **함수 호이스팅**이라고 부른다.

    console.log(add(2, 3)); // Uncaught type error

    var add = function(x, y){
        return x + y;
    };

    console.log(add(3, 4)); // 7 

**함수 표현식 방식에서는 함수가 생성된 이후에 호출이 가능하다.** 

## 4.2 함수 객체 : 함수도 객체다

### 4.2.1 자바스크립트에서는 함수도 객체다
함수도 일반 객체 처럼 프로퍼티들을 가질 수 있다.

    function add(x, y) {
        return x + y;
    }

    add.result = add(3, 2);
    add.status = 'OK';

    console.log(add.result, add.status); // 5 'OK'
    console.log(add) // { [Function: add] result: 5, status: 'OK' }


### 4.2.2 자바스크립트에서 함수는 값으로 취급된다
다음과 같은 특징 때문에 자바스크립트에서 함수를 **일급 객체**(First Class)라고 부른다.
1. 리터럴에 의해 생성
2. 변수나 배열의 요소, 객체의 프로퍼티등에 할당 가능
3. 함수의 인자로 전달 가능
4. 함수의 리턴값으로 리턴 가능
5. 동적으로 프로퍼티를 생성 및 항당 가능

#### 4.2.2.1 변수나 프로퍼티의 값으로 할당
    var bar = function(){
        return 100;
    };
    console.log(bar()); // 100

    var obj = {};
    obj.baz = function() {
        return 200;
    }
    console.log(obj.baz); // 200

#### 4.2.2.2 함수 인자로 전달
    var foo = function(func) {
        func();
    };

    foo(function() {
        console.log('Function can be used as the argument.');
    }); // Function can be used as the argument.

#### 4.2.2.3 리턴값으로 활용
    var foo = function() {
        return function() {
            console.log('this function is the return value.')
        };
    };

    var bar = foo();
    bar(); // this function is the return value.


### 4.2.3 함수 객체의 기본 프로퍼티
함수는 일반 객체와는 다르게 추가로 함수 객체만의 표준 프로퍼티가 정의되어 있다.
- arguments : 함수를 호출할 때 전달된 인자값을 나타낸다.
- caller : 자신을 호출한 함수를 나타낸다.
- length : 함수를 작성할 때 정의한 인자 개수를 나타낸다.
- name : 함수의 이름을 나타낸다.

정의된 함수 객체의 부모 역할을 하는 프로토타입 객체는 **Function.prototype** 객체이고 Function.prototype 객체의 부모는 **Object.prototype** 객체이다.  
**Function.prototype 객체는 모든 함수들의 부모 역할을 하는 프로토타입 객체**이다.


## 4.3 함수의 다양한 형태

### 4.3.1 콜백 함수
콜백 함수는 코드를 통해 명시적으로 호출하는 함수가 아니라, 개발자는 단지 함수를 등록하기만 하고, 어떤 이벤트가 발생했거나 특정 시점에 도달했을 때 시스템에서 호출되는 함수를 말한다. 또한, 특정 함수의 인자로 넘겨서, 코드 내부에서 호출되는 함수 또한 콜백 함수가 될 수 있다.

대표적인 콜백 함수의 사용 예가 자바스크립트에서의 이벤트 핸들러 처리이다.  
이벤트 -----> 이벤트 핸들러 -----> 콜백 함수 
    <!DOCTYPE html>
    <html><body>
        <script>
            // 페이지 로드 시 호출될 콜백 함수
            window.onload = function() {
                alert('This is the callback function.');
            };
        </script>
    <body></html>

### 4.3.2 즉시 실행 함수(immediate function)
즉시 실행 함수의 경우, 같은 함수를 다시 호출할 수 없다. 따라서 즉시 실행 함수의 이러한 특징을 이용한다면 **최초 한 번의 실행만을 필요로 하는 초기화 코드 부분** 등에 사용할 수 있다.

    (function (name) {
        console.log('This is the immediate function --> ' + name);
    })('foo');

### 4.3.3 내부 함수(inner function)
자바스크립트에서는 함수 코드 내부에서도 다시 함수 정의가 가능하다. 이렇게 함수 내부에 정의된 함수를 내부 함수라고 부른다.  

    function parent() {
        var a = 100;
        var b = 200;

        function child() { // 내부 함수 정의
            var b = 300;
        
        console.log(a, b);
        }
        child();
    }

    parent(); // 100 300
    child(); // Uncaught ReferenceError : child is not defined

- 내부 함수에서는 자신을 둘러싼 부모 함수의 변수에 접근이 가능하다.
- 내부 함수는 일반적으로 자신이 정의된 부모 함수 내부에서만 호출이 가능하다.

부모 함수에서 내부 함수를 외부로 리턴하면, 부모 함수 밖에서도 내부 함수를 호출하는 것이 가능하다.

    function parent() {
        var a = 100;
        var child = function() {
            console.log(a);
        };
        return child;
    }
  
    var inner = parent();
    inner(); // 100

이와 같이 실행이 끝난 parent()와 같은 부모 함수 스코프의 변수를 참조하는 inner()와 같은 함수를 **클로저**라고 한다.

### 4.3.4 함수를 리턴하는 함수
함수를 호출함과 동시에 다른 함수로 바꾸거나, 자기 자신을 재정의하는 함수를 구현할 수 있다.  

    var self = function() {
        console.log('a');
        return function() {
            console.log('b');
        };
    };

    self = self(); // a
    self(); // b

## 4.4 함수 호출과 this 

### 4.4.1 arguments 객체 
C언어와 같은 엄격한 언어와 달리, 자바스크립트에서는 함수를 호출할 때 함수 형식에 맞춰 인자를 넘기지 않더라도 에러가 발생하지 않는다.

    function func(arg1, arg2) {
        console.log(arg1, arg2);
    }

    func(); // undefined undefined
    func(1); // 1 undefined
    func(1, 2); // 1 2
    func(1, 2, 3); // 1 2 
정의된 함수의 인자보다 적게 함수를 호출했을 경우, 넘겨지지 않은 인자에는 undefined 값이 할당된다. 정의된 인자 개수보다 많게 함수를 호출했을 경우는 에러가 발생하지 않고, 초과된 인수는 무시된다.


함수 코드를 작성할 때, 런타임 시에 호출된 인자의 개수를 확인하고 이에 따라 동작을 다르게 해줘야 할 경우, arguments 객체가 이를 가능케 한다.  
함수를 호출할 때 인수들과 함께 암묵적으로 arguments 객체가 함수 내부로 전달된다. arguments 객체는 함수를 호출할 때 넘긴 인자들이 배열 형태로 저장된 객체를 의미한다. 이 객체는 실제 배열이 아닌 **유사 배열 객체**이다. 

    function add(a, b){
        console.dir(arguments);
        return a + b;
    }

    console.log(add(1, 2, 3));
    // [Arguments] { '0': 1, '1': 2, '2': 3 }
        3

arguments 객체 구성 
- 함수를 호출할 때 넘겨진 인자(배열 형태)
- length 프로퍼티 : 호출할 때 넘겨진 인자의 개수
- callee 프로퍼티 : 현재 실행 중인 함수의 참조값

arguments 객체는 매개변수 개수가 정확하게 정해지지 않은 함수를 구현하거, 전달된 인자의 개수에 따라 서로 다른 처리를 해줘야 하는 함수를 개발하는 데 유용하다.

    function sum() {
        var result = 0;
        for(var i=0; i<arguments.length; i++) {
            result += arguments[i];
        }
        return result;
    }

    console.log(sum(1, 2, 3, 4, 5)); // 15
    console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9)); // 45


### 4.4.2 호출 패턴과 this 바인딩
자바스크립트에서 함수를 호출할 때 기존 매개변수로 전달되는 인자값에 더해, arguments 객체 및 this 인자가 함수 내부로 암묵적으로 전달된다.
this는 함수가 호출되는 방식(호출 패턴)에 따라 다른 객체를 참조한다.(this 바인딩)

#### 4.4.2.1 객체의 메서드 호출할 때 this 바인딩
객체의 프로퍼티가 함수일 경우, 이 함수를 메서드라고 부른다. 메서드를 호출할 때, 메서드 내부 코드에서 사용된 this는 **해당 메서드를 호출한 객체로 바인딩** 된다.

    var myObject = function() {
        name = 'foo',
        sayName: function() {
            console.log(this.name)
        };
    };

    var otherObject = {
        name: 'bar'
    };

    otherObject.sayName = myObject.sayName;

    myObject.sayName(); // foo
    otherObject.sayName(); // bar

#### 4.4.2.2 함수를 호출할 때 this 바인딩
자바스크립트에서 함수를 호출하면, 해당 함수 내부 코드에서 사용된 **this는 전역 객체에 바인딩** 된다. 자바스크립트를 실행하는 경우 전역 객체는 **window객체**가 된다. 자바스크립트의 모든 전역 변수는 실제로는 이러한 전역 객체의 프로퍼티들이다.

    var foo = 'I'm foo';

    console.log(foo, window.foo); // I'm foo I'm foo
따라서 전역 변수는 전역 객체(window)의 프로퍼티로도 접글할 수가 있다.

    var test = 'This is test';
    var sayFoo = function() {
        console.log(window.test);
        console.log(this.test);
    };

    sayFoo(); // This is test
this가 전역 객체인 window에 바인딩 되는 것을 확인할 수 있다.

함수 호출에서의 this바인딩 특성은 내부 함수를 호출했을 경우에도 그대로 적용된다.

    var value = 100;
    var myObject = {
        value: 1,
        func1: function() {
            this.value += 1;
            console.log('func1() called this.value : ' + this.value);

            func2 = function() {
                this.value += 1;
                console.log('func2() called this.value : ' + this.value);

                func3 = function() {
                    this.value += 1;
                    console.log('func3() called this.value : ' + this.value);
                }
                func3();
            }
            func2();
        }
    };

    myObject.func1(); // 2 101 102 
내부 함수도 결국 함수이므로 이를 호출할 때는 함수 호출로 취급된다. 따라서 함수 호출 패턴 규칙에 따라 내부 함수의 this는 전역 객체(window) 에 바인딩된다.

내부 함수가 this를 참조하는 자바스크립트의 한계를 극복하려면 부모 함수의 this를 내부 함수가 접근 가능한 다른 변수에 저장하는 방법이 사용된다.
보통 관례상 this값을 저장하는 변수의 이름을 that이라고 짓는다.

    var value = 100;
    var myObject = {
        value: 1,
        func1: function() {
            var that = this;
            this.value += 1;
            console.log('func1() called this.value : ' + this.value);

            func2 = function() {
                that.value += 1;
                console.log('func2() called this.value : ' + that.value);

                func3 = function() {
                    that.value += 1;
                    console.log('func3() called this.value : ' + that.value);
                }
                func3();
            }
            func2();
        }
    };

    myObject.func1(); // 2 3 4


#### 4.4.2.3 생성자 함수를 호출할 때 this 바인딩
자바스크립트의 생성자 함수는 말 그대로 자바스크립트의 객체를 생성하는 역할을 한다. **기존 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작한다.** 
대부분의 자바스크립트 스타일 가이드에서는 특정 함수가 생성자 함수로 정의되어 있음을 알리려고 **함수 이름의 첫 문자를 대문자로 쓰기**를 권하고 있다.

생성자 함수가 동작하는 방식
1. 빈 객체 생성 및 this 바인딩  
   생성자 함수 코드가 실행되기 전 빈 객체가 생성된다. 이 객체는 this로 바인딩된다. 따라서, 이후 생성자 함수의 코드 내부에서 사용된 this는 이 빈객체를 가리킨다.  
   이렇게 생성자 함수가 생성한 객체는 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정한다.

2. this를 통한 프로퍼티 생성
   함수 코드 내부에서 this를 사용해서, 앞에서 생성된 빈 객체에 동적으로 프로퍼티나 매서드를 생성할 수 있다.

3. 생성된 객체 리턴
   특별하게 리턴문이 없을 경우, this로 바인딩된 새로 생성한 객체가 리턴된다. 명시적으로 this를 리턴해도 결과는 같다(생성자 함수가 아닌 일반 함수를 호출할 때 리턴값이 명시되어 있지 않으면 undefined가 리턴된다.)  
   리턴값이 새로 생성한 객체(this)가 아닌 다른 객체를 반환하는 경우 생성자 함수를 호출했다 하더라도 this가 아닌 해당 객체가 리턴된다.  

/

    var Person = function(name) {
        this.name = name;
    };

    var foo = new Person('foo');
    console.log(foo.name); // foo

1. Person() 함수가 생성자로 호출되면, 함수 코드가 실행되기 전에 빈 객체가 생성된다. 여기서 생성된 빈 객체는 Person() 생성자 함수의 prototype 프로퍼티가 가리키는
   객체(Person.prototype 객체)를 [[Prototype]]링크로 연결해서 자신의 프로토타입으로 설정한다. 이렇게 생성된 객체는 생성자 함수 코드에서 사용되는 this로 바인딩된다.

2. this가 가리키는 빈 객체에 name이라는 동적 프로퍼티를 생성한다.

3. 리턴값이 특별히 없으므로 this로 바인딩한 객체가 생성자 함수의 리턴값으로 반환돼서, foo 변수에 저장된다.


객체 리터럴 방식과 생성자 함수를 통한 객체 생성 방식의 차이
1. 객체 리터럴 방식으로 생성된 객체는 같은 형태의 객체를 재생성할 수 없지만, 생성자 함수를 사용해서 객체를 생성하면, 생성자 함수를 호출할 때 다른 인자를 넘김으로써 
   같은 형태의 서로 다른 객체를 생성할 수 있다. 

2. 객체 리터럴 방식에서는 객체 생성자 함수는 Object()이고, 생성자 함수 방식의 경우는 생성자 함수 그 자체이므로 프로토타입 객체가 다르다.


생성자 함수를 new를 붙이지 않고 호출할 경우

    var Person = function(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    var qux = Person('qux', 20, 'man');
    console.log(qux); // undefined
    console.log(window.name, window.age, window.gender); // 'qux' 20 'man'
생성자 함수 Person()을 new 없이 일반 함수 형태로 호출할 경우, this는 함수 호출이므로 전역 객체인 window 객체로 바인딩된다.  
생성자 함수는 별도의 리턴값이 정해져 있지 않은 경우에 새로 생성된 객체가 리턴되지만, 일반 함수를 호출할 때는 undefined가 리턴된다.


강제로 인스턴스 생성
    function A(arg) {
        if(!(this instanceof A)) {
            return new A(arg);
        }
        this.value = arg ? arg : 0;
    }

    var a = A(10);
    var b = new A(10);
    var c = A();
    console.log(a.value, b.value, c.value); // 10 10 0


#### 4.4.2.4 call과 apply 메서드를 이용한 명시적인 this 바인딩
자바스크립트는 내부적인 this 바인딩 이외에도 this를 특정 객체에 명시적으로 바인딩시키는 방법도 제공한다. 이를 가능하게 하는 것이 apply()와 call() 메서드다.
call() 메서드는 apply() 메서드와는 기능이 같고 단지 넘겨받는 인자의 형식만 다르다. 

이 메서드들은 모든 함수의 부모 객체인 Function.prototype 객체의 메서드이므로, 모든 함수는 다음과 같은 형식으로 apply() 메서드를 호출하는 것이 가능하다.
function.apply(thisArg, argArray)

apply() 메서드를 호출하는 주체는 함수고, apply() 메서드도 this를 특정 객체에 바인딩할 뿐 결국 본질적인 기능은 함수 호출이다.  
첫 번째 인자는 메서드를 호출한 함수 내부에서 사용한 this에 바인딩할 객체를 가리킨다.  
두 번째 인자는 함수를 호출할 때 넘길 인자들의 배열을 가리킨다. 
    function Person(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    var foo = {};

    Person.apply(foo, ['foo', 30, 'man']);
    console.log(foo); // { name: 'foo', age: 30, gender: 'man' }

    var bar = {};
    Person.call(bar, 'foo', 30, 'man');
    console.log(bar); // { name: 'foo', age: 30, gender: 'man' }


apply() 메서드를 활용한 arguments 객체의 배열 표준 메서드 slice() 활용 코드
    function myFunction(){
        console.log(arguments);
        
        Array.prototype.shift.apply(arguments); 
        // Array.prototype.shift() 메서드를 호출하고, this를 arguments 객체로 바인딩 한다.
        console.log(arguments);
    }

    myFunction(1, 2, 3); 
    // [Arguments] { '0': 1, '1': 2, '2': 3 }
    // [Arguments] { '0': 2, '1': 3 }


### 4.4.3 함수 리턴
**자바스크립트 함수는 항상 리턴값을 반환한다.**

#### 4.4.3.1 일반 함수나 메서드는 리턴값을 지정하지 않을 경우, undefined 값이 리턴된다.

    var noReturnFunc = function() {
        console.log('This function has no return statement.');
    };

    var result = noReturnFunc(); // 'This function has no return statement'
    console.log(result); // undefined

#### 4.4.3.2 생성자 함수에서 리턴값을 지정하지 않을 경우 생성된 객체가 리턴된다.

    function Person(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;

        return {name:'bar', age:20, gender:'woman'};
    }

    var foo = new Person('foo', 30, 'man');
    console.log(foo); // { name: 'bar', age: 20, gender: 'woman' }

**생성자 함수의 리턴값으로 넘긴 값이 객체가 아닌 불린, 숫자, 문자열의 경우는 이러한 리턴값을 무시하고 this로 바인딩된 객체가 리턴된다.**


    function Person(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;

        return 100;
    }

    var foo = new Person('foo', 30, 'man');
    console.log(foo); // Person { name: 'foo', age: 30, gender: 'man' }


## 4.5 프로토타입 체이닝

### 4.5.1 포르토타입의 두 가지 의미 
자바스크립트는 기존 C++이나 자바 같은 객체지향 프로그래밍 언어와는 다른 프로토타입 기반의 객체지향 프로그래밍을 지원한다.  
자바스크립트에서 모든 객체는 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 프로토타입 객체를 자신의 부모 객체로 설정하는 [[Prototype]]링크로 연결한다.

### 4.5.2 객체 리터럴 방식으로 생성된 객체의 프로토타입 체이닝
자바스크립트에서 객체는 자기 자신의 프로퍼티뿐만이 아니라, 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티 또한 마치 자신의 것처럼 접근하는 게 가능하다. 이것을 가능케 하는 게 바로 프로토타입 체이닝이다. 

    var myObject = {
        name: 'foo',
        sayName: function() {
            console.log('My name is ' + this.name);
        }
    };

    myObject.sayName(); // My name is foo
    console.log(myObject.hasOwnProperty('name')); // ture
    console.log(myObject.hasOwnProperty('nickName')); // false
    myObject.sayNickName(); // Uncaught TypeError: Object #<Object> has no method 'sayNickName'
**myObject는 Object() 함수의 prototype 프로퍼티가 가리키는 Object.prototype 객체를 자신의 프로토타입 객체로 연결한다.**
Object.prototype 객체가 hasOwnProperty() 메서드를 가지고 있으므로 myObject 객체가 hasOwnProperty() 메서드를 호출할 때 에러가 발생하지 않는다.

자바스크립트에서 특정 객체의 프로퍼티나 메서드에 접근하려고 할 때, 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 [[Prototype]]링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티를 차례대로 검색하는 것을 프로토타입 체이닝이라 한다. 

### 4.5.3 생성자 함수로 생성된 객체의 프로토타입 체이닝
    function Person(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    var foo = new Person('foo', 30, 'tennis');
    console.log(foo.hasOwnProperty('name')); // true
foo 객체의 프로토타입 객체는 자신을 생성한 Person 생성자 함수 객체의 prototype 프로퍼티가 가리키는 객체(Person.prototype)가 된다.  
Person.prototype은 Object.prototype을 프로토타입 객체로 가진다.  
따라서 프로토타입 체이닝은 Object.prototype 객체로 이어진다. 그러므로 foo 객체가 hasOwnProperty() 메서드를 호출할 때 에러가 발생하지 않는다.

### 4.5.4 프로토타입 체이닝의 종점 
자바스크립트에서 Object.prototype 객체는 프로토타입 체이닝의 종점이다. 객체 리터럴 방식이나 생성자 함수를 이용한 방식이나 결국에는 Object.prototype에서 프로토타입 체이닝이 끝난다.

### 4.5.5 기본 데이터 타입 확장 
자바스크립트는 Object.prototype, String.prototype 등과 같이 표준 빌트인 프로토타입 객체에도 사용자가 직접 정의한 메서드들을 추가하는 것을 허용한다.  
다음의 예처럼 String.prototype 객체에 testMethod() 메서드를 추가하면 이 메서드는 일반 문자열 표준 메서드처럼, 모든 문자열에서 접근 가능하다.
    String.prototype.testMethod = function() {
        console.log('This is the String.prototype.testMethod()');
    };

    var str = 'this is test';
    str.testMethod(); // This is the String.prototype.testMethod()

### 4.5.6 프로토타입도 자바스크립트 객체다
함수가 생성될 때, 자신의 prototype 프로퍼티에 연결되는 프로토타입 객체는 디폴트로 constructor 프로퍼티만을 가진 객체다. 당연히 프로토타입 객체 역시 자바스크립트 객체이므로 일반 객체처럼 동적으로 프로퍼티를 추가/삭제하는 것이 가능하다. 그리고 이렇게 변경된 프로퍼티는 실시간으로 프로토타입 체이닝에 반영된다.  
    function Person(name) {
        this.name = name;
    }

    var foo = new Person('foo');

    Person.prototype.sayHello = function() {
        console.log('hello');
    }

    foo.sayHello(); // hello

### 4.5.7 프로토타입 메서드와 this 바인딩
**메서드 호출 패턴에서의 this는 그 메서드를 호출한 객체에 바인딩된다**
    function Person(name) {
        this.name = name;
    }

    Person.prototype.getName = function() {
        return this.name;
    };

    var foo = new Person('foo');
    console.log(foo.getName()); // foo

    Person.prototype.name = 'person';
    console.log(Person.prototype.getName()); // person

### 4.5.8 디폴트 프로토타입은 다른 객체로 변경이 가능하다.
함수를 생성할 때 해당 함수와 연결되는 디폴트 프로토타입 객체를 다른 일반 객체로 변경하는 것이 가능하다. 생성자 함수의 프로토타입 객체가 변경되면, 변경된 시점 이후에 생성된 객체들은 변경된 프로토타입 객체로 [[Prototype]]링크를 연결한다. 이에 반해 생성자 함수의 프로토타입이 변경되기 이전에 생성된 객체들은 기존 프로토타입 객체로의 
[[Prototype]]링크를 그대로 유지한다.

    function Person() {
        this.name = name;
    }
    
    Person.prototype.getName = function() {
        return this.name;
    };

    var foo = new Person('foo');

    Person.prototype = {
        country: 'korea',
    };

    var bar = new Person('bar')
    console.log(foo.getName()); // foo
    console.log(bar.getName()); // TypeError: bar.getName is not a function
    console.log(foo.country); // undefined
    console.log(bar.country); // korea
    console.log(foo.constructor); // [Function: Person]
    console.log(bar.constructor); // [Function: Object]
변경한 프로토타입 객체는 디폴트 프로토타입 객체와 달리 constructor 프로퍼티가 없다. 따라서 Object.prototype 객체로 프로토타입 체이닝이 발생한다.

### 4.5.6 객체의 프로퍼티 읽기나 메서드를 실행할 때만 프로토타입 체이닝이 동작한다.
객체의 특정 프로퍼티를 읽을려고 할 때, 프로퍼티가 해당 객체에 없는 경우 프로토타입 체이닝이 발생한다. 반대로 객체에 있는 특정 프로퍼티에 값을 쓰려고 한다면 이때는 프로토타입 체이닝이 일어나지 않는다.

    function Person(name) {
        this.name = name;
    }

    Person.prototype.country = 'Korea';

    var foo = new Person('foo');
    var bar = new Person('bar');

    console.log(foo.country, bar.country); // Korea Korea
    foo.country = 'USA';
    console.log(foo.country, bar.country); // USA Korea

    
