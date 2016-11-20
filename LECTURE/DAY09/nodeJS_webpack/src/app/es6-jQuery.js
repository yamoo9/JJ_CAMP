/*! new-tech.js © yamoo9.net, 2016 */

// CommonJS 모듈 로드 방법
// let $ = require('jquery');

// ECMAScript 2015: ES 6th Edition 모듈 로드 방법
import $ from 'jquery';

// 문서가 준비되면 init() 초기화 실행
$(document).ready(init);

// 초기화 함수
function init() {

  // 문서 객체 <nav> 참조
  let $nav = $('nav');
  // <nav> 내부의 <a> 요소들 참조
  let $nav_links = $nav.find('a');
  // <nav> 내부의 <a> 요소들 순환 이벤트 바인딩(연결)
  $nav_links.each((idx, item) => {
    // $link 변수에 필터링 된 $(<a>) 참조
    let $link = $nav_links.eq(idx);
    // $link 인스턴스 객체에 클릭 이벤트 바인딩
    $link.on('click', (e) => {
      // 웹 브라우저 기본 동작 차단
      e.preventDefault();
      // idx 인덱스 숫자 출력
      console.log(idx);
    });
  });

};



