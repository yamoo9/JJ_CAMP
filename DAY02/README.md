###### Fast Campus

## [JavaScript & jQuery 정복 CAMP](http://www.fastcampus.co.kr/dev_camp_jst/)

# DAY02

### JavaScript 시작하기 & 핵심 정복기

문서객체모델(DOM) : 선택/탐색

-

### 지난 수업에서 공부한 내용 복습!

[JJ_CAMP__TEST 2016/06/25](http://goo.gl/forms/u60TM0kP925b9s9O2)

-

### 문서객체모델(DOM) **선택/탐색**

- 문서 객체 선택
  - 요소 이름
  - 식별자
  - CSS 선택자

#### 요소노드 이름으로 대상 선택

```js
// <p> 요소 선택
var my_paras = document.getElementsByTagName('p');
// <li> 요소 선택
var my_lis = document.getElementsByTagName('li');

// 콘솔(console) 객체에 기록(log)
console.log(my_paras);      // <p> (X) [<p>] (o)
console.log(my_lis);        // <li> (X) [<li>,<li>,<li>] (o)
console.log(my_lis.length); // 수집(HTMLCollection)한 요소의 총 개수를 반환(return)
```

#### 식별자로 요소노드 대상 선택

```js
// 식별자로 문서 객체를 선택

// ------------------------------------------------------------
// id 속성 값 page-header를 가진 요소를 찾아보세요.
// ------------------------------------------------------------

// 변수 선언
var page_header;

// 선언된 변수 page_header에 값을 할당 (값: 문서 객체)
page_header = document.getElementById('page-header');

// 할당된 변수 page_header 콘솔에 기록
console.log(page_header);

// ------------------------------------------------------------
// class 속성 page-slogan 값을 가진 요소를 찾아보세요.
// ------------------------------------------------------------

// 변수 선언
var page_slogan;

// 선언된 변수에 값을 할당(대입)
// page_slogan = document.getElementsByClassName('page-slogan');

console.log(page_slogan); // [ElementNode, ElementNode, ElementNode] NodeList

// IE 6-8 사용할 수 없다. IE 9+
// 참고 URL: http://caniuse.com/#search=getElementsByClassName
```

##### IE 6-8에서 class 속성 식별자로 대상 요소노드를 선택하려면?

문서에서 모든 객체를 찾아 일일이 확인해야 하는 수고가 든다.

```js
// [과정 1] 문서에서 모든 요소노드를 찾는다.
// <element class="page-slogan"></element>
var all_elems = document.getElementsByTagName('*');

// [과정 1.1] 찾은 모든 요소노드를 콘솔에 기록한다.
console.log(all_elems);

// [잠깐! 기초 확인!!] Javascript 반복문
// for, for ~ in, forEach
// while, do ~ while

// [잠깐! 기초 확인!!] var 키워드를 한 번만 사용하는 패턴
// var singleton 패턴
var i = 0,
    l = all_elems.length,
    elem,
    elem_class_name,
    page_slogan;

// [과정 2] 수집된 모든 문서 요소노드를 반복하는 구문을 작성한다.
for( ; i<l; i++ ) {

  // [과정 2.1] 현재 순회 중인 요소노드를 변수 elem에 참조한다. (반복할 때 마다 바뀜)
  elem = all_elems[i];

  // [과정 2.2] 변수 elem에 참조된 요소노드로부터 class 속성 값을 가져와 변수에 참조한다.
  // Attribute vs Property
  elem_class_name = elem.getAttribute('class');
  console.log(elem_class_name);

  // [잠깐! 기초 확인!!] 연산자
  // 비교 연산 (===, !==, >, <, >=, <=)

  // [잠깐! 기초 확인!!] 조건문 if문을 사용해보자.
  if (elem_class_name === 'page-slogan') {
    // 최종적으로는 page_slogan 변수에 찾은 대상을 참조
    // page_slogan = ???;
    page_slogan = elem;
    // 조건이 true라면 반복문을 종료/스킵(다음 반복 단계로) (break, continue)
    break;
  }
  console.log('for문 내부에서의 i: ', i); // 0,1,2,3,...,13
}

console.log('for문 밖에서의 i: ', i); // ????

console.log(page_slogan);
```

##### 응용편. 감소(-) 형태로 for문 사용하기

```js
// <body> 요소 내부에서 클래스 속성 값이 page-slogan인 요소를 찾아라.
// var body = document.getElementsByTagName('body')[0]; // <body>, [body]
// Legacy DOM, DOM Lv0
var body = document.body;
var all_els_in_body = body.getElementsByTagName('*');
console.log(all_els_in_body);

var len = all_els_in_body.length;
var el = null;
var page_slogan;
console.log(len); // 8 | 7, 6, 5, 4, 3, 2, 1, 0

// 응용: 변위 값을 감소하는 형태로 for문을 사용하여 문서 객체를 찾아라.
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
```

###### 반복 구문에서 사용한 후, 더 이상 불필요한 변수는 메모리에서 어떻게 될까?

len 변수는 목적을 다했으니... 사라져야...<br>
len에 담기 정보 값을 비울 수 있는가?

**전역 변수를 사용하면 안되는 이유!**

1. 여러 사람이 작업하다 보니, 코드 오류 발생 가능성이 크다.
1. 더 이상 필요 없는 메모리의 찌꺼기를 제거할 수 없다.

전역 변수는 최대한, 가급적 만들지 말아라!<br>
우리에게 필요한 것은 함수!!!!<br>
전역 공간(Global Scope)과 구분되는 지역 공간(Local Scope)을 생성해서 사용하라!

#### CSS 선택자로 문서 요소노드 대상 선택

```js
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

var body        = document.querySelector('body');
var page_header = document.querySelector('#page-header');
var page_slogan = page_header.querySelector('.page-slogan');
var ul_lis      = page_header.querySelectorAll('ul li'); // 복수 선택하여 nodeList 반환

// CSS3 선택자를 사용하여 리스트 끝에서 3번째 위치한 요소를 찾았다. 기존 방법 대비 참 쉽다.
var ul_list_last_item3 = page_header.querySelector('ul li:nth-last-child(3)');

console.log(ul_list_last_item3);

// --------------------------------------------------------------
// 새로운 쿼리 셀렉터 API가 좋은 이유!
// 과거에는 찾기 힘들었던 문서 객체를 매우 빠르고 쉽게 찾아준다.
// document.querySelector('a[href^="http://"][target="_blank"]')
// --------------------------------------------------------------
```

---

- 문서 객체 탐색
  - 부모 찾기
  - 형제 찾기
  - 자손 찾기
  - 자식 찾기

![DOM_Traversal](../Assets/DOM_Traversal.png)

```js
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
```

-

### 기타/참고

- [CSS 선택자 브라우저 호환 표](kimblim.dk/css-tests/selectors/)
- [JavaScript nodeType 유형](http://www.w3schools.com/jsref/prop_node_nodetype.asp)
