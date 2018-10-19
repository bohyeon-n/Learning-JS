# 리터럴과 변수, 상수, 데이터 타입

## 리터럴

리터럴이라는 단어는 값을 프로그램 안에서 직접 지정한다는 의미이다. 리터럴은 값을 만드는 방법이다.

**리터럴과 식별자의 차이**
자바스크립트는 따옴표를 통해 리터럴과 식별자를 구별한다.

```js
let room1 = "conference_room_a"; // 'conference_room_a'(따옴표 안)은 리터럴이다.

let currentRoom = room1; // 이제 currentRoom의 값은 room1의 값('conference_room_a')과 같다.

currentRoom = conference_room_a; //에러가 일어난다. conference_room_a라는 식별자는 존재하지 않는다.
```

**tip** 식별자를 써야 하는 곳, 다시 말해 값이 필요한 곳에는 어디든지 리터럴을 쓸 수 있다. 그러나 그런 곳이 많다면(그 리터럴을 쓰는 곳이 많다면), 리터럴 대신 상수나 변수를 써야 한다.
상수나 변수를 쓰면 코드를 이해하기 쉽고 값을 바꿀 때도 한 곳에서만 바꾸면 된다.

## 원시 타입과 객체

자바스크립트의 값은 원시 값(primitice)또는 객체(object)입니다. 문자열과 숫자 같은 원시 타입은 불변이다. 숫자 5 는 항상 숫자 5 이다. 원시 타입에는 6 가지가 있다.

- 숫자
- 문자열
- 불리언
- null
- undefined
- 심볼 symbol

다만 불변성이라는 말이 변수의 값이 바뀔 수 없다는 뜻이 아니다.

```js
let str = "hello";
str = "world";
```

str 인 먼저 불변인 값 'hello'로 초기화되었고, 다시 새로운 불변값 'world'를 할당받았다. 중요한 것은 'hello'와 'world'가 서로 다른 문자열이라는 것이다. 바뀐 것은 str 이 저장하는 값뿐이다.

이들 여섯 가지 원시 타입 외에 _객체_ 가 있다. 원시 값과 달리 객체는 여러 가지 형태와 값을 가질 수 있다.
객체의 유연한 성질 때문에 커스텀 데이터 타입을 만들 때 객체를 많이 사용한다.
자바스크립트에는 다음과 같이 몇 가지 내장된 객체 타입이 있다.

- Array
- Date
- RegExp
- Map 과 WeakMap
- Set 과 WeakSet

원시 타입 중 숫자와 문자열, 불리언에는 각각 대응하는 객체 타입은 Number, String, Boolean 이 있다. 이들은 실제 값이 저장되지는 않고 이들이 대응하는 원시 값에 기능을 제공하는 역할을 한다.

## 숫자

자바스크립트도 다른 프로그래밍 언어와 마찬가지로 실제 숫자의 근사치를 저장할 때 IEEE-764 배정도(double-percision) 부동소수점 숫자 형식을 사용한다. 이 형식을 '더블'이라고 부르겠다.

자바스크립트에서는 숫자형 데이터 타입이 하나밖에 없는데, 이건 흔치 않은 일이다. 대부분의 프로그래밍 언어는 여러 가지 정수 타입을 사용하며 부동소수점 숫자 타입도 두 가지 이상 사용한다.
자바스크립트는 10 진수, 2 진수, 8 진수, 16 진수 네 가지 숫자형 리터럴을 인식한다.

```js
let count = 10; //숫자 리터럴. count는 더블임
const blue = 0x0000ff; // 16진수. 16진수 ff는 10진수 255와 같다.
const umask = 0o0022; // 8진수. 8진수 22는 십진수 18과 같다.
const roomTemp = 21.5; // 십진수
const c = 3.0e6; // 지수(3.0 * 10^6 = 3000000)
const e = -1.6e-19; // 지수(-1.6 * 10^-19 = 0.00000000000000000016)
const inf = Infinity;
const nint = -Infinity;
const nan = NaN; // 숫자가 아님
```

10 진수, 16 진수 등 어떤 리터럴 형식을 사용하더라도 결국 숫자는 더블 형식으로 저장된다. 다양한 리터럴 형식은 숫자를 간편한 형식으로 표현할 수 있도록 제공된 것뿐이다.

숫자에 대응하는 Number 객체에는 중요한 숫자형 값에 해당하는 유용한 프로퍼티가 있다.

```js
const small = Number.EPSILON; // 1에 더했을 때 1과 구분되는 결과를 만들 수 있는 가장 작은 값. 1.0000000000000002
const bigInt = Number.MAX_SATE_INTEGER; // 표현할 수 있는 가장 큰 정수
const max = Number.MAX_VALUE; //표현할 수 있는 가장 큰 숫자
const minInt = Number.MIN_SATE_INTEGER; //표현할 수 있는 가장 작은 정수
const min = Number.MIN_VALUE; // 표현할 수 있는 가장 작은 숫자
const nInf = Number.NEGATIVE_INFINITY; // -Infinity
const nan = Number.NaN;
const inf = Number.POSITIVE_INFINITY; // Infinity
```

## 문자열

자바스크립트 문자열은 유니코드 텍스트이다. 유니코드 텍스트 데이터에 관한 표준이며 사람이 사용하는 언어 대부분의 글자와 심볼에 해당하는 코드 포인트를 포함하고 있다.
유니코드 자체는 모든 언어의 텍스트를 나타낼 수 있지만, 유니코드를 사용하는 소프트웨어가 모든 코드 포인트를 정확히 렌더링한다고 보장하지는 않는다.

### 이스케이프

문자열 안에 따옴표를 써야 하는 경우

```js
const dialog =  'he looked up and said "don't do that!"'
//Uncaught SyntaxError: Unexpected identifier
```

```js
const dialog = '샘이 맥스에게 "하지마\'!"라고 말했다.';
```

역슬래시는 자기 자신을 이스케이프할 수 있다.

```js
const s = "In JavaScript, use \\as an escape character in string.";
//"In JavaScript, use \as an escape character in string."
```

## 특수 문자

- \n : 줄바꿈 문자
- \r: 캐리지 리턴
- \t: 탭
- \\': 작은 따옴표
- \\": 큰 따옴표
- \\`: 백틱
- \\$: 달러 기호
- \\: 역슬래시
- \uXXXX: 임의의 유니코드 코드 포인트. 여기서 XXXX 는 16 진수 코드 포인트이다.
- \xXX: 라틴-1 문자. 여기서 xx 는 16 진수 라틴-1 코드포인트이다.

### 템플릿 문자열

변수나 상수를 문자열 안에 쓰는 방법

- 문자열 병합
- 문자열 템플릿

### 숫자와 문자열

```js
const result1 = 3 + "30"; // 3이 문자열로 바뀜. 문자열 '330'
const result2 = 3 * "30"; // '30'이 숫자로 바뀜. 숫자 90
```

숫자가 필요할 때는 숫자를 쓰자. 문자열이 필요할 땐 문자열을 쓰자. 모호한 부분은 사용자 입력을 받을 때이다. 사용자 입력은 거의 항상 문자열로 들어오므로, 숫자가 필요할 때 숫자로 바꿔야 한다.

#### NaN(Not a Number)

계산 불가능한 연산의 결과값

```js
0 / 0; //NaN
1 * "HELL0"; //NaN
```

자기 자신과 같지 않은 값

```js
NaN === NaN; //false
const v = NaN; //어떤 결과 값으로 NaN이 들어옴
if (v === NaN) {
  alert("올바른 값을 입력하시오.");
  // NaN은 NaN과 같지 않음. 절대 동작할 수 없음
}
if (Number.isNaN(v)) {
  alert("올바른 값을 입력하세요");
}
```

혹은 `Object.is(value1, value2)`함수를 사용하여 두 값이 같은 값인지 비교한다.

## 심볼

심볼은 유일한 토큰을 나타내기 위해 ES6 에서 도입한 새 데이터 타입이다. 심볼은 항상 유일하다. 이런 면에서 심볼은 객체와 유사하다. 객체는 모두 유일하다. 항상 유일하다는 점을 제외하면 심볼은 원시 값의 특징을 모두 가지고 있으므로 확장성 있는 코드를 만들 수 있다.

심볼은 Symbol()생성자로 만든다.

```js
const RED = Symbol("the color of a sunset!");
const ORANGE = Symbol("the color of a sunset!");
RED === ORANGE; // false: 심볼은 모두 서로 다르다.
```

우연히 다른 식별자와 혼동해서는 안 되는 고유한 식별자가 필요하다면 심볼을 사용해라.

## null 과 undefined

null 과 undefined 는 자바스크립트의 특별한 타입니다. null 이 가질 수 있는 값은 null 하나뿐이며, undefined 가 가질 수 있는 값도 undefined 하나뿐이다. null 과 undefined 는 모두 존재하지 않는 것을 나타낸다.

일반적인 규칙은 null 은 프로그래머에게 허용된 데이터 타입이며 undefined 는 자바스크립트 자체에서 사용한다고 기억하면 된다. 프로그래머도 undefined 값을 사용할 수는 있지만, 꼭 필요할 때만 사용하도록 주의해야 한다. undefined 를 사용하는 경우는 아직 값이 주어지지 않은 변수의 동작을 고의로 흉내 내야 할 때 정도이며 변수의 값을 아직 모르거나 적용할 수 없는 경우에는 대부분 null 이 더 나은 선택이다. 변수를 선언하기만 하고 명시적으로 값을 할당하지 않으면 그 변수에는 기본적으로 undefined 가 할당된다.

```js
let currentTemp; // 암식저긍로 undefined이다.
const targetTemp = null; // 대상 온도는 null, 즉 아직 모르는 값이다.
currentTemp = 19.5; // currentTemp는 이제 값이 있다.
currentTemp = undefined; // currentTemp는 아직 초기화되지 않은 듯하다. 권장하지 않는다.
```

## 객체

원시 타입은 단 하나의 값만 나타낼 수 있고 불변이지만, 이와 달리 객체는 여러 가지 값이나 복잡한 값을 나타낼 수 있으며, 변할 수도 있다.

객체의 콘턴츠는 프로퍼티 또는 멤버라고 부른다. 프로퍼티는 이름 값으로 구성된다.

```js
const obj = {};
obj.color = "yellow";
```

프로퍼티 이름에 유효한 식별자를 써야 멤버 접근 연산자(.)를 사용할 수 있다. 프로퍼티 이름에 유효한 식별자가 아닌 이름을 쓴다면 대괄호 표기법을 써야 한다.

```js
obj["not an idenrifier"] = 3;
```

심볼 프로퍼티에 접근할 때도 대괄호를 사용한다.

```js
const SIZE = Symbol();
obj[SIZE] = 8;
obj[SIZE]; // 8
```

`obj // {color: "yellow", not an idenrifier: 3, Symbol(): 8}`
SIZE 를 obj 의 프로퍼티로 나열하지 않고 있다. `obj[SIZE] //8` 그러나 SIZE 가 obj 의 프로퍼티인 것을 확인할 수 있다. 심볼 프로퍼티는 다르게 처리되며 기본적으로는 표시되지 않는다.
또한 이 프로퍼티의 키는 SIZE 심볼이며 문자열 'SIZE'가 아니다.

```js
obj.SIZE = 0;
obj["SIZE"]; // 0
obj; // {color: "yellow", not an idenrifier: 3, SIZE: 0, Symbol(): 8}
obj[SIZE]; // 8
```

변수 obj 에 저장된 객체를 계속 수정하였지만, obj 는 항상 같은 객체를 가리키고 있었다. obj 에 저장한 것이 문자열이나 숫자, 기타 다른 원시값이었다면 수정할 때마다 다른 값을 가리켰을 것이다. obj 는 계속 같은 객체를 가리키고, 바뀐 것은 객체의 프로퍼티입니다.

객체의 프로퍼티 제거할 때는 delete 연산자 사용한다.

```js
delete obj.color;
```

## Number, String, Boolean 객체

이들 객체에는 두 가지 목적이 있다. 하나는 Number.INFINITY 같은 특별한 값을 저장하는 것이고, 다른 하나는 함수 형태로 기능을 제공하는 것이다.

```js
const s = "hello";
s.toUpperCase(); // 'HELLO'
```

s 가 마치 객체처럼 보인다. 하지만 s 는 분명 원시 문자열 타입이다. 자바스크립트 일시적인 String 객체를 만들었다. 이 임시 객체에 toUpperCase 함수가 들어있다. 자바스크립트는 함수를 호출하는 즉시 임시 객체를 파괴한다.

## 데이터 타입 변환

### 숫자로 바꾸기

Number 객체 생성자를 사용하는 방법과 parseInt 와 parseFloat 함수를 사용하는 방법이 있다.
paseInt 와 parseFloat 는 모두 숫자로 판단할 수 있는 부분까지만 변환하고, 그 뒤에 있는 문자열을 부시한다. 따라서 문자열의 형태가 엉망진창이어도 입력값으로 쓸 수 있다. parseInt 는 기수값을 넘길 수 있다.

```js
const a = parseInt("16 volts", 10); // 16 volts는 무시됨
const b = parseInt("3a", 16); // 58
const c = parseFloat("15.5 kph"); // 'kph'는 무시된다. parseFloat는 항상 기수가 10이라고 가정한다.
```

Date 객체를 숫자로 바꿀 때는 valueOf() 매서드를 사용한다. 이 숫자는 UTC 1970 년 1 월 1 일 자정으로부터 몇 밀리초가 지났는지 나타내는 숫자이다.

```js
const d = new Date();
const ts = d.valueOf(); // 1538836744064
```

### 문자열로 변환

toString() 메서드를 사용한다.
