/*! DOM-Helper.js © yamoo9.net, 2016 */

// JS 엄격한 모드로 동작
// "use strict";

// 데이터 유형을 체크하는 헬퍼 함수
function checkData(data, type, err_msg) {
  // 오류 메시지 초기화
  err_msg = err_msg || '전달된 '+ data +' 인자는 요구되는 '+ type +' 데이터 유형이 아니라서 오류가 발생했습니다.';
  // 데이터 유형 검사
  if ( !data || !type ) {
    throw new Error('2개의 필수 전달인자 중 하나가 전달되지 않았습니다. 확인해주세요.');
  }
  if ( typeof type !== 'string' ) {
    throw new Error('2번째 필수 인자는 체크 할 자바스크립트 데이터 유형을 문자열로 전달해야 합니다.');
  }
  if ( typeof data !== type ) {
    throw new Error(err_msg);
  }
}

// document.getElementById()
// 헬퍼 $idEl()
function $idEl(id_name) {
  checkData(id_name, 'string', 'id 문자열을 전달해야 합니다.');
  // 유효성 검사
  // if ( !id_name || typeof id_name !== 'string' ) {
    // throw new Error('id 문자열을 전달해야 합니다.');
    // 콘솔 패널에 오류(Error)를 출력
    // console.error();
    // 함수 종료
    // return;
  // }
  return document.getElementById(id_name);
}
// $tagEl(tag_name, context)
function $tagEl(tag_name, context) {
  // STEP 1 유효성 검사
  if ( !tag_name || typeof tag_name !== 'string' ) {
    throw new Error('tag_name 문자열을 전달해야 합니다.');
  }
  // STEP 2 찾은 요소노드 대상을 반환
  // if (!context) { context = document; }
  // return context.getElementsByTagName(tag_name);
  return (context || document).getElementsByTagName(tag_name);
}

// $classEl()
// $query()
// $queryAll()