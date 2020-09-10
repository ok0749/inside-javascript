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

