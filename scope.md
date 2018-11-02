# 스코프

## 스코프와 존재

변수가 스코프 안에 있지 않다면, 그 변수는 존재하지 않을까? 스코프와 존재를 반드시 구별해야 한다.
가시성이라고도 불리는 스코프는 프로그램의 현재 실행 중인 부분, 즉 실행 컨텍스트에서 현재 보이고 접근할 수 있는 식별자들을 말한다. 반면 존재한다는 말은 그 식별자가 메모리가 할당된(예약된) 무언가를 가리키고 있다는 말이다. '존재하지만 스코프 안에는 없는'

## 정적 스코프와 동적 스코프

정적 스코프는 어떤 변수가 함수 스코프 안에 있는지 함수를 정의할 때 알 수 있다는 뜻이다. 자신이 정의될 때 접근할 수 있었던 식별자에는 여전히 접근할 수 있지만, 호출할 때 스코프에 있는 식별자에 접근할 수 없다.

자바스크립트의 정적 스코프는 전역 스코프와 블록 스코프, 함수 스코프에 적용된다.

## 전역 스코프

전역 스코프에 몇 가지가 존재하는 건 피할 수 없을 뿐더러 그 자체가 그렇게 나쁜 것도 아니다. 피해야 하는 것은 전역 스코프에 의존하는 것이다.

- 전역 변수를 사용하는 방법

```js
let name = "irena";
let age = 25;

function greet() {
  console.log(`hello ${name}`);
}

function getBirthYear() {
  return new Date().getFullYear - age;
}
```

이 방법의 문제는 함수가 호출하는 컨텍스트(스코프)에 대단히 의존적이라는 것이다. 어떤 함수든, 프로그램 어디에서든 상관없이 name 값을 바꿀 수 있다. 또한 name 과 age 는 흔한 이름이므로 다른 곳에서 다른 이유로 사용할 가능성도 크다. greet 과 getBirthYear 은 전역변수에 의존하므로, 프로그램의 다른 부분에서 name 과 age 를 정확히 사용한다고 가정하고 있는 것이다.

그보다는 사용자 정보를 단일 객체에 보관하는 방법이 더 낫다.

```js
let user = {
  name = 'irena',
  age = 25,
}
function greet() {
  console.log(`hello ${user.name}`);
}

function getBirthYear() {
  return new Date().getFullYear - user.age;
}
```

함수 greet 과 getBirthYear 는 여전히 전역 user 에 의존하며, 이 객체는 어디서든 수정할 수 있다. 이 함수들을 고쳐서 전역 스코프에 의존하지 않게 만들어 보자.

```js
function greet(user) {
  console.log(`hello ${user.name}`);
}
function getBirthYear(user) {
  return new Date().getFullYear - user.age;
}
```

이제 이 함수들은 모든 스코프에서 호출할 수 있고, 명시적으로 user 를 전달받는다.

## 블록 스코프

블록은 문을 중괄호로 묶은 것이라고 설명했다. 블록 스코프는 그 블록의 스코프에서만 보이는 식별자를 의미한다.

```js
console.log("before block");
{
  console.log("inside block");
  const x = 3;
  console.log(x);
}
console.log(`outside block x = ${x}`);

// ReferenceError: x is not defined
```

블록은 보통 if 나 for 같은 제어문의 일부분으로 쓰이지만, 블록 그 자체로도 유효한 문법이다. 그러나 이렇게 사용하는 것이 필요한 경우는 드물다. 이해를 위한 예제임

## 변수 숨기기

```js
{
  // 외부 블록
  let x = { color: "blue" };
  let y = x; // y와 x는 같은 객체를 가리킨다.
  let z = 3;
  {
    let x = 5; // 바깥의 x가 가려짐
    console.log(x); // 5
    console.log(y.color); // blue y가 가리키는, 외부 스코프의 x가 가리키는 객체
    y.color = "red ";
    console.log(z);
  }
  console.log(x.color); //red
  console.log(y.color); //red
  console.log(z); // 3
}
```

실행 흐름이 내부 블록에 들어가 새 변수 x 를 정의하는 순간, 두 변수가 모두 스코프 안에 있다는 것이다. 변수 이름이 같으므로 외부 스코프에 있는 변수에 접근할 방법이 없다.

스코프는 계층적이다. 이전 스코프를 떠나지 않아도 새 스코프에 진입할 수 있다. 스코프의 계층적인 성격 때문에 어떤 변수가 스코프에 있는지 확인하는 스코프 체인이란 개념이 생겼다. 현재 스코프 체인에 있는 모든 변수는 스코프에 있는 것이며, 숨겨지지 않았다면 접근할 수 있다.

## 함수, 클로저, 정적 스코프

최신 자바스크립트에서는 함수가 필요한 곳에서 즉석으로 정의할 때가 많다. 함수를 변수나 객체 프로퍼티에 할당하고, 배열에 추가하고, 다른 함수에 전달하고, 함수가 함수를 반환하고, 심지어 이름조차 없을 때도 잦다.
함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 경우가 많다. 이런 것을 보통 클로저라고 부른다. 스코프를 함수 주변으로 좁히는 것이라고 생각해도 된다.

```js
let globalFunc;
{
  let blockVar = "a";
  globalFunc = function() {
    console.log(blockVar);
  };
}
globalFunc();
```

globalFunc 는 블록 안에서 값을 할당받았다. 이 블록 스코프와 그 부모인 전역 스코프가 클로저를 형성한다. globalFunc 를 어디서 호출하든, 이 함수는 클로저에 들어있는 식별자에 접근할 수 있다.

globalFunc 를 호출하면, 이 함수는 스코프에서 빠져나왔음에도 불구하고 blockVar 에 접근할 수 있다.
스코프 안에서 함수를 정의하면 해당 스코프는 더 오래 유지된다.

```js
let f;
{
  let o = { note: "safe" };
  f = function() {
    return o;
  };
}
let oRef = f();
oRef.note = "not so safe after all";
```

## 즉시 호출하는 함수 표현식

```js
(function() {
  //IIFE 바디
})();
```

IIFE 의 장점은 내부에 있는 것들이 모두 자신만의 스코프를 가지지만, IIFE 자체는 함수이므로 그 스코프 밖으로 무언가를 내보낼 수 있다는 것이다.

```js
const message = (function() {
  const secret = "i'm a secret!";
  return `the secret is ${secret.length} characters long`;
})();
console.log(message);
```

secret 변수는 IIFE 의 스코프 안에서 안전하게 보호되며 외부에서 접근할 수 없다.

```js
const f = (function() {
  let count = 0;
  return function() {
    return `i have been called ${++count} time(s)`;
  };
})();

f(); //'i have been called 1 time(s)'
f(); // 'i have been called 2 time(s)'
```

클로저를 만들고 클로저에서 무언가 반환받을 때에는 유용하게 쓸 수 있다.

## 함수 스코프와 호이스팅

ES6 에서 let 을 도입하기 전에는 var 를 써서 변수를 선언했고, 이렇게 선언된 변수들은 함수 스코프라 불리는 스코프를 가졌습니다(var 로 선언한 전역 변수는 명시적인 함수 안에 있지는 않지만 함수 스코프와 똑같이 동작한다)

let 으로 변수를 선언하면, 그 변수는 선언하기 전에는 존재하지 않는다. var 로 선언한 변수는 현재 스코프 안이라면 어디서든 사용할 수 있으며, 심지어 선언하기 전에 사용할 수 있다.

```js
let var1;
let var2 = undefined;
var1; //undefined
```

let 을 쓰면 변수를 선언하기 전 사용하려 할 때 에러가 일어난다.

```js
x; //  Uncaught ReferenceError: x is not defined
let x = 3;
```

```js
x; // undefined
var x = 3;
x; // 3
```

var 로 선언한 변수는 끌어올린다는 뜻의 호이스팅 이라는 매커니즘에 따른다. 자바스크립트는 함수나 전역 스코프 전체를 살펴보고 var 로 선언한 변수를 맨 위로 끌어올린다. 여기서 중요한 것은 선언만 끌어올려진다는 거시며, 할당은 끌어올려지지 않는다는 것이다.

```js
var x; //선언
x; // undefiend
x = 3;
x; // 3
```

```js
var x = 3;
if (x === 3) {
  var x = 2;
  console.log(x); // 2
}
console.log(x); // 2
```

var 변수를 사용하면 같은 함수나 전여 스코프 안에서는 var 로 새 변수를 만들 수 없으며, let 으로 가능했던 변수 숨김도 불가능하다. 블록 안에서 두 번째 var 문을 썼지만 변수 x 는 하나뿐이다.

## 함수 호이스팅

var 로 선언한 변수와 마찬가지로, 함수 선언도 스코프 맨 위로 끌어올려진다. 따라서 함수를 선언하기 전에 호출할 수 있다.

```js
f();
function f() {
  console.log("f");
}
```

그러나 변수에 할당한 함수 표현식은 끌어올려지지 않는다.

```js
f();
let f = function() {
  console.log("f");
};
```

## 사각지대

사각지대란 let 으로 선언하는 변수는 선언하기 전까지 존재하지 않는다는 직관적 개념을 잘 나타내는 표현이다. 스코프 안에서 변수의 사각지대는 변수가 선언되기 전의 코드이다.

typeof 연산자는 변수가 선언됐는지 알아볼 때 널리 쓰이고, 존재를 확인하는 안전한 방법으로 알려져 있다. 즉 , let 키워드가 도입되고 변수의 사각지대가 생기기 전에는 다음과 같은 코드는 항상 안전하며 에러가 발생하지도 않았다.

```js
if (typeof x === "undefined") {
  console.log(`x doesn't exist or is undefiend`);
} else {
  // x 를 사용해도 안전한 코드
}
var x = 1;
```

```js
if (typeof x === "undefined") {
  console.log(`x doesn't exist or is undefiend`);
} else {
  // x 를 사용해도 안전한 코드
}
let x = 1;
```

## 스트릭트 모드

ES5 문법에서는 암시적 전역 변수라는 것이 생길 수 있었다. 암시적 전역 변수는 여러 가지 골치 아픈 에러를 일으키곤 했다. 간단히 말해 var 로 변수를 선언하는 것을 잊으면 자바스크립트는 전역 변수를 참조하려 한다고 간주하고, 그런 전역 변수가 존재하지 않으면 스스로 만들었다.

스트릭트 모드에서는 암시적 전역 변수를 허용하지 않는다.

```js
(function() {
  "use strict";
  // 코드를 전부 이 안에 작성한다.
  // 이 코드는 스트릭트 모드로 동작하지만,
  // 이 코드와 함께 동작하는 다른 스크립트는
  // 스트릭트 모드에 영향받지 않는다.
})();
```
