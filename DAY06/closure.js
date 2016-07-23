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
// console.log(innerFn_global_scope);
// 전역에서 클로저 함수를 실행해보면 접근이 불가능했던
// outerFn 내부의 변수에 접근할 수 있는 것을 확인 할 수 있다.
// innerFn_global_scope();

// console.log('outerFn 함수 밖에서 접근:', outerFn_name); // ????

/**
 * --------------------------------
 * 카운트다운 예제
 */

// countDownWrapper 일반 함수 -> 클로저 함수 반환 역할
function countDownWrapper(count) {
  // count = 사용자가 전달한 카운트 (카운트다운의 시작)
  // function countDown() {
    /* count = count - 1;*/
    /* count -= 1;*/
    /* count--;*/
    /* return count;*/
    // return count--;
  // }
  // 클로저 함수 반환
  // return countDown;
  return function(){
    return count--;
  }
}

var countDown10  = countDownWrapper(10); // 10, 9, 8, 7, ..., 0
var countDown30  = countDownWrapper(30);
var countDown60  = countDownWrapper(60);
var countDown100 = countDownWrapper(100);

// countDown10(); // 10
// countDown10(); // 9
// countDown10(); // 8
// countDown10(); // 7
// countDown10(); // 6
// countDown10(); // 5
// countDown10(); // 4
// countDown10(); // 3
// countDown10(); // 2
// countDown10(); // 1
// countDown10(); // 0

// var count10 = 10;
// var count20 = 20;

// function countDown10() {
//   return count10--;
// }

// function countDown20() {
//   return count20--;
// }

/**
 * --------------------------------
 * 객체를 반환하는 함수
 * 클로저 객체를 반환
 */
function counterMaker(count) {
  var _coutner, origin_count = count;
  // 기능 정의
  // count 증가 기능
  function increaseCount() {
    return ++count;
  }
  // count 감소 기능
  function decreaseCount() {
    return --count;
  }
  function displayCount() {
    return count;
  }
  // count 초기화 기능
  function resetCount() {
    count = origin_count;
    return count;
  }
  // 위에 정의된 함수들을 멤버로하는 객체
  _coutner = {
    'plus':  increaseCount,
    'minus': decreaseCount,
    'init':  resetCount,
    'print': displayCount
  };
  return _coutner;
}


var counter = counterMaker(10);

// console.dir(counter);