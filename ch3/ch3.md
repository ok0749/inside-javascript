# 3. 자바스크립트 데이터 타입과 연산자

자바스크립트 데이터 타입

- 기본 타입
  - 숫자(Number)
  - 문자열(String)
  - 불린값(Boolean)
  - undefined
  - null
- 참조 타입

  - 객체(Object)
    - 배열(Array)
    - 함수(Function)
    - 정규표현식

[3.1 자바스크립트 기본 타입](#3.1-자바스크립트-기본-타입)  
[3.2 자바스크립트 참조 타입(객체 타입)](<#3.2-자바스크립트-참조-타입(객체-타입)>)  
[3.3 참조 타입의 특성](#3.3-참조-타입의-특성)  
[3.4 프로토타입](#3.4-프로토타입)  
[3.5 배열](#3.5-배열)  
[3.6 기본 타입과 표준 메서드](#3.6-기본-타입과-표준-메서드)  
[3.7 연산자](#3.7-연산자)

## 3.1 자바스크립트 기본 타입

자바스크립트는 변수를 선언할 때 타입을 미리 정하지 않고, var라는 한 가지 키워드로만 변수를 선언한다. 선언된 변수에는 어떤 타입의 데이터라도 저장하는 것이 가능하다.  
따라서 자바스크립트는 변수에 어떤 형태의 데이터를 저장하느냐에 따라 해당 변수의 타입이 결정된다.

    var intNum = 10;
    var floatNum = 0.1;
    var str = 'string';
    var singleChar = 'a';
    var boolVar = true;
    var emptyVar;
    var nullVar = null;

    console.log(typeof intNum, typeof floatNum, typeof str, typeof singleChar, typeof boolVar, typeof emptyVar, typeof nullVar);

    // number, number, string, string, boolean, undefined, object

### 3.1.1 숫자

C언어의 경우 다양한 숫자 타입이 존재하지만, 자바스크립트는 하나의 숫자형만 존재한다. 모든 숫자를 64비트 부동 소수점 형태로 저장하기 때문이다.  
모든 숫자를 실수로 처리하므로 나눗셈 연산을 할 때는 주의해야 한다.

    var num = 5 / 2;

    console.log(num); // 2.5
    console.log(Math.floor(num)); // 2

소수 부분을 버리고 정수 부분만 구하고 싶다면 Math.floor() 메서드를 사용하면 된다.

### 3.1.2 문자열

문자열은 작은 따옴표(')나 큰 따옴표(")로 생성한다. 자바스크립트에서는 C언어의 char 타입과 같이 문자 하나만을 별도로 나타내는 데이터 타입은 존재하지 않는다.
한 번 정의된 문자열은 변하지 않는다.

    var str = 'test';
    console.log(str[0], str[1], str[2], str[3]); // t e s t

    str[0] = 'T';
    console.log(str); // test

### 3.1.3 불린값

자바스크립트는 true와 false 값을 나타내는 불린 타입을 가진다.

### 3.1.4 null과 undefined

자바스크립트 환경 내에서 기본적으로 값이 할당되지 않은 변수는 undefined 타입이며, undefined 타입의 변수는 변수 자체의 값 또한 undefined이다.
즉 undefined는 타입이자, 값을 나타낸다.  
null 타입의 변수는 개발자가 명시적으로 값이 비어있음을 나타내는 데 사용한다. null 타입 변수는 typeof 결과가 null이 아니라 object이기 때문에 null 타입 변수인지를 확인할 때는 일치 연산자(===)를 사용해 변수의 값을 직접 확인해야 한다.

## 3.2 자바스크립트 참조 타입(객체 타입)

객체는 단순히 '이름(key):값(value)' 형태의 프로퍼티들을 저장하는 컨테이너로서 여러 개의 프로퍼티들을 포함할 수 있으며, 이러한 객체의 프로퍼티는 기본 타입의 값을 포함하거나, 다른 객체를 가리킬 수도 있다. 프로퍼티가 함수를 포함하는 경우 이러한 프로퍼티를 매서드라고 부른다.

### 3.2.1 객체 생성

자바스크립트는 C++이나 자바와 같은 기존 객체 지향 언어와 다르게 클래스라는 개념이 없고, 객체 리터럴이나 생성자 함수 등 별도의 생성 방식이 존재한다.

객체 생성 방법

1. Object() 객체 생성자 함수를 이용
2. 객체 리터럴을 이용
3. 생성자 함수를 이용

#### 3.2.1.1 Object() 생성자 함수 이용

    var foo = new Object();
    foo.name = 'foo';
    foo.age = 30;
    foo.gender = 'male';

    console.log(typeof foo, foo); // object  {name : 'foo', age : 30, gender : 'male'}

#### 3.2.1.2 객체 리터럴 방식 이용

객체 리터럴이란 객체를 생성하는 표기법을 의미한다. 중괄호({})를 이용해서 객체를 생성하고 "프로퍼티 이름":"프로퍼티 값" 형태로 표기하면, 해당 프로퍼티가 추가된 객체를 생성할 수 있다. 프로퍼티 이름은 문자열이나 숫자가 올 수 있고 프로퍼티 값으로는 어떠한 표현식도 올 수 있으며, 이 값이 함수일 경우 이러한 프로퍼티를 메서드라고 부른다.

    var foo = {
      name : 'foo',
      age : 30,
      gender : 'male'
    };

    console.log(typeof foo, foo); // object  {name : 'foo', age : 30, gender : 'male'}

#### 3.2.1.3 생성자 함수 이용

자바스크립트에서는 함수를 통해서도 객체를 생성할 수 있다. 이렇게 객체를 생성하는 함수를 생성자 함수라고 부른다.

### 3.2.2 객체 프로퍼티 읽기/쓰기/갱신

객체의 프로퍼티에 접근하는 방법

1.  대괄호([]) 표기법
2.  마침표(.) 표기법

        var foo = {
          name : 'foo',
          major : 'computer science'
        };

        // 객체 프로퍼티 읽기(대괄호 표기법에서는 접근하려는 프로퍼티 이름을 문자열 형태로 만들어야 한다.)
        console.log(foo.name, foo['name'], foo[name]); // foo foo name is not defined

        // 객체 프로퍼티 갱신
        foo.major = 'electronics engineering';
        foo['name'] = 'bar'
        console.log(foo.major, foo['major'], foo.name, foo['name']); // electronics engineering electronics engineering bar bar

        // 객체 프로퍼티 동적 생성
        foo.age = 30;
        foo['gender'] = 'male';
        foo['full-name'] = 'foo bar'; // 프로퍼티가 표현식이거나 예약어일 경우 대괄호 표기법만을 이용해서 접근해야 한다.
        console.log(foo.age, foo['age'], foo.gender, foo['gender'], foo['full-name'], foo.full-name);
        // 30 30 'male' 'male' 'foo bar' NaN
        // NaN(Not a Number) : 수치 연산을 해서 정상적인 값을 얻지 못할 때 출력되는 값

### 3.2.3 for in 문과 객체 프로퍼티 출력

      var foo = {
        name : 'foo',
        age : 30,
        major : 'computer science'
      };

      for (var prop in foo){
        console.log(prop, foo[prop]);
        // name foo
        // age 30 major
        // computer science
      }

### 3.2.4 객체 프로퍼티 삭제

delete 연산자를 이용해서 객체의 프로퍼티를 즉시 삭제할 수 있다. 하지만 객체 자체를 삭제하지는 못한다.

      var foo = {
        name : 'foo',
        nickname : 'babo'
      };

      console.log(foo); // {name : 'foo', nickname: 'babo'}
      delete foo.nickname; // nickname 프로퍼티 삭제
      console.log(foo); // {name : 'foo'}
      delete foo;
      console.log(foo); // {name : 'foo'}

## 3.3 참조 타입의 특성

자바스크립트에서 기본 타입을 제외한 모든 값은 객체다. 배열이나 함수 또한 객체로 취급된다. 이러한 객체는 참조 타입이라 부르는데 이것은 객체의 모든 연산이 실제 값이 아닌 참조값으로 처리되기 때문이다.

    var objA = {      // objA 변수는 객체 자체를 저장하고 있는 것이 아니라 생성된 객체를 가리키는 참조값을 저장한다.
      val : 40
    };
    var objB = objA;  // 변수 objB에 objA가 가리키는 객체의 참조값이 저장된다.

    console.log(objA.val, objB.val); // 40 40
    objB = 50;
    console.log(objA.val, objB.val); // 50 50

### 3.3.1 객체 비교

    var a = 100;
    var b = 100;

    var objA = {value : 100};
    var objB = {value : 100};
    var objC = objB;

    console.log(a == b); // 기본 타입의 경우 동등 연산자(==)를 이용해서 비교할 때 값을 비교한다.
    console.log(objA == objB); // 객체와 같은 참조 타입의 경우는 참조값이 같아야 true가 된다.
    console.log(objB == objC);

### 3.3.2 참조에 의한 함수 호출 방식

기본 타입 : **값에 의한 호출 방식**으로 동작한다. 즉, 함수를 호출할 때 인자로 기본 타입의 값을 넘길 경우, 호출된 함수의 매개변수로 복사된 값이 전달된다. 때문에 함수 내부에서 매개변수를 이용해 값을 변경해도, 실제로 호출된 변수의 값이 변경되지는 않는다.

참조 타입 : **참조에 의한 호출 방식**으로 동작한다. 즉, 함수를 호출할 때 인자로 참조 타입인 객체를 전달할 경우, 객체의 프로퍼티값이 함수의 매개변수로 복사되지 않고, 인자로 넘긴 객체의 참조값이 그대로 함수 내부로 전달된다. 때문에 함수 내부에서 참조값을 이용해서 인자로 넘긴 실제 객체의 값을 변경할 수 있다.

    var a = 100;
    var objA = {value : 100};

    function changeArg(num, obj){ // 매개변수 num, obj
      num = 200;
      obj.value = 200;

      console.log(num, obj);
    }

    // 인자 a, objA
    changeArg(a, objA); // 200 {value : 200}

    console.log(a, objA); // 100 {value : 200}

## 3.4 프로토타입

자바스크립트의 모든 객체는 자신의 부모 역할을 객체와 연결되어 있다. 그리고 이것은 마치 객체지향의 상속 개념과 같이 부모 객체의 프로퍼티를 마치 자신의 것처럼 쓸 수 있는 것 같은 특징이 있다. 이러한 부모 객체를 프로토타입 객체(짧게는 프로토타입)라고 부른다.

    var foo = {
      name : 'foo',
      age : 30
    };

    console.log(foo.toString()); // [object Object]

foo의 프로토타입인 Object.prototype에 toString() 매서드가 정의 되어있으므로 에러가 나지 않는다.

**모든 객체는 자신의 프로토타입을 가지는 [[Prototype]]라는 숨겨진 프로퍼티를 가진다.** 크롬 브라우저에서는 *proto*가 이 숨겨진 프로퍼티를 의미한다.  
객체 리터럴 방식으로 생성된 객체의 경우 Object.prototype 객체가 프로토타입 객체가 된다.

## 3.5 배열

자바스크립트의 배열은 C나 자바의 배열과 같은 기능을 하는 객체지만, 이들과는 다르게 굳이 크기를 지정하지 않아도 되며, 어떤 위치에 어느 타입의 데이터를 저장하더라도 에러가 발생하지 않는다.

### 3.5.1 배열 리터럴

배열 리터럴은 대괄호([])를 사용한다. 객체와는 다르게 배열 리터럴에서는 각 요소의 값만을 포함하고, 대괄호 내에 접근하고자 하는 원소에 배열 내 위치 인덱스값을 넣어서 접근한다.

    var colorArr = ['orange', 'yellow', 'blue'];
    console.log(colorArr[0], colorArr[1], colorArr[2]); // orange yellow blue

### 3.5.2 배열의 요소 생성

자바스크립트의 배열의 경우 값을 순차적으로 넣을 필요 없이 아무 인덱스 위치에나 값을 동적으로 추가할 수 있다.

    var emptyArr = [];
    emptyArr[0] = 100;
    emptyArr[3] = 'eight';
    emptyArr[7] = true;

    console.log(emptyArr); // [ 100, <2 empty items>, 'eight', <3 empty items>, true ]

### 3.5.3 배열의 length 프로퍼티

length 프로퍼티는 배열 내에 가장 큰 인덱스에 1을 더한 값이다.

    var arr = [];
    console.log(arr.length); // 0

    arr[0] = 0;
    arr[1] = 1;
    arr[100] = 100;
    console.log(arr.length); // 101

    arr.length = 100; // length 프로퍼티는 코드를 통해 명시적으로 값을 변경할 수 있다. lenght 프로퍼티를 벗어나는 값은 undefined가 된다.
    console.log(arr[100]) // undefined

### 3.5.4 배열과 객체

    var colorsArray = ['orange', 'yellow', 'green'];
    var colorsObj = {
      '0' : 'orange',
      '1' : 'yellow',
      '2' : 'green'
    };

    console.log(typeof colorsArray, typeof colorsObj); // object object
    console.log(colorsArray.length, colorsObj.length); // 3 undefined
    // 배열에는 length 프로퍼티가 존재하지만 객체에는 존재하지 않는다.

    colorsArray.push('red'); // ['orange', 'yellow', 'green', 'red']
    colorsObj.push('red'); // Uncaught TypeError: Object #<Object> has no method 'push'
    // 객체는 배열이 아니므로 push()와 같은 표준 배열 메서드를 사용할 수 없다

객체 리터럴 방식으로 생성한 객체의 경우, Object.prototype 객체가 프로토 타입이다.  
객체 -----> Object.prototype

배열의 경우 Array.prototype 객체가 프로토 타입이고, Array.prototype 객체의 프로토타입은 Object.prototype 객체다 된다.  
배열 -----> Array.prototype -----> Object.prototype

### 3.5.5 배열의 프로퍼티 동적 생성

배열도 자바스크립트 객체이므로, 인덱스가 숫자인 배열 원소 이외에도 객체처럼 동적으로 프로퍼티를 추가할 수 있다.

    var arr = ['zero', 'one', 'two'];

    arr.color = 'blue';
    arr.name = 'numberArray';

    console.log(arr); // [ 'zero', 'one', 'two', color: 'blue', name: 'numberArray' ]
    console.log(arr.length); // 3
    // 배열의 length 프로퍼티는 배열의 원소의 가장 큰 인덱스가 변했을 경우만 변경된다.

### 3.5.6 배열의 프로퍼티 열거

    for (var prop in arr) {
      console.log(prop, arr[prop]);
    }
    // 0 zero
       1 one
       2 two
       color blue
       name numberArray

    for (var i=0; i<arr.length; i++) {
      console.log(i, arr[i]);
    }
    // 0 'zero'
       1 'one'
       2 'two'

### 3.5.7 배열 요소의 삭제

배열에서 delete 연산자는 해당 요소의 값을 undefined로 설정할 뿐 원소 자체를 삭제하지는 않는다. 때문에 보통 배열에서 요소들을 완전히 삭제할 경우 splice() 배열 메서드를 사용한다.

      var arr = ['zero', 'one', 'two', 'three'];

      arr.splice(2, 1); // 2번째 요소를 시작점으로 1개의 원소를 삭제한다.
      console.log(arr); // [ 'zero', 'one', 'three' ]
      arr.splice(1, 2, 'four') // 1번째 요소를 시작점으로 2개의 원소를 삭제하고 'four'을 추가한다.
      console.log(arr); // [ 'zero', 'four' ]

### 3.5.8 Array() 생성자 함수

배열은 일반적으로 배열 리터럴로 생성하지만, 배열 리터럴도 결국 자바스크립트 기본 제공 Array() 생성자 함수로 배열을 생성하는 과정을 단순화시킨 것이다.

Array() 생성자 함수는 호출할 때 인자 개수에 따라 동작이 다르다

- 호출할 때 인자가 1개이고, 숫자일 경우 : 호출된 인자를 length로 갖는 빈 배열 생성
- 그외의 경우 : 호출된 인자를 요소로 갖는 배열 생성

      var foo = new Array(3);
      console.log(foo); // [ <3 empty items> ]
      console.log(foo.length); // 3

      var bar = new Array(1, 2, 3);
      console.log(bar); // [ 1, 2, 3 ]

### 3.5.9 유사 배열 객체

length 프로퍼티를 가진 객체를 유사 배열 객체(array-like objects)라고 부른다.  
이러한 유사 배열 객체의 가장 큰 특징은 객체임에도 불구하고, 자바스크립트의 표준 배열 메서드를 사용하는 게 가능하다는 것이다.

    var obj = {
      name : 'foo',
      length : 1
    };

    Array.prototype.push.apply(obj, ['baz']);
    console.log(obj); // { '1': 'baz', name: 'foo', length: 2 }

## 3.6 기본 타입과 표준 메서드

자바스크립트는 숫자, 문자열, 불린값에 대해 각 타입별로 호출 가능한 표준 메서드를 정의하고 있다. 기본 타입의 값들에 대해서 객체 형태로 메서드를 호출할 경우, 이들 기본값은 메서드 처리 순간에 객체로 변환된 다음 각 타입별 표준 메서드를 호출하고 메서드 호출이 끝나면 다시 기본값으로 복귀한다.

## 3.7 연산자

### 3.7.1 + 연산자

1. 더하기 연산 : 연산자가 모두 숫자일 경우 더하기 연산을 한다.
2. 문자열 연결 연산 : 연산자가 모두 숫자가 아닌 경우 문자열 연결 연산을 한다.

### 3.7.3 ==(동등) 연산자와 ===(일치) 연산자

1. ==(동등) 연산자 : 비교하려는 피연산자의 타입이 다를 경우에 타입 변환을 거친 다음 비교한다.
2. ===(일치) 연산자 : 타입을 변경하지 않고 비교한다.

   console.log(1 == '1'); // true
   console.log(1 === '1'); // false
