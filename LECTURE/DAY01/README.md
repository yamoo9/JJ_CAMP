###### Fast Campus

## [JavaScript & jQuery 정복 CAMP](http://www.fastcampus.co.kr/dev_camp_jst/)

# DAY01

### 자바스크립트와 문서 객체 모델 & 프론트 엔드 개발

### 자바스크립트를 사용하여 동적으로 코드 생성/추가

```js
/*! fde.js © yamoo9.net, 2016 */

/** @function initialization */
function initialization() {
  // var body = document.getElementsByTagName('body').item(0); // XML DOM 방식
  var body = document.body; // HTML DOM 방식
  // 문서에서 <p> 요소를 찾아 변수에 참조
  // 문서에서 첫번째 <p> 요소를 찾아온다.
  var target_p = document.getElementsByTagName('p').item(0);
  // console.log(target_p);

  // 지연 시켜 호출 할 함수 설정
  window.setTimeout(function() {
    createHeadline('h1', 'JavaScript Log', target_p);
    createHeadline('h2', 'JavaScript Star', target_p);
  }, 2000);

  var list = null;

  window.setTimeout(function() {
    list = createList('ul', 'IOT VR IT');
    collection = createList('ol', 'HTML CSS JavaScript');
    body.appendChild(list);
    var t = body.firstElementChild;
    t.parentNode.insertBefore(collection, t);
  }, 4000);

}

/** @function createHeadline */
function createHeadline(h_lv, content, target) {
  // 유효성 검사
  if( typeof h_lv !== 'string' ) { throw new Error('첫번째 인자는 문자열이어야 한다.'); }
  if( typeof content !== 'string' ) { throw new Error('두번째 인자도 문자열이어야 한다.'); }
  if( target && target.nodeType !== 1 ) { throw new Error('세번째 인자는 요소노드여야 한다.'); }
  // 단계 1.
  // <h1> 요소를 생성하고,
  var headline = document.createElement(h_lv);
  // 텍스트 내용으로 `JavaScript Log` 라고하는 텍스트를 동적으로 생성한다.
  var headline_content = document.createTextNode(content);
  // 생성된 각 노드(Node) 검증
  // console.log('headline:', headline);
  // console.log('headline_content:', headline_content);
  // 각 노드를 합치기(둘 중 하나는 부모 노드, 자식 노드가 되어야 함)

  // 단계 2.
  // DOM API: ~ 자식으로 삽입
  // 부모노드.appendChild(자식노드)
  headline.appendChild(headline_content);
  // 합쳐진 노드 결과 검증
  // console.log('headline:', headline);

  // 단계 3.
  // DOM API: ~ 앞에 삽입
  // 목표노드.부모노드.insertBefore(삽입노드, 목표노드);
  if ( target ) {
    target.parentNode.insertBefore(headline, target);
  }
  return headline;
}

/** @function createList */
function createList(list_type, contents, target) {
  var categories;
  // 유효성 검사
  if ( typeof list_type !== 'string' ) { throw new Error('첫번째 인자는 문자열이어야 합니다.'); }
  /**
   * --------------------------------
   * ul 생성
   * li 생성 x3
   * 콘텐츠 생성 x3
   * li + 콘텐츠 접합 x3
   * ul + li x3 접합
   * ul > target_p 뒤에 삽입
   */

  // <ul>
  //   <li>IOT</li>
  //   <li>VR</li>
  //   <li>IT</li>
  // </ul>
  if ( contents && typeof contents === 'string' ) {
    categories = contents.split(' ');
  }
  if ( contents && contents instanceof Array ) {
    categories = contents;
  }
  if ( target && target.nodeType !== 1 ) { throw new Error('세번째 인자는 요소노드여야 합니다.'); }

  // console.log(categories);

  // Legacy 방법
  // var a = 0, l = categories.length;
  // for( ; a<l; a=a+1 ) {
  //   console.log( categories[a], a );
  // }

  // 크로스 브라우징 이슈: ES5 Shim JS Library
  // Modern 방법

  var list = document.createElement(list_type);

  categories.forEach(function(item, index) {
    // console.log(item, index);
    // <li>item</li>
    var li = document.createElement('li');
    var li_content = document.createTextNode(item);
    li.appendChild(li_content);
    // <list> 요소 내부에 삽입
    list.appendChild(li);
  });

  // console.log(list);
  if ( target ) {
    target.appendChild(list);
  }
  return list;

  // ES2015
  // for (category of categories) {
  //   console.log(category);
  // }
}


// window.alert('excute javascript code');
// initialization(); // 함수는 언제 실행되어야 하는가? -> 문서가 로드된 이후

window.onload = initialization;
```

```js
/*! bom.js © yamoo9.net, 2016 */

// 브라우저를 구성하는 객체들

// 기존에 존재하던 객체들
// window 객체
// window.location 객체
// window.screen 객체
// window.navigator 객체
// window.document 객체
// window.history 객체

// ↓ HTML5에 추가된 객체들
// window.navigator.geolocation 객체
// window.localStorage 객체
// window.sessionStorage 객체


// RWD 반응형 웹 디자인 적용을 위한 기기 감지 스크립팅
// 브라우저의 문서가 로드되었을 때 1회 감지
// 각 기기의 폭을 감지한 결과를 <html> 요소의 class 속성 값으로 처리

// <html> 요소 참조
var html = document.documentElement;
// 감지 클래스 속성을 포함한 객체 정의
var detect_classes = {
  'mobile': 800,
  'tablet': 1024,
  'desktop': 1280
};

/** @function assignClassDetection - 감지된 클래스 속성 제거 및 추가 함수 */
function assignClassDetection() {
  // <html> 요소의 class 속성 값을 가져온다.
  var html_class = html.getAttribute('class');
  var current_class = detectDeviceType();
  // 기존 클래스 속성과 달라진 경우에만 이 조건을 통과할 수 있다. (성능 이슈 해결)
  if(!html_class || assignClassDetection.old_class === current_class ) { return; } // 함수 종료
  // 기존 클래스 속성 값을 제거한다.
  if ( html.classList.contains( assignClassDetection.old_class ) ) {
    html.classList.remove( assignClassDetection.old_class );
  }
  // 현재 설정된 class 값을 <html> 요소의 class 속성으로 할당한다.
  html.classList.add(current_class);
  // 현재 설정된 class 값을 기억한다.
  assignClassDetection.old_class = current_class;
}

/** @function detectDeviceType - 기기의 유형 감지 함수 */
function detectDeviceType() {
  // 조건 문
  // switch ~ case
  // if ~ else
  var device_width = window.innerWidth;
  var type = null;

  if( device_width < detect_classes.mobile ) { type = 'mobile'; }
  else if ( device_width < detect_classes.tablet ) { type = 'tablet'; }
  else if ( device_width < detect_classes.desktop ) { type = 'desktop'; }
  else { type = 'wide'; }
  return type;
}

// 초기 class 속성 가져옴
var init_class = detectDeviceType();
// 초기 실행 시, <html> 요소에 class 속성 설정
html.classList.add( init_class );
// 초기 class 속성 값을 assignClassDetection 함수에 메모이제이션(기억)
assignClassDetection.old_class = init_class;

// 사용자가 창 크기를 조정할 때
window.onresize = assignClassDetection;
```