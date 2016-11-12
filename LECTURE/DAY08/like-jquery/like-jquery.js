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

  // 생성자 함수의 속성(메소드)을 추가
  // 객체를 생성하지 않고도 외부에서 사용 가능한 정적 메소드이다.
  likeJq.trimLeft = function( text ) {
    return text.replace(/^\s+/, '');
  };
  likeJq.trimRight = function( text ) {
    return text.replace(/\s+$/, '');
  };
  likeJq.trim = function( text ) {
    return likeJq.trimRight( likeJq.trimLeft(text) );
  };

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

    },
    'addClass': function(name) {
      this.each(function(index, el) {
        // el.classList.add(name); // IE 10+
        var pre_classes = el.getAttribute('class') || '';
        var pre_classes_arr = pre_classes.split(' ');
        for ( var i=0, l=pre_classes_arr.length; i<l; i++ ) {
          var item = pre_classes_arr[i];
          if (item === name) { return; } // 함수 종료
        }
        el.setAttribute( 'class', likeJq.trim(pre_classes + ' ' + name) );
      });
      return this;
    },
    'removeClass': function(name) {
      var name_reg = new RegExp('(^|\\s+)' +name+ '(\\s+|$)', 'g');
      this.each(function(index, el) {
        // el.classList.remove(name); // IE 10+
        var classes = el.getAttribute('class');
        classes = classes.replace(name_reg, ' ');
        el.setAttribute('class', likeJq.trim(classes));
      });
      // 메소드를 연결해서 사용하려면
      return this;
    }
  };

  // 생성자 함수 반환
  return likeJq;

})( this );
