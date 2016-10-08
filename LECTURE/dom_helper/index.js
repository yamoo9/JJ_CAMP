/** @function queryAll() */
function queryAll(selector, context ) {
  // 첫번째 전달인자(Argument)의 유효성 검사
  if ( typeof selector !== 'string' ) {
    console.info('전달인자는 문자열로 전달해야 합니다.');
    return null;
  }
  // 사용자 정의 값이 없을 경우, 값을 초기화
  context = context || document;
  // if ( !context ) {
  //   context = document;
  // }
  // 두번째 전달인자(Argument)의 유효성 검사
  if ( typeof context === 'string' ) {
    context = query(context);
  }
  if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
    throw new Error('두번째 전달인자는 요소노드여야 합니다.');
    // console.error('두번째 전달인자는 요소노드여야 합니다.');
    // return;
  }
  return context.querySelectorAll(selector); // Nodelist []
}

/** @function query() */
function query(selector, context) {
  return queryAll(selector, context)[0];
}