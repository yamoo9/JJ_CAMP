/*!
 * dom-helper.js © yamoo9.net, 2016
 * --------------------------------
 * 선택, 탐색 헬퍼 함수
 */

/**
 * --------------------------------
 * 예전엔 사용하던 헬퍼 함수
 * ----------------------------- */
function idEl(id_name) {
  // 유효성 검사(Argument Validation)
  if ( typeof id_name !== 'string' ) {
    throw new Error('전달된 인자는 id 이름(문자열) 유형이 아닙니다.');
  }
  return document.getElementById(id_name);
}

function tagEl(tag_name, context) {
  // 유효성 검사(Argument Validation)
  if ( typeof tag_name !== 'string' ) {
    throw new Error('전달된 인자는 요소의 이름(문자열) 유형이 아닙니다.');
  }

  // if (!context) {
  //   context = document;
  // }

  return (context || document).getElementsByTagName(tag_name);
}

function classEl(class_name) {
  // 객체 판별법
  // 최신 브라우저인지 아닌지 브라우저에게 물어보아서 조건에 따라 분기하는 방법
  if (!document.getElementsByClassName) {
    // 신형 방식
    return document.getElementsByClassName(class_name);
  } else {
    // 구형 방식
    // 문서에서 모든 요소를 가져와야 해요
    var els_collection = [],
        all_elements = document.body.getElementsByTagName('*');
    // 순회
    for(var el, i=0, l=all_elements.length; i<l; i++) {
      el = all_elements[i];
      if ( el.getAttribute('class') === class_name ) {
        els_collection.push(el);
      }
    }
    return els_collection;
  }
}









/**
 * CSS 선택자로 문서에서 대상(요소노드)을 찾는 헬퍼함수
 *
 * @method $query
 *
 * @작성자    yamoo9
 * @버전     0.0.1
 * @param  {string}  selector CSS 선택자
 * @return {ElementNode}  요소노드
 */
// 복수(1개 이상), 반환 값이 노드리스트
function $queryAll(selector, context) {
  // 유효성 검사(Argument Validation)
  if ( typeof selector !== 'string' ) {
    throw new Error('전달된 인자는 선택자(문자열) 유형이 아닙니다.');
  }
  // 컨텍스트 객체가 존재하지 않는다면...
  if (!context) {
    // 컨텍스트 참조 변수에 document 객체를 참조한다.
    context = document;
  } else {
    // 컨텍스트 객체가 존재한다면...
    // 경우 2. CSS 선택자인 경우
    if ( !context.nodeType && typeof context === 'string' ) {
      context = $query(context);
    }
    // 경우 1. DOM 객체인 경우 (넘어감)
  }
  return context.querySelectorAll(selector);
}

// 단수(1개, 첫번째 매칭 요소)
function $query(selector, context) {
  return $queryAll(selector, context)[0];
}


// 별칭(Alias) 설정: $query, $q
var $q = $query;
// var $qa = $queryAll;