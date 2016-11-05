/*! dom_helper.js © yamoo9.net, 2016 */
// (function(global){

//   // 모듈 인젝션(Injection) 패턴
// })(this, (this.DOM_Helper = this.DOM_Helper || {}) );

// --------------------------------------------------

this.DOM_Helper = (function(global){
  'use strict';

  // 라이브러 정보(Private Data)
  var version = '1.0.0';
  var author  = 'yamoo9';

  // ------------------------------------------------------

  /**
   * --------------------------------
   * Utility Helper Functions
   * ----------------------------- */

  /** @function cLog  사용자 정의 CSS 스타일을 가미한 console.log() 헬퍼 */
  function cLog(input, console_style) {
    // 사용자가 전달한 input은 문자열어이야 한다는 것을 검증
    validate(!isString(input), '문자열을 입력해야 합니다.');
    // 옵션: console_style
    if ( input.indexOf('%c') > -1 ) {
      // 기본 값
      console_style = console_style || cLog.styles;
      console.log(input, console_style);
    } else {
      console.log(input);
    }
  }
  // 초기 설정 값
  cLog.styles = 'color: #fe4940; font-size: 1.2rem;';

  /** @function isDataType() */
  // 자바스크립트의 데이터 유형을 완벽하게 체크함.
  function isDataType(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }
  /** @function isNumber() */
  function isNumber(data) {
    return isDataType(data) === 'number';
  }
  /** @function isString() */
  function isString(data) {
    return isDataType(data) === 'string';
  }
  /** @function isBoolean() */
  function isBoolean(data) {
    return isDataType(data) === 'boolean';
  }
  /** @function isFunction() */
  function isFunction(data) {
    return isDataType(data) === 'function';
  }
  /** @function isArray() */
  function isArray(data) {
    return isDataType(data) === 'array';
  }
  /** @function isObject() */
  function isObject(data) {
    return isDataType(data) === 'object';
  }
  /** @function isEmptyObject() */
  function isEmptyObject(data) {
    // 속성이 존재하는지 확인(검증)
    // 속성이 존재하지 않는다면? 텅 빈 객체
    var prop_legnth = 0;
    for ( var prop in data ) {
      prop_legnth++;
    }
    return isObject(data) && !prop_legnth;
  }
  /** @function isElement() */
  function isElement(node) {
    if (!node) { return false; }
    return node.nodeType === 1;
  }
  /** @function isNodeList() */
  function isNodeList(node) {
    if (!node) {return false;}
    return isDataType(node) === 'nodelist';
  }
  /** @function isTextNode() */
  function isTextNode(node) {
    if (!node) { return false; }
    return node.nodeType === 3;
  }
  /** @function isDocument() */
  function isDocument(node) {
    return node.nodeType === 9;
  }
  /** @function isArguments() */
  function isArguments(obj) {
    return isDataType(obj) === 'arguments';
  }
  /** @function validate() */
  // 조건 확인 후, 조건이 참이면 오류 메시지를 띄움과 동시에 코드를 정지시킴.
  function validate(condition, error_message) {
    if (condition) { throw new Error(error_message); }
  }
  /** @function isValidate() */
  function isValidate(condition, success, fail) {
    // condition 조건이 참이고,
    // 사용자가 success 인자를 전달했고,
    // 그 인자가 함수 유형이라면 success 함수를 실행하라.
    if ( condition && success && isFunction(success) ) { success(); }
    if ( !condition && fail && isFunction(fail) ) { fail(); }
    return condition ? true : false;
  }

  /**
   * --------------------------------
   * DOM API: Selection
   * ----------------------------- */

  /** @function id() */
  function id(name) {
    // 타입 검증
    // validate(typeof name !== 'string', '전달된 인자는 문자 유형이어야만 합니다.');
    validate(!isString(name), '전달된 인자는 문자 유형이어야만 합니다.');
    return document.getElementById(name);
  }

  /** @function tag() */
  function tag(name, context) {
    // 타입 검증
    // validate(typeof name !== 'string', '전달된 인자는 문자 유형이어야만 합니다.');
    validate(!isString(name), '전달된 인자는 문자 유형이어야만 합니다.');
    validate( context && !isElement(context), 'context 객체는 문서 요소 객체여야만 합니다.' );
    // if ( context && context.nodeType !== document.ELEMENT_NODE ) {
    //   throw new Error('context 객체는 문서 요소 객체여야만 합니다.');
    // }
    // 만약 사용자가 context 객체를 전달했고,
    // context 객체는 문서 요소객체라면
    // context를 사용한다.
    // 하지만 context 객체가 없다면
    // 기본값으로 document 객체를 사용한다.
    // if( !context ) {
    //   context = document;
    // }
    return (context || document).getElementsByTagName(name);
  }

  /** @function classEls() */
  // 함수 표현식 + 클로저
  var classEls = (function(){
    var _classEls = null;
    // 즉시 실행되는 함수 내에서 단 한번만 실행
    if ( document.getElementsByClassName ) {
      _classEls = function(name, context) {
        validate(!isString(name), 'name 인자는 문자열이어야 합니다.');
        return ( ((context && isElement(context)) && context) || document).getElementsByClassName(name);
      };
    } else {
      _classEls = function(name, context) {
        validate(!isString(name), 'name 인자는 문자열이어야 합니다.');
        var all_els        = tag('*', ((context && isElement(context)) && context) || document.body);
        var all_els_length = all_els.length;
        var el             = null;
        var class_name     = '';
        var filtered_els   = [];
        // 정규 표현식 사용
        // ^    시작 값을 검증
        // $    끝나는 값을 검증
        // \s   공백을 검증
        // +    1개 이상
        // ※ new RegExp() 사용 시에는 문자열 내부의 \s 사용 시, Escape 처리를 해야 한다.
        var reg            = new RegExp('(^|\\s)+' + name + '(\\s|$)+');
        while(all_els_length--) {
          el = all_els[all_els_length];
          class_name = el.getAttribute('class');
          if( reg.test(class_name) ) {
            filtered_els.push(el);
          }
        }
        return filtered_els;
      };
    }
    return _classEls;
  }());

  /** @function queryAll() */
  function queryAll(selector, context ) {
    // 첫번째 전달인자(Argument)의 유효성 검사
    validate( !isString(selector), '전달인자는 문자열로 전달해야 합니다.' );

    // 사용자 정의 값이 없을 경우, 값을 초기화
    context = (isString(context) ? query(context) : context) || document;
    // if ( !context ) {
    //   context = document;
    // }
    // 두번째 전달인자(Argument)의 유효성 검사
    // if ( isString(context) ) {
    //   context = query(context);
    // }
    validate( !isElement(context) && !isDocument(context), '두번째 전달인자는 요소노드여야 합니다.' );
    return context.querySelectorAll(selector); // Nodelist []
  }

  /** @function query() */
  function query(selector, context) {
    return queryAll(selector, context)[0];
  }

  /** @function makeArray() */
  function makeArray(like_arr_obj) {
    // 배열과 유사한 데이터 arguments, nodeList를
    // 배열로 변경하려면? 어떤 로직이 필요할까요?

    validate (
      !isNodeList(like_arr_obj) && !isArguments(like_arr_obj),
      'nodeList 또는 arguments 객체를 전달해야 합니다.'
    );

    // 방법 1. 복습
    // var converted_array = [];
    // for ( var i=0, l=like_arr_obj.length; i<l; i++ ) {
    //   converted_array.push(like_arr_obj[i]);
    // }
    // return converted_array;

    // 방법 2. 네이티브 배열의 기술을 활용
    // return Array.prototype.slice.call(like_arr_obj, 0);
    return [].slice.call(like_arr_obj, 0);
  }

  /** @function each() */
  function each(data, callback) {
    data = makeArray(data);

    // callback

    // forEach를 사용할 수 있나?
    data.forEach(function() {
      // function.call(this, arguments[0], arguments[1], arguments[2]);
      // function.apply(this, arguments);
      callback.apply(data, arguments);
    });

    // 없다면?? 대체 기술


  }

  // ------------------------------------------------------

  // 클로저 패턴(객체를 반환)
  return {
    'info': {
      'version': version,
      'author': author
    },
    'util': {
      'cLog': cLog,
      'isNumber': isNumber,
      'isString': isString,
      'isBoolean': isBoolean,
      'isFunction': isFunction,
      'isArray': isArray,
      'isObject': isObject,
      'isEmptyObject': isEmptyObject,
      'isElement': isElement,
      'isNodeList': isNodeList,
      'isTextNode': isTextNode,
      'isDocument': isDocument,
      'validate': validate,
      'makeArray': makeArray,
    },
    'id'       : id,
    'tag'      : tag,
    'classEls' : classEls,
    'queryAll' : queryAll,
    'query'    : query,
    'each'     : each,
  };

})(this);