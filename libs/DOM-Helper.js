/*! DOM-Helper.js © yamoo9.net, 2016 */

// JS 엄격한 모드로 동작
// "use strict";

// ----------------------------------------------------------------------------

// 데이터 유형을 체크하는 헬퍼 함수
// [필수 전달인자] data
// [필수 전달인자] type ※ 문자열 데이터 유형만 가능!
// [선택 전달인자] err_msg
function validateData(data, type, err_msg) {
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

// ----------------------------------------------------------------------------
// 전달된 데이터의 노드 유형이 요소노드인지 확인하는 함수
function isElNode(node) {
  return node.nodeType === 1;
}

// ----------------------------------------------------------------------------
// 전달된 message를 사용하여 오류 메시지를 출력하고, 코드를 멈추는 함수
function checkError(message) {
  validateData(message, 'string');
  throw new Error(message);
}

// ----------------------------------------------------------------------------

// .getElementById()
// ↑ 헬퍼 $idEl()
function $idEl(id_name) {
  validateData(id_name, 'string', 'id 문자열을 전달해야 합니다.');
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

// ----------------------------------------------------------------------------

// .getElementsByTagName()
// ↑ 헬퍼 $tagEl(tag_name, context)
function $tagEl(tag_name, context) {
  // STEP 1 유효성 검사
  validateData(tag_name, 'string', 'tag_name 문자열을 전달해야 합니다.');
  // if ( !tag_name || typeof tag_name !== 'string' ) {
  //   throw new Error('tag_name 문자열을 전달해야 합니다.');
  // }
  // STEP 2 찾은 요소노드 대상을 반환
  // if (!context) { context = document; }
  // return context.getElementsByTagName(tag_name);
  return (context || document).getElementsByTagName(tag_name);
}

// ----------------------------------------------------------------------------

// .getElementsByClassName() IE 9+
// ↑ 헬퍼 $classEl()
function $classEl(class_name, context) {
  // 자바스크립트 호이스트(Hoist, 끌어올리다)
  var all_els, filtered_els = [];
  // 조건 1 IE 9+ 처리
  if ( !document.getElementsByClassName ) {
    return (context || document).getElementsByClassName(class_name);
  }
  // 조건 2 IE 8- 경우 처리
  else {
    all_els = (context || document.body).getElementsByTagName('*');
    // 반복문 (수집된 DOM 객체를 순환)
    for ( var el, i=0, l=all_els.length; i<l; i++ ) {
      el = all_els[i]; // console.log(el);
      // 조건 class 속성을 포함하고 있는지 확인
      // console.log(!!el.hasClass);
      var check_class_name = new RegExp('(\\s|^)' + class_name + '(\\s|$)');
      if( check_class_name.test( el.getAttribute('class') ) ) {
        // 조건문이 참이면 아래 코드 수행
        filtered_els.push(el);
      }
    }
    return filtered_els;
  }
  // console.log(filtered_els); // 배열
}

// ----------------------------------------------------------------------------

// .querySelectorAll()
// ↑ 헬퍼 $queryAll(selector, context)
function $queryAll(selector, context) {
  // STEP 1 유효성 검사
  validateData(selector, 'string');
  // STEP 2 찾은 요소노드 대상을 반환
  // context 조건 확인
  if ( typeof context === 'string' ) {
    context = $query(context);
  }
  return (context || document).querySelectorAll(selector);
}

// ----------------------------------------------------------------------------

// .querySelector()
// ↑ 헬퍼 $query()
function $query(selector) {
  return $queryAll(selector)[0];
}

// ----------------------------------------------------------------------------

// 요소를 생성하는 헬퍼 함수

// Native Code
// var new_el = document.createElement('div');
// document.body.appendChild(new_el);

// Helper Function
function $createEl(el_name, parent_el, text) {
  // 유효성 검사
  validateData(el_name, 'string');
  // 요소노드 생성
  var _el = document.createElement(el_name);
  // 조건 1. parent_el 가 있을 경우, 기존 코드 수행
  if ( parent_el ) {
    // 요소 노드인가?
    if ( isElNode(parent_el) ) {
      parent_el.appendChild(_el);
    } else {
      checkError('전달인자는 요소노드가 아닙니다. 이를 확인해주세요.');
    }
  }
  // A && B 코드는 A 값이 true 일 때 B 코드가 실행되는 조건문이다.
  // B 코드에서는 3항식을 사용하여 조건 분기문을 처리할 수 있다.
  // parent_el && isElNode(parent_el) ?
  //                  parent_el.appendChild(_el) :
  //                  checkError('전달인자는 요소노드가 아닙니다. 이를 확인해주세요.');

  // 조건: text가 있다면
  if (text) {
    $createText(text, _el);
  }

  // 생성된 _el이 참조하는 문서 요소노드를 반환
  return _el;
}

// ----------------------------------------------------------------------------

// 텍스트 노드를 생성하는 헬퍼 함수
function $createText(text, el_node) {
  // 전달인자 유효성 검사
  validateData(text, 'string');
  // 텍스트노드 생성
  var _textnode = document.createTextNode(text);
  // 조건: el_node 가 있다면
  if ( el_node && isElNode(el_node) ) {
    el_node.appendChild(_textnode);
  } else {
    return _textnode;
  }
}