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
