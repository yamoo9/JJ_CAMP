/*! 02-negative-for-state.js © yamoo9.net, 2016 */

// <body> 요소 내부에서 클래스 속성 값이 page-slogan인 요소를 찾아라.
// var body = document.getElementsByTagName('body')[0]; // <body>, [body]
// Legacy DOM, DOM Lv0
var body = document.body;
var all_els_in_body = body.getElementsByTagName('*');
// console.log(all_els_in_body);
var len = all_els_in_body.length;
var el = null;
var page_slogan;
// console.log(len); // 8 | 7, 6, 5, 4, 3, 2, 1, 0
// 데모: 변위 값을 감소하는 형태로 for문을 사용하여 문서 객체를 찾아라.
for(; len--;) {
  el = all_els_in_body[len];
  // DOM Lv0
  // el.className
  // console.log(el.className);
  // DOM Lv1
  // el.getAttribute('class')
  if ( el.className === 'page-slogan' ) {
    page_slogan = el;
    // delete len; // 전역 변수는 지울 수 없다.
    len = null;
    break;
  }
}
// 최종 결과
console.log(page_slogan, len);

// len 변수는 목적을 다했으니... 사라져야...
// len에 담기 정보 값을 비울 수 있는가?

// 전역 변수를 사용하면 안되는 이유!
// 1. 여러 사람이 작업하다 보니, 코드 오류 발생 가능성이 크다.
// 2. 더 이상 필요 없는 메모리의 찌꺼기를 제거할 수 없다.
//
// 전역 변수는 최대한, 가급적 만들지 말아라!
// 우리에게 필요한 것은 함수!!!!
// 전역 공간(Global Scope)과 구분되는 지역 공간(Local Scope)을 생성해서 사용하라!
