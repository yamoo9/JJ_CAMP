/**
 * --------------------------------
 * Utility Helper Functions
 * ----------------------------- */
/** @function validate() */
// 조건 확인 후, 조건이 참이면 오류 메시지를 띄움과 동시에 코드를 정지시킴.
function validate(condition, error_message) {
  if (condition) { throw new Error(error_message); }
}
/** @function isValidate() */
function isValidate(condition, excute) {
  // 사용자가 excute 인자를 전달했고, 그 인자가 함수 유형이라면
  // excute 함수를 실행하라.
  if ( condition && excute && typeof excute === 'function' ) { excute(); }
  return condition ? true : false;
}

/**
 * --------------------------------
 * DOM API: Selection
 * ----------------------------- */

/** @function id() */
function id(name) {
  // 타입 검증
  validate(typeof name !== 'string', '전달된 인자는 문자 유형이어야만 합니다.');
  return document.getElementById(name);
}

/** @function tag() */
function tag(name, context) {
  // 타입 검증
  validate(typeof name !== 'string', '전달된 인자는 문자 유형이어야만 합니다.');
  if ( context && context.nodeType !== document.ELEMENT_NODE ) {
    throw new Error('context 객체는 문서 요소 객체여야만 합니다.');
  }
  // 만약 사용자가 context 객체를 전달했고,
  // context 객체는 문서 요소객체라면
  // context를 사용한다.
  // 하지만 context 객체가 없다면
  // 기본값으로 document 객체를 사용한다.
  if( !context ) {
    context = document;
  }
  return context.getElementsByTagName(name);
}

/** @function queryAll() */
function queryAll(selector, context ) {
  // 첫번째 전달인자(Argument)의 유효성 검사
  var _ex = function(){
    console.info('전달인자는 문자열로 전달해야 합니다.');
    return null;
  };

  isValidate(typeof selector !== 'string', _ex)

  // 사용자 정의 값이 없을 경우, 값을 초기화
  context = context || document;
  // if ( !context ) {
  //   context = document;
  // }
  // 두번째 전달인자(Argument)의 유효성 검사
  if ( typeof context === 'string' ) {
    context = query(context);
  }
  validate(
    context.nodeType !== 1 && context.nodeType !== 9,
    '두번째 전달인자는 요소노드여야 합니다.'
  );
  return context.querySelectorAll(selector); // Nodelist []
}

/** @function query() */
function query(selector, context) {
  return queryAll(selector, context)[0];
}