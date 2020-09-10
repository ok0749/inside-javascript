
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
1. 대괄호([]) 표기법
2. 마침표(.) 표기법 


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
