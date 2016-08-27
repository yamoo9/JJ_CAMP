/*! DOM_lib.js © yamoo9.net, 2016 */
(function(global){
  'use strict';

  // 객체 합성 디자인 패턴
  // o1, o2
  function _merge(o1, o2) {
    for ( var prop in o2 ) {
      if ( o2.hasOwnProperty(prop) ) {
        o1[prop] = o2[prop];
      }
    }
  };

  // 생성자 함수
  var y9 = function y9(selector) {
    // new를 강제화하는 패턴
    // this 참조 변수가 객체 자신을 가리키도록 만들어야 한다.
    if ( this === undefined || this.constructor !== y9 ) {
      return new y9(selector);
    }
    // 객체 자신을 초기화
    this.init();
    // 암묵적으로 생성된 객체를 반환
    // return this;
  };

  // 정적 메소드(Static Method, Class Method)
  // jQuery 유틸리티 메소드 (함수, 객체)
  y9.type = function(data) {
    return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
  };
  y9.include = function(method, fn) {
    var type = this.type(method);
    // 1. method가 문자열인 경우
    if ( type === 'string' ) {
      this[method] = fn;
    }
    // 2. method가 객체인 경우
    if ( type === 'object' ) {
      _merge(this, method);
    }
  };
  y9.include({
    'each': function(o, fn) {
      if ( this.type(fn) !== 'function' ) { fn = function(){}; }
      // o를 순환
      switch( this.type(o) ) {
        // [ 2, 3, 4]
        case 'array':
          // forEach 동일
          for ( var _o, _i=0, _l=o.length; _i < _l; _i++ ) {
            _o = o[_i];
            fn.call(_o, _o, _i);
          }
        break;
        // {'key': 'value', 'key': 'value'}
        case 'object':
          for ( var prop in o ) {
            if ( o.hasOwnProperty(prop) ) {
              fn.apply(o, [prop, o[prop]]);
            }
          }
      }
    },
    'makeArray': function(o) {
      return Array.prototype.slice.call(o);
    },
    'isArray': function(o) {
      return this.type(o) === 'array';
    }
  });



  // 생성자 함수의 프로토타입 객체
  y9.prototype = {
    // 생성자 설정
    'constructor': y9,
    // 초기화
    'init': function() {}
  };
  // 생성자 함수를 외부에 공개
  global.y9 = y9;
  // 별칭 설정
  global.$$ = y9;

})(this);