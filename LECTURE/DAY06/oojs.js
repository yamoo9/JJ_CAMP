/////////////////////////////
// 자바스크립트 프로그래밍 방법론 ///
/////////////////////////////

// 1. 함수형 플로그래밍
// 함수 중심의 프로그래밍 방법론
function subject(who, where, when) {
  return who + '가 ' + where + '에서 ' + when + '에 교육을 받는다.';
}

var korean   = subject('야무', '서울', '주말');
var japanese = subject('사토시', '도쿄', '주중');

// console.log('korean:', korean);
// console.log('japanese:', japanese);

// console.log('------------------------------');

// ------------------------------------------------

// 2. 객체 지향 프로그래밍
// 객체를 중심으로 프로그래밍 방법론
// "객체를 생성하다"
// 어떻게 객체를 생성할 것인가?

// 객체의 종류

// 1-1. 언어에 내장된 객체(Native Objects)
// Number, String, Boolean
// Object, Function, Array

// 1-2. 언어차원에서 지원하는 라이브러리 객체
// Math, RegExp, Date, ...

// 2. 웹 브라우저에 정의된 객체(Browser Objects): BOM
//    window {}
//    screen {}
//    navigator {}
//    location {}
//    history {}

// 3. 사용자 정의 객체(Custom, User Defined Objects)
// Creational Pattern
// Object Literal
// Constructor, Prototype
// Object.create()
// class


function Person(first_name, last_name, age, job, category) {
  'use strict';
  this.first_name = first_name;
  this.last_name  = last_name;
  this.age        = age;
  this.job        = job;
  this.category   = category;
}

var kor_teacher = new Person('설', '민석', 39, '강사', '한국사');
var jap_teacher = new Person('요헤이', '나카무라', 32, '통역', '일본어 회화');

var kor, jap;

// 객체를 생성할 생성자(Constructor) 함수 정의
function Subject(category, teacher, course) {
  'use strict'; // 지시문 프롤로그
  // this !== window
  // new 를 함께 사용하지 않을 경우,
  // this === undefined

  // 속성: 명사 형태
  this.category = category;
  this.teacher  = teacher;
  this.course   = course;
  // 속성(메소드): 동사 형태
  this.addCourseItem = function(item) {
    this.course.push(item);
  };
  this.fireTeacher = function() {
    this.teacher = null;
  };
  this.replaceTeacher = function(new_teacher) {
    this.teacher = new_teacher;
  };
}

// 객체 생성
kor_subject = new Subject(kor_teacher.category, kor_teacher, ['미분', '적분', '삼각함수']);
jap_subject = new Subject(jap_teacher.category, jap_teacher, ['현재시제', '의문형']);

// 생성된 객체의 생성자를 판단하는 방법 2가지
// 객체 instanceof 생성자(함수)
// 객체.constructor === 생성자(함수)
// console.log('kor instanceof Subject:', kor instanceof Subject);
// console.log('jap.constructor === Subject:', jap.constructor === Subject);

// console.log('------------------------------');

// console.log(kor);

// console.log(kor.category);
// console.log(kor.teacher);
// console.log(kor.course);

// console.log('------------------------------');

// console.log(jap);

// console.log(jap.category);
// console.log(jap.teacher);
// console.log(jap.course);




// 함수와 this, 영역(Scope)
// 자바스크립의 블록문

// var phone = 'Gallaxy';

// console.log(phone); // 'Gallaxy'

// function scopeFn() {
//   // console.log(this);
//   var phone = 'iPhone';
//   this.phone = phone;
//   console.log(phone); // 'iPhone'
// }

// 함수 내부의 this는 함수를 실행시킨 콘텍스트 객체를 가리킨다.

// scopeFn(); // this === ???
// document.onclick = scopeFn; // this === window {}

// for (true) {
//   var phone = 'iPhone';
//   console.log(phone); // ?
// }

// console.log(phone); // 'Gallaxy'


console.log('%c------------------------------', 'color: #3d9a21');

// 자바스크립트 세상의 모든 객체는 .constructor 속성을 가진다.
// 사용자가 정의 한 객체 역시 .constructor 속성을 가진다.



