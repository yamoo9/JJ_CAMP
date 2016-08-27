/*! javascript-object-oriented.js © yamoo9.net, 2016 */

// 객체 생성하는 생성자 => 함수
// 객체를 생성하기 위해서는 함수 앞에 new 키워드를 사용
(function(global){
  // 엄격 모드 사용 시,
  // 생성자 함수 내부에 선언된 this가 window 객체를 참조하지 못하도록 하기 위해,
  // new 키워드를 사용하지 않을 경우 콘솔에 오류를 출력한다.
  // ※ new를 강제화하는 패턴을 사용하여 문제를 해결할 수도 있다.
  'use strict';

  // 생성자 함수 (일반 함수)
  function RCCar(driver) {
    // 디자인 패턴: 오류를 사전에 방지하기 위한 목적으로 사용
    // new를 강제화 하는 패턴
    // 엄격모드에서는 생성자 함수 내부의 this 참조 변수가 new를 사용하지 않았을 때
    // this는 undefined 값이 되므로 아래와 같은 비교 구문을 추가한다.
    if ( this === undefined || this.constructor !== RCCar ) {
      return new RCCar(driver);
    }
    this.driver = driver;
  }

  // console.log('window.driver:', global.driver);

  var m_car = new RCCar('민용'); // new 키워드를 사용하여 객체를 생성한 예
  var k_car = RCCar('기석');     // new 키워드를 사용하지 않았을 때 (오류 발생이 없도록 조치)

  // console.log('window.driver:', global.driver);

})(this);