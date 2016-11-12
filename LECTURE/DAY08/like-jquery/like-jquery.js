/*! like-jquery.js © yamoo9.net, 2016 */

// 커스텀 라이브러리 모듈 `likeJq`
// IFFE 패턴을 사용하여 모듈 정의
var likeJq = (function( global ){
  'use strict';

  // 생성자 함수
  function likeJq() {
    // this === undefined
    // this === likeJq {}
    // new 키워드를 강제화시키는 패턴
    if ( !(this instanceof likeJq) ) {
      return new likeJq();
    }
  }

  // 생성자 함수의 프로토타입 빈 객체
  likeJq.fn = likeJq.prototype = {
    // 생성자 참조 멤버 변수
    'constructor': likeJq,
    'version': '1.0.0',
  };

  // 생성자 함수 반환
  return likeJq;

})( this );
