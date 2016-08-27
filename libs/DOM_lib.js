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
    this.init(selector);
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
  // static methods 확장
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
    },
    'extend': function() {
      var l = arguments.length;
      while( arguments[--l] ) {
        var o1 = arguments[l-1];
        var o2 = arguments[l];
        if (o1) { _merge(o1, o2); }
      }
      return arguments[0];
    }
  });

  // 생성자 함수의 프로토타입 객체
  y9.fn = y9.prototype = {
    // 생성자 설정
    'constructor': y9,
    // 초기화
    'init': (function(){
      var els = [];
      return function(selector) {
        els = y9.makeArray( global.document.querySelectorAll(selector) );
        y9.fn.getEls = function() { return els; };
        y9.fn.setEls = function(value) {
          els = value;
        };
      };
    })(),
    // 프로토타입 객체 확장 메소드
    'extend': function(o) {
      y9.extend(y9.fn, o);
    }
  };

  // y9 생성자 함수의 프로토타입(원형) 객체 확장(능력 설정)
  y9.fn.extend({
    // parent 찾기
    'parent': function() {
      var _this = this;
      var els = _this.getEls();
      var parents = [];
      y9.each(els, function(el, idx) {
        parents.push( el.parentNode );
      });
      _this.setEls( parents );
      return this;
    },

    'hasClass': function() {

    },

    'addClass': (function(){
      var _addClass;
      if ( 'classList' in HTMLElement.prototype ) {
        _addClass = function(class_name) {
          var _this = this;
          y9.each(_this.getEls(), function(el, idx) {
            if (!el.classList.contains(class_name)) {
              el.classList.add(class_name);
            }
          });
          return _this;
        };
      } else {
        _addClass = function(class_name) {
          var _this = this;
          y9.each(_this.getEls(), function(el, idx) {
            if ( !_this.hasClass(class_name) ) {
              var pre_class_value = el.getAttribute('class') || '';
              el.setAttribute('class', (pre_class_value + ' ' + class_name).trim());
            }
          });
          return _this;
        };
      }
      return _addClass;
    })()
    // 'find':
    // 'eq':
    // 'each':
    // 'on':
    // 'off':
    // 'css':
    // 'attr':
    // 'prop':
    // 'prepend':
  });

  // 생성자 함수를 외부에 공개
  global.y9 = y9;
  // 별칭 설정
  global.$$ = y9;

})(this);