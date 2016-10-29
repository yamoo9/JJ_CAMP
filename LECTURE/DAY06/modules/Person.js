/*! Person.js © yamoo9.net, 2016 */

/*

사람(person)
  - 이름(name)
  - 성별(gender)
  - 나이(age)
  - 키(height)
  - 몸무게(weight)
  - 취미(hobby)
  - 건강(health)
  - 질병(sickness)

*/

// IIFE 패턴 (클로저 활용)
// 자바스크립트 모듈 패턴
// 모듈이 존재하지 않았기 때문에
// 이와 같은 방법을 사용하여 모듈을 생성한다.
// 단, ES6에서는 공식으로 모듈을 언어 차원에서 지원한다.
(function(global, y9){

  /** @consturctor Person */
  function Person(
    name,
    gender,
    age,
    height,
    weight,
    hobby,
    health,
    sickness
  ) {
    'use strict';
    this.name     = name;
    this.gender   = gender;
    this.age      = age;
    this.height   = height;
    this.weight   = weight;
    this.hobby    = hobby;
    this.health   = health;
    this.sickness = sickness;
    // Methods (공통: 생성된 객체가 모두 함께 사용)
    // this.eat      = eat;
    // this.run      = run;
    // this.sleep    = sleep;
  }

  // 프로토타입 객체
  // 생성자함수의 prototype 속성으로 프로토타입 객체에 접근 가능
  // 자바스크립트의 모든 함수는 선언과 동시에 기본적으로 프로토타입 객체도 함께 생성

  // 생성자함수.prototype
  // Methods (공통: 생성된 객체가 모두 함께 사용)
  // Person.prototype; // {}
  Person.prototype.eat   = eat;
  Person.prototype.run   = run;
  Person.prototype.sleep = sleep;

  // Local Scope Function
  // Private Members
  function eat(what) {
    // 'use strict';
    return this.name + '은 ' + what + '을 먹었다.';
  }

  function run(how_much) {
    // 'use strict';
    return this.name + '은 ' + how_much + '만큼 달렸다.';
  }

  function sleep(time) {
    // 'use strict';
    return this.name + '은 ' + time + '만큼 잤다.';
  }


  // 모듈 내부에서 공개
  // global.Person = Person;
  y9.Person = Person;

})(this, (this.y9 = this.y9 || {}) );