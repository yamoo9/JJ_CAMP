/*! lecture.js © yamoo9.net, 2016 */

// ----------------------------------------
// 컨텍스트
// 스코프 체이닝
// 클로저
// ----------------------------------------

// 전역 컨텍스트
// console.log(this);

function localScope() {
  // ECMAScript 5 Edition
  // 엄격 모드
  'use strict';
  // 전역과 구분이 되는 지역 컨텍스트 생성
  // console.log(this); // undefined
}

localScope(); // 이 함수는 누가 실행했는가?
window.localScope(); // this === window object
this.localScope();

// this 키워드 -> 컨텍스트 참조 변수

// sandbox(function() {
//   var x = 'x position';
//   sandbox(function() {
//     var y = 'y position';
//     sandbox(function() {
//       var z = 'z position';
//       console.log(x, y, z);
//     });
//   });
// });

// ----------------------------------------

(function(global, $){
  'use strict';

  var gnb = $.query('.gnb');
  // console.log(gnb);
  var gnb_links = $.makeArray( $.queryAll('a', gnb) );

  // 방법 1. for문을 사용하되, `객체.속성`을 활용
  for ( var link, i=0, l=gnb_links.length; i<l; i+=1 ) {
    link = gnb_links[i];
    // 객체.속성 정의 (자유롭다!)
    link.idx = i;
    link.onclick = function(e) {
      console.log(this);
      e.preventDefault();
      console.log(this.idx, i); // 전역 변수 i
    };
  }

  // 방법 2. for문을 사용하되, 클로저 함수를 활용
  // for ( var link, i=0, l=gnb_links.length; i<l; i+=1 ) {
  //   link = gnb_links[i];
  //   link.onclick = (function(i){
  //     return function(e) {
  //       e.preventDefault();
  //       console.log(i); // 전역 변수 i
  //     };
  //   })(i);
  // }

  // 방법 3. 사용자 정의 each() 함수를 사용
  // $.each(gnb_links, function(link, index) {
  //   link.onclick = function(event) {
  //     event.preventDefault();
  //     console.log(index);
  //   };
  // });

})(this, this.yamoo9);

// ----------------------------------------
(function(global, $){
  'use strict';

  // [ 이벤트 연결 ]
  // 이벤트 속성에 함수를 할당 (이벤트 바인딩)
  // 이벤트 속성에 함수를 연결함으로서 이벤트 기반의 프로그래밍
  // 연결되는 함수를 이벤트 핸들러

  // [ 이벤트 제거 ]
  // 모든 HTML DOM 객체(문서 객체)는 이벤트 속성을 가진다.
  // 이벤트 속성의 기본 참조 값은 null 이다.
  // 이벤트 연결 과정은 이벤트 속성에 함수를 할당하면 null이 아닌, 함수가 참조된다.
  // 반대로 이야기하면 이벤트를 제거할 때는 null을 대입함으로서
  // 연결된 함수와 관계를 끊는다.

  // [ 미션 ]
  // one 형태로 한 번만 클릭하면 이벤트가 제거 되는 이벤트 프로그래밍을 구현
  // 버튼을 하나 생성한 다음 클릭 가능한 함수를 이벤트 속성에 연결 시킴
  // 그리고 사용자가 버튼을 클릭하면 함수는 실행된 후, 다음 클릭 부터는
  // 더 이상 실행되지 않습니다.
  var body = $.query('body');
  // 1. 버튼 객체 생성
  var button = $.createNode('button', 'One Click!');
  // console.log($.type(button));
  // 2. 생성된 버튼 객체에 속성을 설정
  $.attr(button, {
    'type': 'button',
    'class': 'one-click-button'
  });
  // 2.1 버튼 내부에 텍스트 추가
  // button.textContent = 'one click';
  // 2.2 DOM에서 제공하는 텍스트 노드를 생성한 다음 버튼 객체에 추가
  // var button_text = $.createText('one Click');
  // button.appendChild(button_text);
  // 2.3 $.createNode('button', 'text content');

  // 3. 생성된 버튼 객체를 문서에 추가(삽입)
  body.appendChild(button);

})(this, this.yamoo9);