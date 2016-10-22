// 안티 패턴: 전역 공간에 변수를 설정
var creation = 'Create Element Node';

console.log('외부 - creation:', creation);

// 자바스크립트 블록문 (별도의 공간을 가지는가?)
// var 키워드를 사용할 경우는 블록문은 별도의 공간을 가지지 않는다.
// 단, ES6(ECMAScript 2015)에서는 let 키워드가 등장했는데
// let 키워드를 블록문 내부에서 사용할 경우, 별도의 공간이 형성된다.
{
  var creation = 'Creative Front-End Developer';
  console.log('블록문 내부 - creation:', creation);
}

// 굿 패턴: 모듈을 사용하여 코드를 외부에서 조작할 수 없도록 처리
// IIFE 즉시 실행함수 패턴 -> 자바스크립트 모듈 패턴
(function(){
  var creation = 'Creative Designer';
  console.log('함수 내부 1 - creation:', creation);
}());

(function(){
  var creation = 'Reactivity RXJS';
  console.log('함수 내부 2 - creation:', creation);
}());

console.log('외부 - creation:', creation);