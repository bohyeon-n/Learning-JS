# 제어문

## 크라운 앤 앵커 게임 만들기

```js
function rand(m, n) {
  return m + Math.floor((n - m + 1) * Math.random());
}
function randFace() {
  return ["crown", "anchor", "heart", "spade", "club", "diamond"][rand(0, 5)];
}

function playGame(money) {
  let funds = money;
  let round = 0;
  while (funds < funds * 2 && funds > 0) {
    let bets = { crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0 };
    let totalBet = rand(1, funds);
    if (totalBet === 7) {
      totalBet = funds;
      bets.heart = totalBet;
    } else {
      let remaining = totalBet;
      do {
        let bet = rand(1, remaining);
        let face = randFace();
        bets[face] += bet;
        remaining -= bet;
      } while (remaining > 0);
    }
    funds -= totalBet;
    console.log(
      "bets " +
        Object.keys(bets)
          .map(face => `${face}: ${bets[face]} pence`)
          .join(",")
    );
    const hand = [];
    for (let roll = 0; roll < 3; roll++) {
      hand.push(randFace());
    }
    console.log(`hand: ${hand.join(",")}`);
    let winnings = 0;
    for (let die = 0; die < hand.length; die++) {
      let face = hand[die];
      if (bets[face] > 0) winnings += bets[face];
    }
    funds += winnings;
  }
  console.log(`ending funds : ${funds}`);
}
```

## 자바스크립트의 제어문

#### 제어문의 예외

thorw : 예외 핸들러에서 반드시 처리해야 할 예외를 일으킨다. 예외 핸들러는 현재 제어문 바깥에 있어도 상관없다.

### for 루프의 다른 패턴

쉼표 연산자를 쓰면 초기화와 마지막 표현식에 여러 문을 결합할 수 있다. 예를 들어 다음 for 루프는 피보나치 수열의 숫자 중 처음 여덟 개를 출력한다

```js
for (let temp, i = 0, j = 1; j < 30; temp = i, i = j, j = i + temp) {
  console.log(j);
}
```

for 루프에서 조건을 생략하면 항상 true 로 평가되므로 루프를 빠져나갈 수 없다.

for 루프는 보통 정수 인덱스를 늘이거나 줄이면서 반복하지만, 꼭 그래야 하는 건 아니다. 어떤 표현식이던 쓸 수 있다.

```js
let s = "3";
for (; s.length < 10; s = " " + s); // 여기서 사용한 for 루프 마지막에 세미콜론이 없으면 에러가 일어난다.

for (; !player.isBroke; ) console.log("still playing"); // 조건에 객체 프로퍼티를 썼다.
```

for 루프의 장점은 루프의 제어부가 첫 번째 행에 모여 있어서 일목요연하게 파악할 수 있다는 것이다. 또한 for 루프에서는 let 으로 초기화한 변수가 for 루프 안에서만 유효하다는 장점도 있다.
이런 for 문을 while 문으로 바꾸면,컨트롤 변수는 루프 바깥에서도 볼 수 있게 된다.

#### for...in 루프

for...in 루프는 객체의 프로퍼티에 루프를 실행하도록 설계된 루프이다.

```js
for (variable in object) statement;
```

```js
const player = { name: "bohyeon", rank: "midshipman", age: 7 };
for (let prop in player) {
  if (!player.hasOwnProperty(prop)) continue;
  console.log(`${porp}: ${player[prop]}`);
}
```

#### for...of 루프

컬렉션의 요소에 루프를 실행하는 다른 방법이다.

```js
for (variable of object) statement;
```

for...of 루프는 배열은 물론 이터러블 객체에 모두 사용할 수 있는 범용적인 루프이다.

```js
const hand = [randFace(), randFace(), randFace()];
for (let face of hand) console.log(`you rolled ... ${face}!`);
```

for...of 는 배열에 루프를 실행해야 하지만 각 요소의 인덱스를 알 필요는 없을 때 알맞다. 인덱스를 알아야 한다면 일반적인 for 루프를 사용해라.

### 유용한 제어문 패턴

#### continue 문을 사용하여 조건 중첩 줄이기

특정 조건이 맞을 때만 루프 바디를 실행해야 할 때가 많다. 다시 말해 반복문 안에 조건문을 써야 하는 경우이다.

```js
while (funds > 1 && funds > 100) {
  let totalBet = rand(1, funds);
  if (totalBet === 13) {
    console.log("Unlucky! skip this round... ");
  } else {
    // play
  }
}
```

이런 경우 제어문 **중첩**이라고 부른다(while 안의 if else 구문 ). while 루프의 바디에서 할 일은 대부분 else 절에 들어있고 if 절이 하는 일은 console.log 를 호출하는 것뿐이다. continue 문을 써서 이 구조를 간편하게 만들 수 있다.

중첩 제거하기

```js
while (funds > 1 && funds > 100) {
  let totalBet = rand(1, funds);
  if (totalBet === 13) {
    console.log("Unlucky! skip this round... ");
    continue;
  }
  // play
}
```

루프 바디가 20 행쯤 된다고 하면 중첩을 제거하면 코드를 읽고 이해하기가 쉬워진다.

#### break 나 return 문을 써서 불필요한 연산 줄이기

뭔가를 찾기 위해서 루프를 실행했다면, 찾으려는 것을 이미 찾은 후에는 루프 바디를 계쏙 실행할 필요가 없다.

예를 들어 어떤 숫자가 소수인지 판단하는 작업은 CPU 부하가 비교적 높은 일 중 하나이다. 숫자 수천 개의 리스트에서 가장 앞에 있는 소수를 찾는다고 했을 때 다음 코드는 일단 원하는 작업을 하기는 한다.

```js
let firstPrime = null;
for (let n of bigArrayNumbers) {
  if (isPrime(n) && firstPrime === null) firstPrime = n;
}
```

개선 코드

```js
let firstPrime = null;
for (let n of bigArrayOfNumbers) {
  if (isPrime(n)) {
    firstPrime = n;
    break;
  }
}
```

#### 배열을 수정할 때 감소하는 인덱스 사용하기

배열에 루프를 실행하면서 루프 바디에서 배열을 수정하는 건 위험할 수 있다. 뜻하지 않게 종료 조건을 바꿀 수도 있다. 운이 나쁘면 무한 루프가 발생할 수 있다. 이런 경우 널리 쓰이는 패턴은 감소하는 인덱스를 써서
배열 마지막 요소에서 루프를 시작하는 방법이다.

예를 들어 bigArrayOfNumbers 에서 찾은 모든 소수를 제거하고 싶다고 하자.

```js
for (let i = 0; i < bigArrayOfNumbers.length; i++) {
  if (isPrime(bigArrayOfNumbers[i])) bigArrayOfNumbers.splice(i, 1);
}
```

인덱스는 점점 커지는데 splice 로 배열의 요소를 제거하고 있으므로 소수가 연달아 존재한다면 그 중 일부를 제거하지 않고 넘어갈 가능성이 있다.
이 때 감소하는 인덱스를 쓰면 문제를 해결할 수 있다.

```js
for (let i = bigArrayOfNumbers.length; i >= 0; i--) {
  if (isPrime(bigArrayOfNumbers[i])) bigArrayOfNumbers.splice(i, 1);
}
```
