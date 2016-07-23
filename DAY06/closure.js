/**
 * --------------------------------
 * 자바스크립트 클로저
 */
function outerFn() {
  var outerFn_name = '아우터';
  console.log('outerFn 함수 내에서 접근:', outerFn_name); // '아우터'
  function innerFn() {
    console.log('innerFn 함수 내에서 접근:', outerFn_name);
  }
  // innerFn 함수를 outerFn 함수 밖으로 내보낸다.
  // 클로저 함수가 밖으로 내보내진다.
  return innerFn;
}
// outerFn 내부에 있던 innerFn(클로저 함수)을 전역 공간의 변수에 반환한다.
var innerFn_global_scope = outerFn();
// 전역 공간에서 클로저 함수 innerFn을 참조하는 innerFn_global_scope() 실행하면
// 외부에서 접근이 불가능한 outerFn 함수 내부의 지역 변수에 접근이 가능하다.
console.log(innerFn_global_scope);

// console.log('outerFn 함수 밖에서 접근:', outerFn_name); // ????