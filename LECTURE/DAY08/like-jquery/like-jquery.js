/*! like-jquery.js © yamoo9.net, 2016 */

// 커스텀 라이브러리 모듈 `likeJq`
// IFFE 패턴을 사용하여 모듈 정의
var likeJq = (function( global ){
  'use strict';

  // 생성자 함수
  function likeJq( selector, context ) {
    // this === undefined
    // this === likeJq {}
    // new 키워드를 강제화시키는 패턴
    if ( !(this instanceof likeJq) ) {
      return new likeJq( selector, context );
    }
    // 객체에 초기화 설정
    this._init.apply( this, arguments );
  }

  // 생성자 함수의 프로토타입 빈 객체
  likeJq.fn = likeJq.prototype = {
    // 생성자 참조 멤버 변수
    'constructor': likeJq,
    'version': '1.0.0',
    '_init': function(selector, context) {
      context = context || this;
      this._elements = document.querySelectorAll(selector);
    },
    'each': function(callback) {
      var el, i=0, l=this._elements.length;
      for ( ; i<l; i++ ) {
        el = this._elements[i];
        callback.call(el, i, el, this._elements);
      }
    },
    'hasClass': function(name) {
      this.each(function(index, element){
        var _classes = element.getAttribute('class');
        for ( var i=0, l=_classes.length; i<l; i++ ) {
          console.log(_classes[i]);
        }
      });
    }
  };

  // 생성자 함수 반환
  return likeJq;

})( this );
