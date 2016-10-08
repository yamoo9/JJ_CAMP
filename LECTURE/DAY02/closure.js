/*! closure.js © yamoo9.net, 2016 */

/**
 * --------------------------------
 * 자바스크립트 클로저
 * 함수
 * 객체 (모던 자바스크립트: 모듈 패턴)
 * ----------------------------- */
// 함수 표현식
// Yahoo 엔지니어 더글라스 크록포드 권장!!
var countDownMaker = function(init_count) {
  // 사용자가 설정한 초기 count 값
  // init_count; // 10
  var _innerCountDown = function() {
    return init_count--;
  };
  // 클로저 함수 반환
  return _innerCountDown;
};

// 반환된 클로저 함수를 변수 countdown10 변수에 참조
var countdown10 = countDownMaker(10);

// console.log('1', countdown10());
// console.log('2', countdown10());
// console.log('3', countdown10());

// countdown10(); // 10
// countdown10(); // 9
// countdown10(); // 8
// countdown10(); // 7
// countdown10(); // 6
// .
// .
// .
// countdown10(); // 0