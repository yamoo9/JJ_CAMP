/*! DOM-API.js © yamoo9.net, 2016 */

// BOM
//  - window {}
//    - screen {}
//    - navigator {}
//    - history {}
//    - location {}
//    - document {}

// DOM: Document Object Model
// API: Application Programming Interface

// Level 0 (Legacy DOM)
// 문서객체에 대한 제한적 접근:
// console.log('문서에 존재하는 객체: 하이퍼링크',document.links);
// console.log('문서에 존재하는 객체: 네임드앵커',document.anchors);
// console.log('문서에 존재하는 객체: 이미지',document.images);
// console.log('문서에 존재하는 객체: 폼',document.forms[0]);
// console.log('문서에 존재하는 객체: 폼 컨트롤',document.forms[0].elements[1]);

// 과도기 DOM
// 문서의 모든 객체에 접근, CSS 속성을 조작할 수 있는 API를 각 회사가 제공.
// NN: document.layers (현재 사용 X)
// IE: document.all

// DOM Level 1 시대
// 화합: W3C 주관 양대 회사가 공통 API를 제작.
// document.getElementById('id-name');
// document.getElementsByName()
// document.getElementsByTagName('tag');

// DOM Level 2 시대
// 불협화음: 각기 다른 방식으로 발전된 진보 이벤트 모델
// W3C: .addEventListener()    표준, IE 9+
// W3C: .removeEventListener() 표준, IE 9+
// MS: .attachEvent()          비표준
// MS: .detachEvent()          비표준

/**
 * --------------------------------
 * DOM: Node Interface
 * ----------------------------- */

function initial() {
  // DOM Legacy 과거의 방식
  var html = document.documentElement;
  var head = document.head;
  var body = document.body;
  console.log(html); // <html> Document Object
  console.log(head); // <head>
  console.log(body); // <body>
  body.className = 'dom-legacy-method';
  // DOM Lv1 방식
  html = document.getElementsByTagName('html').item(0); // [<html>] -> <html>
  head = document.getElementsByTagName('head').item(0); // [<head>] -> <head>
  body = document.getElementsByTagName('body')[0];      // [<body>] -> <body>
  console.log(html); // [<html>] Nodelist, 유사 배열(Object like Array)
  console.log(head); // [<head>]
  console.log(body); // [<body>]
  // ※ Nodelist의 경우 DOM API를 바로 사용할 수 없다.
  //   Nodelist에서 Document Object를 빼내야 적용 가능하다.
  body.setAttribute('class', 'dom-modern-method');
}

// 코드의 실행 시점을 늦춘다.
window.onload = initial; // 창의 로드 이벤트 발생 시, 함수 실행
// 진보 이벤트 모델
// DOMContentLoaded 이벤트 (이미지 로드와 상관 없이 이벤트 발생)
window.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded');
}, false);


/**
 * --------------------------------
 * 문서 노드(Node)에 접근
 * 요소 노드
 * 텍스트 노드 (빈 공백, 들여쓰기, 탭..)
 * ----------------------------- */
var target_node = document.getElementsByTagName('h3').item(1);
// console.log('target_node의 정체:', Object.prototype.toString.call(target_node));
console.log('target_node:', target_node);

var target_node_first_child;
var target_node_last_child;

target_node_first_child = target_node.firstChild;
target_node_last_child = target_node.lastChild;

console.log('target_node_first_child:', target_node_first_child);
console.log('target_node_last_child:', target_node_last_child);
