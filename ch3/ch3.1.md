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
