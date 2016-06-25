/*! 01-about-DOM.js © yamoo9.net, 2016 */

/**
 * 문서의 객체를 선택
 * - 요소의 이름으로 선택
 */

// <p> 요소 선택
var my_paras = document.getElementsByTagName('p');
// <li> 요소 선택
var my_lis = document.getElementsByTagName('li');

// 콘솔(console) 객체에 기록(log)
// console.log(my_paras);      // <p> (X) [<p>] (o)
// console.log(my_lis);        // <li> (X) [<li>,<li>,<li>] (o)
// console.log(my_lis.length); // 수집(HTMLCollection)한 요소의 총 개수를 반환(return)

// 식별자로 문서 객체를 선택
// id 속성 값 page-header를 가진 요소를 찾아보세요.
var page_header; // 변수 선언
// 선언된 변수 page_header에 값을 할당 (값: 문서 객체)
page_header = document.getElementById('page-header');

// 할당된 변수 page_header 콘솔에 기록
// console.log(page_header);

// class 속성 page-slogan 값을 가진 요소
// var page_slogan; // 변수 선언

// 선언된 변수에 값을 할당(대입)
// page_slogan = document.getElementsByClassName('page-slogan');

// console.log(page_slogan); // [ElementNode, ElementNode, ElementNode] NodeList

// IE 6-8 사용할 수 없다.
// 참고 URL: http://caniuse.com/#search=getElementsByClassName

// 과정 1.
// <element class="page-slogan"></element>
var all_elems = document.getElementsByTagName('*');

// console.log(all_elems);

// Javascript 반복문
// for, for ~ in, forEach
// while, do ~ while

// var 키워드를 한 번만 사용하는 패턴
// var singleton 패턴
var i = 0,
    l = all_elems.length,
    elem,
    elem_class_name,
    page_slogan;

for( ; i<l; i++ ) {
  elem = all_elems[i];
  elem_class_name = elem.getAttribute('class'); // Attribute vs Property
  // console.log(elem_class_name);
  // 비교 연산 (===, !==, >, <, >=, <=)
  // 조건문 if문을 사용해보자.
  if (elem_class_name === 'page-slogan') {
    // 최종적으로는 page_slogan 변수에 찾은 대상을 참조
    // page_slogan = ???;
    page_slogan = elem;
    // 조건이 true라면 반복문을 종료/스킵(다음 반복 단계로) (break, continue)
    break;
  }
  // console.log('for문 내부에서의 i: ', i); // 0,1,2,3,...,13
}

// console.log('for문 밖에서의 i: ', i); // ????

console.log(page_slogan);