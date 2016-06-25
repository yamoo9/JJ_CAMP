/*! 03-using-css-selector.js © yamoo9.net, 2016 */

/**
 * 요소 선택자(Type Selector): E
 * 자손 선택자: E(P) E(C)
 * 자식 선택자: E(P) > E(C)
 * 전체 선택자: E *
 * ID 선택자: #id-name
 * class 선택자: .class-name
 * 인접 형제 선택자: E + E
 * 일반 형제 선택자: E ~ E
 * 속성 선택자:
 *   [attribute],
 *   [attribute=value]
 *   [attribute^=value]
 *   [attribute$=value]
 *   [attribute~=value]
 *   [attribute*=value]
 * 가상 클래스 선택자
 *   :nth-child()
 *   :nth-last-child()
 *   :nth-of-type()
 *   :nth-last-of-type()
 */

// DOM Selector API (IE 8+, CSS 2.1 / 3)
// - querySelector('css selector') : single element
// - querySelectorAll('css selector') : nodeList

var body               = document.querySelector('body');
var page_header        = document.querySelector('#page-header');
var page_slogan        = page_header.querySelector('.page-slogan');
var ul_lis             = page_header.querySelectorAll('ul li'); // 복수 선택하여 nodeList 반환

// CSS3 선택자를 사용하여 리스트 끝에서 3번째 위치한 요소를 찾았다. 기존 방법 대비 참 쉽다.
var ul_list_last_item3 = page_header.querySelector('ul li:nth-last-child(3)');

// console.log(ul_list_last_item3);

// --------------------------------------------
// 새로운 쿼리 셀렉터 API가 좋은 이유!
// 과거에는 찾기 힘들었던 문서 객체를 매우 빠르고 쉽게 찾아준다.
// document.querySelector('a[href^="http://"][target="_blank"]')
// --------------------------------------------

// --------------------------------------------
// 자바스크립트 객체 접근 방법
// 1. 객체.속성
// 2. 객체['속성']
// --------------------------------------------

/**
 * --------------------------------
 * DOM 탐색(Traversal)
 * 가계도와 흡사
 * ----------------------------- */
// 부모
// |
// 자식 - 자식 - 자식
//  |
//  자식 - 자식 - 자식
//         |
//         자식

// --------------------------------------------
// 과거 자바스크립트 코드에서 탐색을 사용하지 못했던 이유!
// 요소가 아닌, 노드도 포함해서 함께 찾았기 때문이다.
// --------------------------------------------

// document.documentElement.childNodes
// [<!-- this is comment. -->, <head>​…​</head>​, #text, <body>​…​</body>​]


// 탐색 시작!! ul_list_last_item3 (ElementNode, AttributeNode, TextNode, CommentNode, DoctypeNode, ...)
// 부모 찾기

// <html> 문서 객체 요소에 접근(선택)하여 모든 자식 노드를 찾아
// 그 중, 요소 노드(nodeType === 1)를 선별하여
// 새로운 변수(데이터 유형: 배열)에 담아서 처리

// 변수 선언
var html, filtered_elem_collection = []; // Array 리터럴
// <html> 요소를 변수 html에 참조(reference)
html = document.documentElement;
// <html> 요소의 자식노드에 접근(탐색)
// DOM 탐색 API: .childNodes

// for문을 사용하여 수집된 노드를 순환 원하는 코드 처리
for ( var child_el, l=html.childNodes.length-1; l > -1; l-- ) {
  child_el = html.childNodes[l]; // [comment, <head>, #text, <body>]
  // 주석노드 유형은 nodeType 값이 8
  // 요소노드 유형은 nodeType 값이 1
  // 텍스트노드 유형은 nodeType 값이 3
  // 참고 URL: http://www.w3schools.com/jsref/prop_node_nodetype.asp
  if ( child_el.nodeType === 1 ) {
    // console.log(child_el);
    // 배열 유형의 filtered_elem_collection 변수에 필터링 된 문서 요소(노드)객체를 수집
    filtered_elem_collection.push(child_el);
  }
}

// console.log(filtered_elem_collection);

// 유사 배열이 아니라, 자바스크립트 배열이기 때문에 배열 메소드 사용 가능
// filtered_elem_collection.pop();

// console.log(filtered_elem_collection);

var head = html.children[0];
var body = html.children[1];

// console.log(head, body);

/**
 * --------------------------------
 * .firstElementChild를 대체할 수 있나?
 * .children[0]
 * ----------------------------- */

// 사용자의 브라우저에게 물어본다 (check feature)
// console.log(!!html.firstElementChild);
// firstElementChild를 지원하지 않는다면..
// if ( !html.firstElementChild ) {
//   console.log('firstElementChild를 지원하지 않는다.');
//   // 특정 요소에서 자식요소노드를 수집(.children)
//   // 그 중에서 첫번째 원소에 접근 반환한다. (.children[0])
// } else {
//   console.log('firstElementChild를 지원한다.');
// }

// 조건문, 3항식을 사용해서 조건문을 완성해보세요.
// var result;
// if (window.jQuery) {
//   result = 'jQuery 존재';
// } else {
//   result = 'jQuery 존재 X';
// }

var result = window.jQuery ? 'jQuery 존재' : 'jQuery 존재 X';

// console.log(result);

var check_feature_firstElementChild = html.firstElementChild ?
  'firstElementChild를 지원한다.' :
  'firstElementChild를 지원하지 않는다.';

document.write('<p>'+ check_feature_firstElementChild +'</p>');


// 3항식을 연달아 사용할 수 있나?

// 조건 A ? 참 : 조건 B : 참 ? 조건 C : 참 : 거짓;

var using_js_lib_frameworks =
  window.jQuery ?
    'OK! jQuery 지원' :
    window.Dojo ?
      'OK! Dojo 지원' :
      window.angular ?
        'OK! Angular 지원' :
        '현재 문서는 아무런 JS 라이브러리/프레임워크를 지원하지 않는다.';

console.log(using_js_lib_frameworks);

