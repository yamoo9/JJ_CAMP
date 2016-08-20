/*! lecture.js © yamoo9.net, 2016 */

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

// 컨텍스트
// 스코프 체이닝

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
  console.log(gnb);

  var gnb_links = $.makeArray( $.queryAll('a', gnb) );

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

  // for ( var link, i=0, l=gnb_links.length; i<l; i+=1 ) {
  //   link = gnb_links[i];
  //   link.onclick = (function(i){
  //     return function(e) {
  //       e.preventDefault();
  //       console.log(i); // 전역 변수 i
  //     };
  //   })(i);
  // }

  // for ( let link of gnb_links ) {
  //   console.log(link);
  // }

  // $.each(gnb_links, function(link, index) {
  //   link.onclick = function(event) {
  //     event.preventDefault();
  //     console.log(index);
  //   };
  // });

})(this, this.yamoo9);