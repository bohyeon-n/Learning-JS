# 함수

## 함수와 매개 변수

컴퓨터 과학에서는 자바스크립트의 원시 값을 값 타입이라고 말한다. 원시 값을 전달할 때 값이 복사하기 때문이다. 객체는 참조 타입이라 부른다. 객체를 전달할 때 두 변수는 같은 객체를 가리키기 때문이다.

### 매개변수 해체

```js
function getSentence({ subject, verb, object }) {
  return `${subject} ${verb} ${object}`;
}

const o = {
  subject: "i",
  verb: "love",
  object: "javascript"
};
getSentence(o); // "i love javascript"
```

### 객체의 프로퍼터인 함수

객체의 프로퍼티인 함수를 메서드라고 불러서 일반적인 함수와 구별한다.
객체 리터럴에서도 메서드를 추가할 수 있다.

```js
const o = {
  name: "wallace",
  bark: function() {
    return "Woof";
  }
};
```

ES6 에서는 간편하게 메서드를 추가할 수 있는 문법이 새로 생겼다.

```js
const o = {
  name: "wallace",
  bark() {
    return "Woof";
  }
};
```

## this 키워드

함수 바디 안에는 특별한 읽기 전용 값인 this 가 있다. this 는 일반적으로 객체지향 프로그래밍 개념에 밀접한 연관이 있다. 자바스크립트에서는 객체지향 프로그래밍 말고도 this 를 사용하는 여러 가지 방법이 있다. 일반적으로 this 는 객체의 프로퍼티인 함수에서 의미가 있다. 메서드를 호출하면 this 는 호출한 메서드를 소유하는 객체가 된다.

```js
const o = {
  name: "Wallace",
  speak() {
    return `My name is ${this.name}!`;
  }
};
```

o.speak()을 호출하면 this 는 o 에 묶인다.

```js
o.speak();
```

this 는 함수를 어떻게 선언했느냐가 아니라 어떻게 호출했느냐에 따라 달라진다는 것을 이해해야 한다. 즉 this 가 o 에 묶인 이유는 speak 가 o 의 프로퍼티여서가 아니라, o 에서 speak 를 호출했기 때문이다. 같은 함수를 변수에 할당하면 어떻게 되는지 보자.

```js
const speak = o.speak;
speak === o.speak; // true
speak(); // "My name is undefined !"
```

함수를 이렇게 호출하면 자바스크립트는 이 함수가 어디에 속하는지 알 수 없으므로 this 는 undefined 에 묶인다.

메서드라는 용어는 원래 객체지향 프로그래밍의 개념이지만, 이 책에서는 객체의 프로퍼티이며 o.speak()처럼 객체 인스턴스에서 호출할 의도로 만든 함수라는 뜻으로 사용한다. 함수에서 this 를 사용하지 않으면 어디에서 선언했든 관계없이 함수라고 부르겠다.

```js
const o = {
  name: "julie",
  greetBackwards: function() {
    function getReverseName() {
      let nameBackwards = "";
      for (let i = this.name.length - 1; i >= 0; i--) {
        nameBackwards += this.name[i];
      }
      return nameBackwards;
    }
    return `${getReverseName()} so eman ym. olleh`;
  }
};

o.greetBackwards();
```

```js
const o = {
  name: "julie",
  greetBackwards: function() {
    const self = this;
    function getReverseName() {
      let nameBackwards = "";
      for (let i = self.name.length - 1; i >= 0; i--) {
        nameBackwards += self.name[i];
      }
      return nameBackwards;
    }
    return `${getReverseName()} so eman ym. olleh`;
  }
};

o.greetBackwards();
```

화살표 함수를 사용하여 해결하기

```js
const o = {
  name: "julie",
  greetBackwards: function() {
    const self = this;
    getReverseName = () => {
      let nameBackwards = "";
      for (let i = this.name.length - 1; i >= 0; i--) {
        nameBackwards += this.name[i];
      }
      return nameBackwards;
    };
    return `${getReverseName()} so eman ym. olleh`;
  }
};

o.greetBackwards();
```

## 함수 표현식과 익명 함수

표현식이 값이 되고, 함수 역시 값이 된다. 함수 표현식은 함수를 선언하는 한 가지 방법일 뿐이며, 그 함수가 익명이 될 수도 있을 뿐이다. 함수 표현식은 식별자에 할당할 수도 있고 즉시 호출할 수도 있다. 함수 표현식은 함수 이름을 생략할 수 있다는 점을 제외하면 함수 선언과 문법적으로 완전히 같다.

```js
const f = function() {
  //...
};
```

차이점은 먼저 함수 표현식으로 익명 함수를 만들고 그 함수를 변수에 할당했다는 것이다.

함수에 이름을 정하고 다시 변수에 할당하면 어떻게 될까? 그리고 그렇게 한다면 이유는 무엇일까?

```js
const g = function f() {
  //...
};
```

이런 식으로 함수를 만들면 이름 g 에 우선순위가 있다.
왜 이런 방법을 쓸까? 함수 안에서 자신을 호출할 때 이런 방식이 필요할 수 있다.

```js
const g = function f(stop) {
  if (stop) console.log("f stopped");
  f(true);
};
g(false);
```

## 화살표 표기법

화살표 함수에는 세 가지 단축 문법이 있다.

- function 을 생략해도 된다.
- 함수에 매개변수가 단 하나 뿐이라면 괄호(())도 생략할 수 있다.
- 함수 바디가 표현식 하나라면 중괄호와 return 문도 생략할 수 있다.

화살표 함수는 익명 함수를 만들어 다른 곳에 전달하려 할 때 가장 유용하다.

화살표 함수에는 일반적인 함수와 중요한 차이가 있다. this 가 다른 변수와 마찬가지로, 정적(lexically)으로 묶인다는 것이다.

## call 과 apply, bind

자바스크립트에서는 일반적인 방법 외에도, 함수를 어디서, 어떻게 호출했느냐와 관계없이 this 가 무엇인지 지정할 수 있다. call 메서드는 모든 함수에서 사용할 수 있으며 this 를 특정 값으로 지정할 수 있다.

### call

```js
const bruce = { name: "bruce" };
const madeline = { name: "madeline" };

// 이 함수는 어떤 객체에도 연결되지 않았지만 this를 사용한다.
function greet() {
  return `hello i'm ${this.name}`;
}
greet();
greet.call(bruce);
greet.call(madeline);
```

함수를 호출하면서 call 을 사용하고 this 로 사용할 객체를 넘기면 해당 함수가 주어진 객체의 메서드인 것처럼 사용할 수 있다. call 의 첫 번째 매개변수는 this 를 사용할 값이고, 매개 변수가 더 있으면 그 매개변수는 호출하는 함수로 전달된다.

```js
const bruce = { name: "bruce" };

function update(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
}
update.call(bruce, 1949, "singer");
bruce; // { name: 'bruce', birthYear: 1949, occupation: 'singer' }
```

### apply

call 은 일반적인 함수와 마찬가지로 매개변수를 직접 받지만, apply 는 매개변수를 배열로 받는다.

```js
update.apply(bruce, [1995, "actor"]);
bruce; // { name: 'bruce', birthYear: 1995, occupation: 'actor' }
```

apply 는 배열 요소를 함수 매개변수로 사용해야 할 때 유용하다. apply 를 설명할 때 흔히 사용하는 예제는 배열의 최솟값과 최댓값을 구하는 것이다. apply 를 사용하면 기존 배열을 이들 함수에 바로 넘길 수 있다.

```js
const arr = [2, 3, -5, 15, 7];
Math.min.apply(null, arr);
Math.max.apply(null, arr);
```

this 값에 null 을 쓴 이유는 Math.min 과 Math.max 가 this 와 관계없이 동작하기 때문이다. 즉, 무엇을 넘기던 상관없다.

ES6 의 확산 연산자(...)를 사용할 수도 있다.

```js
const newBruce = [1940, "martial artist"];
update.call(bruce, ...newBruce);
Math.min(...arr);
Math.max(...arr);
```

### bind

bind 를 사용하면 함수의 this 값을 영구히 바꿀 수 있다.

update 메서드를 이리저리 옮기면서도 호출할 때 this 값은 항상 bruce 가 되게끔, call 이나 apply, 다른 bind 와 함께 호출하더라도 this 값이 bruce 가 되도록 하려면 bind 를 사용한다.

```js
const updateBruce = update.bind(bruce);

updateBruce(1940, "actor");

updateBruce.call(madeline, 1274, "king");
```

bind 함수는 동작을 영구적으로 바꾸므로 찾기 어려운 버그의 원인이 도리 수 있다. bind 를 사용한 함수는 call 이나 apply, 다른 bind 와 함께 사용할 수 없는 거나 마찬가지이다. 함수를 여기저기서 call 이나 apply 로 호출해야 하는데, this 값이 그에 맞춰 바뀌어야 하는 경우를 상상해보자. 이럴 때는 bind 를 사용하면 문제가 생긴다.

bind 에 매개변수를 넘기면 항상 그 매개변수를 받으면서 호출되는 새 함수를 만드는 효과가 있다. 예를 들어 bruce 가 태어난 해룰 항상 1949 로 고정하지만, 직업은 자유롭게 바꿀 수 있는 업데이트 함수를 만들고 싶다면 다음과 같이 하면 된다.

```js
const updateBruce1949 = update.bind(bruce, 1949);
updateBruce1949("singer");
```
