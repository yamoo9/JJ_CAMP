/*! dom_helper.js © yamoo9.net, 2016 */

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
/** @function isTextNode() */
function isTextNode(node) {
  if (!node) { return false; }
  return node.nodeType === 3;
}
/** @function isDocument() */
function isDocument(node) {
  return node.nodeType === 9;
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
/** @function detectFeature() */
function detectFeature(property) {
  validate( !isString(property), '첫번째 인자는 문자 유형이어야 합니다.' );
  return property in detectFeature.style;
}
// 메모이제이션 패턴
detectFeature.style = document.createElement('div').style;

// -----------------------------
// 함수 표현식 + 클로저
// IIFE 패턴 (즉시 실행하는 함수)
var detectFeatures = (function(){
  // 외부와 단절된 독립된 공간이 형성
  // 지역(Local Scope)
  var el           = null;
  var property     = null;
  var root_element = document.documentElement; // <html>
  function success(){ el.classList.add(property); }
  function fail(){ el.classList.add('no-' + property); }
  // 클로저 함수
  function _detectFetures(properties, element) {
    // 한 줄(인라인)로 코드를 작성하는 것을 선호하는 사람들
    el = ((element && isElement(element)) && element) || root_element;
    // 정석대로 조건 구문을 사용한다면 아래처럼_
    // if ( element && isElement(element) ) {
    //   el = element;
    // } else {
    //   el = root_element;
    // }

    validate( !isArray(properties), 'properties는 배열 유형이어야 합니다.' );
    for( var i=properties.length; properties[--i]; ) {
      property = properties[i];
      isValidate( detectFeature(property), success, fail );
    }
  }
  // 클로저 함수 반환
  return _detectFetures;
}());

// -----------------------------
// 함수 선언식 + 메모이제이션 패턴
// function detectFeatures(properties, element) {
//   detectFeatures.element = ((element && isElement(element)) && element) || detectFeatures.root_element;
//   validate( !isArray(properties), 'properties는 배열 유형이어야 합니다.' );
//   for( var property, i=properties.length; (property = properties[--i]); ) {
//     detectFeatures.property = property;
//     isValidate( detectFeature(property), detectFeatures.success, detectFeatures.fail );
//   }
// }
// detectFeatures.element = null;
// detectFeatures.property = null;
// detectFeatures.root_element = document.documentElement; // <html>
// detectFeatures.success = function(){
//   detectFeatures.element.classList.add(detectFeatures.property);
// };
// detectFeatures.fail = function(){
//   detectFeatures.element.classList.add('no-' + detectFeatures.property);
// };


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


/**
 * --------------------------------
 * DOM API: Creation
 * ----------------------------- */

/** @function createEl() */
function createEl(node_name, properties, contents) {
  validate(!isString(node_name) && !isObject(node_name), 'node_name 전달인자는 문자열 이어야 합니다.');
  validate(properties && !isObject(properties), 'properties는 객체 유형이 전달되어야 합니다.');
  // isObject(node_name) 결과가 객체인 경우
  // 옵션 객체가 된다.
  var created_el, created_text;
  if ( isObject(node_name) && isString(node_name.element) ) {
    created_el = document.createElement(node_name.element);
    node_name.attr && attrs(created_el, node_name.attr);
    // node_name.text && created_el.appendChild(createText(node_name.text));
    node_name.text && append(created_el, createText(node_name.text));
    // 메소드 빌려쓰기 패턴 .call()
    // Function.prototype.call 메소드는 함수 객체라면 누구나 사용 가능!!
    node_name.finish && isFunction(node_name.finish) && node_name.finish.call(created_el);
  } else {
    // 인자를 하나 하나 받은 경우
    // 요소노드 생성
    created_el = document.createElement(node_name);
    // 속성 설정
    properties && attrs(created_el, properties);
    // 콘텐츠 추가 설정
    if (contents) {
      created_text = createText(contents);
      // append(created_el, created_text);
      appendTo(created_text, created_el);
      // created_el.appendChild(created_text);
    }
  }

  return created_el;
}
/** @function createText() */
function createText(content) {
  validate(!isString(content), '텍스트노드를 생성하기 위한 문자열을 입력하여야 합니다.');
  return document.createTextNode(content);
}


/**
 * --------------------------------
 * DOM API: Manipulation
 * ----------------------------- */

/** @function attrs() */
function attrs(element, properties) {
  validate(!isElement(element), 'element는 요소노드여야 합니다.');
  validate(!isObject(properties), 'properties는 객체 유형이어야 합니다.');
  if (isEmptyObject(properties)) { console.info('설정할 속성이 존재하지 않습니다.'); return; }
  // 객체 순환
  for ( var prop in properties) {
    if ( properties.hasOwnProperty(prop) ) {
      var value = properties[prop];
      element.setAttribute(prop, value);
    }
  }
}

/** @function append() */
function append(parent_node, child_node) {
  validate(!isElement(parent_node), '부모노드는 요소노드를 전달해야 합니다.');
  validate(!isElement(child_node) && !isTextNode(child_node), '자식노드는 요소노드, 또는 텍스트노드를 전달해야 합니다.');
  // 부모노드.appendChild(자식노드)
  parent_node.appendChild(child_node);
}

/** @function appendTo() */
function appendTo(child_node, parent_node) {
  append(parent_node, child_node);
}