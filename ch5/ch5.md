# 5. 실행 컨텍스트와 클로저

[5.1 실행 컨텍스트 개념](#5.1-실행-컨텍스트-개념)  
[5.2 실행 컨텍스트 생성 과정](#5.2-실행-컨텍스트-생성-과정)
[5.3 스코프 체인](#5.3-스코프-체인)
[5.4 클로저](#5.4-클로저)

## 5.1 실행 컨텍스트 개념

C언어에서 콜 스택이란 것이있다. 이는 함수를 호출할 때 해당 함수의 호출 정보가 차곡차곡 쌓여있는 스택을 의미한다. 가령 C언어의 경우는 함수가 호출될 때마다 해당 함수의 호출 정보가 기존 함수의 호출 정보 위에 스택 형태로 하나씩 쌓인다. 자바스크립트 역시 이 범주를 크게 벗어나지 않는다.

ECMAScript에서는 실행 컨텍스트를 '실행 가능한 코드를 형상화하고 구분하는 추상적인 개념'으로 기술한다. 이를 앞에서 설명한 콜 스택과 연관하여 정의하면, '실행 가능한 자바스크립트 코드 블록이 실행되는 환경'이라고 할 수 있고, 이 컨텍스트 안에 실행에 필요한 여러 가지 정보를 담고 있다.

ECMAScript에서는 실행 컨텍스트가 형성되는 경우를 세 가지로 규정하고 있는데 전역 코드, eva()함수로 실행되는 코드, 함수 안의 코드를 실행할 경우이다.  
대부분 프로그래머는 함수로 실행 컨텍스트를 만든다. 그리고 이 코드 블록 안에 변수 및 객체, 실행 가능한 코드가 들어있다. 이 코드가 실행되면 실행 컨텍스트가 생성되고, 실행 컨텍스트는 스택 안에 하나씩 차곡차곡 쌓이고, 제일 위에 위치하는 실행 컨텍스트가 현재 실행되고 있는 컨텍스트다.

    console.log('This is global context');

    function ExContext1() {
        console.log('This is ExContext1');
    };

    function ExContext2() {
        console.log('This is ExContext2');
    };

    ExContext2();

ExContext1  
ExContext2  
전역 컨텍스트  
<실행 컨텍스트 스택>

## 5.2 실행 컨텍스트 생성 과정

    function execute(param1, param2) {
        var a = 1, b = 2;
        function func() {
            return param1 + param2;
        }
    }
    execute(3, 4);

### 5.2.1 활성 객체 생성

실행 컨텍스트가 생성되면 자바스크립트 엔진은 해당 컨텍스트에서 실행에 필요한 여러 가지 정보를 담을 객체를 생성하는데, 이를 활성 객체라고 한다. 이 객체에 앞으로 사용하게 될 매개변수나 사용자가 정의한 변수 및 객체를 저장하고, 새로 만들어진 컨텍스트로 접근 가능하게 되어 있다. 이는 엔진 내부에서 접근할 수 있다는 것이지 사용자가 접근할 수 있다는 것은 아니다.

    <샐행 컨텍스트>
    <활성 객체( = 변수 객체)>

### 5.2.2 arguments 객체 생성

다음 단계에서는 arguments 객체를 생성한다.

    <샐행 컨텍스트>
    <활성 객체>
    arguments -----> [param1, param2]

### 5.2.3 스코프 정보 생성

현재 컨텍스트의 유효 범위를 나타내는 스코프 정보를 생성한다. 이 스코프 정보는 현재 실행 중인 실행 컨텍스트 안에서 연결 리스트와 유사한 형식으로 만들어진다. 현재 컨텍스트에서 특정 변수에 접근해야 할 경우, 이 리스트를 활용한다. 이 리스트로 현재 컨텍스트의 변수뿐 아니라, 상위 실행 컨텍스트의 변수도 접근이 가능하다. 이 리스트에서 찾지 못한 변수는 결국 정의되지 않은 변수에 접근하는 것으로 판단하여 에러를 검출한다. 이 리스트를 스코프 체인이라고 하는데, [[scope]] 프로퍼티로 참조된다.

    <실행 컨텍스트>
    <활성 객체>
    arguments -----> [param1, param2]
    [[scope]] -----> [List]

### 5.2.4 변수 생성

현재 실행 컨텍스트 내부에서 사용되는 지역 변수의 생성이 이루어진다. ECMAScript에서는 생성되는 변수를 저장하는 변수 객체를 언급하는데, 실제적으로 앞서 생성된 활성 객체가 변수 객체로 사용된다.

변수 객체 안에서 호출된 함수 인자는 각각의 프로퍼티가 만들어지고 그 값이 할당된다. 만약 값이 넘겨지지 않았다면 undefined가 할당된다.  
변수나 내부 함수를 단지 메모리에 생성하고, 초기화는 각 변수나 함수에 해당하는 표현식이 실행되기 전까지는 이루어지지 않는다. 따라서 변수 a와 b에는 먼저 undefined가 할당된다. 표현식의 실행은 변수 객체 생성이 다 이루어진 후 시작된다.

    <실행 컨텍스트>
    <활성 객체>
    arguments -----> [param1, param2]
    [[scope]] -----> [List]
    param1: value param2: value
    a : undefined b : undefined
    func -----> Function Object

### 5.2.5 this 바인딩

마지막 단계에서는 this 키워드를 사용하는 값이 할당된다. this가 참조하는 객체가 없으면 전역 객체를 참조한다.

    <실행 컨텍스트>
    <활성 객체>
    arguments -----> [param1, param2]
    [[scope]] -----> [List]
    param1: value param2: value
    a : undefined b : undefined
    func -----> Function Object
    this -----> Object

### 5.2.6 코드 샐행

이렇게 하나의 실행 컨텍스트가 생성되고, 변수 객체가 만들어진 후에, 코드에 있는 여러 가지 표현식 실행이 이루어진다. 이렇게 실행되면서 변수의 초기화 및 연산, 또 다른 함수 실행 등이 이루어진다. undefined가 할당된 변수 a와 b에도 이 과정에서 1, 2의 값이 할당된다.

전역 실행 컨텍스트는 일반적인 실행 컨텍스트와는 약간 다른데, arguments 객체가 없으며, 전역 객체 하나만을 포함하는 스코프 체인이 있다.  
실행 컨텍스트가 형성되는 세 가지 중 하나로서 전역 코드가 있는데, 이 전역 코드가 실행될 때 생성되는 컨텍스트가 전역 실행 컨텍스트다. 전역 실행 컨텍스트는 변수를 초기화하고 이것의 내부 함수는 일반적인 탑 레벨의 함수로 선언된다. 그리고 전역 실행 컨텍스트의 변수 객체가 전역 객체로 사용된다. 즉, 전역 실행 컨텍스트에서는 변수 객체가 곧 전역 객체이다. 따라서 전역적으로 선언된 함수와 변수가 전역 객체의 프로퍼티가 된다. 전역 실행 컨텍스트 역시, this를 전역 객체의 참조로 사용한다.

## 5.3 스코프 체인

자바스크립트도 다른 언어와 마찬가지로 스코프, 즉 유효 범위가 있다. 자바스크립트에서는 함수 내의 {,} 블록은, 이를테면 for() {}, if {}와 같은 구문은 유효 범위가 없다. 오직 함수만이 유효 범위의 한 단위가 된다. 이 유효 범위를 나타내는 스코프가 [[scope]] 프로퍼티로 각 함수 객체 내에서 연결 리스트 형식으로 관리되는데, 이를 스코프 체인이라고 한다.

각각의 함수는 [[scope]] 프로퍼티로 자신이 생성된 실행 컨텍스트의 스코프 체인을 참조한다. 함수가 실행되는 순간 실행 컨텍스트가 만들어지고, 이 실행 컨텍스트는 실행된 함수의 [[scope]] 프로퍼티를 기반으로 새로운 스코프 체인을 만든다.

### 5.3.1 전역 실행 컨텍스트의 스코프 체인

    var var1 = 1;
    var var2 = 2;
    console.log(var1); // 1
    console.log(var2); // 2

이 자바스크립트 코드를 실행하면, 먼저 전역 실행 컨텍스트가 생성되고, 변수 객체가 만들어진다. 현재 전역 실행 컨텍스트 단 하나만 실행되고 있어 참조할 상위 컨텍스트가 없다. 따라서, 이 변수 객체의 스코프 체인은 자기 자신만을 가진다. 변수 객체의 [[scope]]는 변수 객체 자신을 가리킨다. 그 후, var1, var2 변수들이 생성되고 변수 객체에 의해 참조된다.

    <전역 실행 컨텍스트>
    <변수 객체>
    [[scope]] -----> 전역 객체
    var1
    var2
    this

### 5.3.2 함수를 호출한 경우 생성되는 실행 컨텍스트의 스코프 체인

    var var1 = 1;
    var var2 = 2;
    function func() {
        var var1 = 10;
        var var2 = 20;
        console.log(var1, var2);
    }

    func(); // 10 20
    console.log(var1, var2); // 1 2

    <전역 실행 컨텍스트>        <func 실행 컨텍스트>
    <변수 객체>               <변수 객체>
    [[scope]]               [[scope]] ----->  func 변수 객체 (var1과 var2는 func 변수 객체를 먼저 탐색하고, 없으면 전역 객체를 탐색한다.)
    var1                    var1              전역 객체
    var2                    var2
    func                    this
    this

- 각 함수 객체는 [[scope]] 프로퍼티로 현재 컨텍스트의 스코프 체인을 참조한다.
- 한 함수가 실행되면 새로운 실행 컨텍스트가 만들어지는데, 이 새로운 실행 컨텍스트는 현재 실행되는 함수 객체의 [[scope]] 프로퍼티를 복사하고, 새롭게 생성된
  변수 객체를 해당 체인의 제일 앞에 추가한다.
- **스코프 체인 = 현재 실행 컨텍스트의 변수 객체 + 상위 컨텍스트의 스코프 체인**

/

    var value = 'value1';

    function printFunc() {
        var value = 'value2';

        function printValue() {
            return value;
        }
        console.log(printValue());
    }

    printFunc():

    <전역 실행 컨텍스트>                <printFunc 실행 컨텍스트>               <printValue 실행 컨텍스트>
    <변수 객체>                       <변수 객체>                            <변수 객체>
    value : 'value1'                value : 'value2'                     this
    printFunc                       printValue                           [[scope]] ----->   printValue 변수 객체
    this                            this                                                    printFunc 변수 객체
    [[scope]] -----> 전역 객체        [[scope]] -----> printFunc 변수 객체                       전역 객체
                                                     전역 객체
    value 변수를 printFunc 변수 객체에서 찾으므로, 결과값은 'value2'가 된다.

/

    var value = 'value1';

    function printValue() {
        return value;
    }
    function printFunc(func) {
        var value = 'value2'
        console.log(func());
    }
    printFunc(printValue);

    <전역 실행 컨텍스트>            <printFunc 실행 컨텍스트>               <printValue 실행 컨텍스트>
    <변수 객체>                   <변수 객체>                            <변수 객체>
    value : 'value1'            value : 'value2'                     this
    printValue                  Func                                 [[scope]] -----> printValue 변수 객체
    printFunc                   this                                                  전역 객체
    this                        [[scope]] -----> printFunc 변수 객체
    [[scope]] -----> 전역 객체                     전역 객체
    value 변수를 전역 객체에서 찾으므로, 결과값은 'value1'이 된다.

/

    foo();
    bar();

    var foo = function() {
        console.log('foo and x = ' + x);
    };

    function bar() {
        console.log('bar and x = ' + x);
    }

    var x = 1;

    =====>

    var foo;

    function bar() {
        console.log('bar and x = ' + x);
    }

    var x;

    foo(); // TypeError
    bar(); // bar and x = undefined

    foo = function() {
        console.log('foo and x = ' + x);
    }

    x = 1;

## 5.4 클로저

### 5.4.1 클로저의 개념

    function outerFunc() {
        var x = 10;
        var innerFunc = function() {
            console.log(x);
        }
        return innerFunc;
    }

    var inner = outerFunc();
    inner(); // 10

    <전역 실행 컨텍스트>            <outerFunc 실행 컨텍스트>               <innerFunc 실행 컨텍스트>
    <변수 객체>                   <변수 객체>                            <변수 객체>
    inner                       x : 10;                              [[scope]] -----> innerFunc 실행 컨텍스트
    outerFunc                   innerFunc                                             outerFunc 실행 컨텍스트
    [[scope]] -----> 전역 객체    [scope] -----> outerFunc 실행 컨텍스트                    전역 객체
                                               전역 객체

outerFunc 실행 컨텍스트는 사라졌지만, outerFunc 변수 객체는 여전히 남아있고, innerFunc의 스코프 체인으로 참조되고 있다. 이것이 바로 자바스크립트에서 구현한 클로저라는 개념이다.  
**이미 생명 주기가 끝난 외부 함수의 변수를 참조하는 함수를 클로저라고 한다.** 클로저로 참조되는 외부 변수를 **자유 변수**라고 한다.

    function outerFunc(arg1, arg2) {
        var local = 8;
        function innerFunc(innerArg) {
            console.log((arg1 + arg2)/(innerArg + local));
        }
        return innerFunc;
    }
    var exam1 = outerFunc(2, 4);
    exam1(2);

    <전역 실행 컨텍스트>            <outerFunc 실행 컨텍스트>               <innerFunc 실행 컨텍스트>
    <변수 객체>                   <변수 객체>                            <변수 객체>
    exam1                       arg1, arg2, local:8                  innerArg
    outerFunc                   innerFunc                            [[scope]] -----> innerFunc 실행 컨텍스트
    [[scope]] -----> 전역 객체    [[scope]] -----> outerFunc 변수 객체                    outerFunc 실행 컨텍스트
                                                 전역 객체                              전역 객체

### 5.4.2 클로저의 활용

클로저는 성능적인 면과 자원적인 면에서 약간 손해를 볼 수 있으므로 무차별적으로 사용해서는 안 된다.

#### 5.4.2.1 특정 함수에 사용자가 정의한 객체의 메서드 연결하기

    function helloFunc() {
        this.greeting = 'hello';
    }

    helloFunc.prototype.call = function(func) {
        func? func(this.greeting) : this.func(this.greeting);
    }

    var userFunc = function(greeting) {
        console.log(greeting);
    }

    var myFunc = function(greeting) {
        console.log(greeting + ' donghak');
    }

    var objHello = new helloFunc();
    objHello.func = userFunc;
    objHello.call(); // hello
    objHello.call(myFunc) // hello donghak

/

    function helloFunc() {
         this.greeting = 'hello';
    }

    helloFunc.prototype.call = function(func) {
        func? func(this.greeting) : this.func(this.greeting);
    }


    var objHello = new helloFunc();
    objHello.func = userFunc;
    objHello.call(); // hello
    objHello.call(myFunc) // hello donghak

    function saySomething(obj, methodName, name) {
        return (function(greeting)) {
            return obj[methodName](greeting, name);
        });
    }

    function newObj(obj, name) {
        obj.func = saySomething(this, 'who', name);
        return obj;
    }

    newObj.prototype.who = function(greeting, name) {
        console.log(greeting + '' + (name || 'everyone'));
    }

    var objHello = new helloFunc();
    var obj1 = new newObj(objHello, " donghak");
    obj1.call(); // hello donghak

    실행 순서
    obj1.call() --> obj1.func('hello') --> newObj['who']('hello', 'donghak') --> console.log('hello' + 'donghak') --> hello donghak

#### 5.4.2.2 함수의 캡슐화

다음과 같은 함수를 작성한다고 가정 'I am xxx. I live in xxx. I am xx years old' xx 부분은 사용자에게 인자로 입력 받아 값을 출력하는 함수

앞 문장 템플릿을 전역 변수에 저장하고, 사용자 입력을 받은 후, 이 전역 변수에 접근하여 완성된 문장을 출력하는 방식

    var buffAr = ["I am ", "", ". I live in ", "", ". I am ", "", " years old."];

    function getCompletedStr(name, city, age) {
        buffAr[1] = name;
        buffAr[3] = city;
        buffAr[5] = age;

        return buffAr;
    }

    var str = new getCompletedStr("donghak", "busan", 29);
    console.log(str.join("")); // I am donghak. I live in busan. I am 29 years old.

이렇게 코딩을 하면 buffAr이라는 배열이 전역 변수로서, 외부에 노출되어 있다는 단점이 있다. 이는 다른 함수에서 이 배열에 쉽게 접근하여 값을 바꿀 수도 있고, 실수로 같은 이름의 변수를 만들어 버그가 생길 수도 있다.

클로저를 활용하여 buffAr을 추가적인 스코프에 넣고 사용하는 방법

    var buffAr = ["I am ", "", ". I live in ", "", ". I am ", "", " years old."];

    return function (name, city, age) {
        buffAr[1] = name;
        buffAr[3] = city;
        buffAr[5] = age;

        return buffAr.join("");
    };
    })();

    var str = getCompletedStr("donghak", "busan", 29);
    console.log(str);

주의할 점은 변수 getCompleteStr에 익명의 함수를 즉시 실행시켜 반환되는 함수를 할당하는 것이다. 이 반환되는 함수가 클로저가 되고, 이 클로저는 자유 변수 buffAr을 스코프 체인에서 참조할 수 있다.

#### 5.4.2.3 setTimeOut()에 지정되는 함수의 사용자 정의

    function callLater(obj, a, b) {
    return function () {
        obj["sum"] = a + b;
        console.log(obj["sum"]);
    };
    }
    var sumObj = {
    sum: 0,
    };
    var func = callLater(sumObj, 1, 2);
    setTimeout(func, 1000);

### 5.4.3 클로저를 활용할 때 주의사항

#### 5.4.3.1 클로저의 프로퍼티값이 쓰기 가능하므로 그 값이 여러 번 호출로 항상 변할 수 있음에 유의해야 한다.

    function outerFunc(argNum) {
        var num = argNum;
        return function(x) {
            num += x;
            console.log('num: ' + num);
        }
    }
    var exam = outerFunc(40); // num = 40;
    exam(5); // num: 45
    exam(-10); // num: 35

#### 5.4.3.2 하나의 클로저가 여러 함수 객체의 스코프 체인에 들어가 있는 경우도 있다

    function func() {
    var x = 1;
    return {
        func1: function () {
        console.log(++x);
        },
        func2: function () {
        console.log(-x);
        },
    };
    }

    var exam = func();
    exam.func1(); // 2
    exam.func2(); // -2

#### 5.4.3.3 루프 안에서 클로저를 활용할 때는 주의하자

    1.
    function countSeconds(howMany) {
    for (var i = 0; i <= howMany; i++) {
        setTimeout(function () {
        console.log(i);
        }, i * 1000);
    }
    }
    countSeconds(3); // 4 4 4 4

    var i: i가 var로 선언되었으므로 function 스코프에 하나만 존재합니다. 모든 익명 함수는 function 스코프에 존재하는 하나의 i만을 가리킬 것입니다.

    2.
    function countSeconds(howMany) {
    for (let i = 0; i <= howMany; i++) {
        setTimeout(function () {
        console.log(i);
        }, i * 1000);
    }
    }
    countSeconds(3); // 0 1 2 3

    let i: for 문의 초기식(for (a; b; c) 중 a 부분)에 존재하는 let의 경우 특수한 작용이 일어납니다. 이 작용은 for 루프가 돌 때마다 새로운 i를 만들고, 여기에 이전 i의 값을 대입합니다2. 이로 인해 각각의 익명 함수는 저마다 다른 i를 가리킬 것입니다.
    let의 이 특수한 작용은 오직 for 문의 초기식 안에서만 일어납니다.

    3.
    function countSeconds(howMany) {
    for (var i = 0; i <= howMany; i++) {
        (function (currentI) {
        setTimeout(function () {
            console.log(currentI);
        }, currentI * 1000);
        })(i);
    }
    }
    countSeconds(3); // 0 1 2 3
