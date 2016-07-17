/*! holzweiler.js © yamoo9.net, 2016 */

/**
 * ----------------------------------------------------------------------
 * 내비게이션 컨트롤 (절차 지향 방식, 함수형 프로그래밍)
 * ------------------------------------------------------------------- */

/**
 * -----------------------------------------------------------------
 * 내비게이션 접근성 설정 함수
 */
// 하위 메뉴 펼침 함수
function activateDepth2Menu() {
  var _parent_li = this.parentNode;
  deactiveDepth2Menu(_parent_li);
  _parent_li.classList.add('active');
}
// 하위 메뉴 접힘 함수
function deactiveDepth2Menu(_parent_li) {
  var _parent_ul    = _parent_li.parentNode;
  var _activated_el = $query('.active', _parent_ul);
  if ( _activated_el ) { _activated_el.classList.remove('active'); }
}
// Blur 이벤트 감지 시, 하위 메뉴 접힘 함수
function blurDeactiveDepth2Menu() {
  var d1_parent_li = this.parentNode.parentNode.parentNode;
  deactiveDepth2Menu(d1_parent_li);
}
// 키보드 Shift + Tab 감지 시, 하위 메뉴 접힘 함수
function backTabDeactiveDepth2Menu(event) {
  var key = event.keyCode || event.which;
  // Tab 키 식별 숫자는 9 이다.
  if(event.shiftKey && key === 9) { deactiveDepth2Menu(this.parentNode); }
}

/**
 * -----------------------------------------------------------------
 * 내비게이션 접근성 설정 초기화 (Initialization)
 */
var gnb          = $query('.holzweiler-gnb');
var unb          = $query('.holzweiler-unb');
var gnb_d1_links = $queryAll('.depth-1 > li > a', gnb);
var unb_d1_links = $queryAll('.depth-1 > li > a', unb);

var i=0, l=gnb_d1_links.length, gnb_link, unb_link, gnb_last_a, unb_last_a;

/**
 * -----------------------------------------------------------------
 * 내비게이션 접근성 설정 이벤트 바인딩
 * 요소에 개별적 이벤트 적용을 위한 반복문 사용.
 */
for(; i<l; i++) {
  gnb_link = gnb_d1_links[i];
  unb_link = unb_d1_links[i];
  // Depth 1 <a> 요소에 포커싱될 경우, 하위 메뉴 펼쳐짐
  gnb_link.addEventListener('focus', activateDepth2Menu);
  unb_link.addEventListener('focus', activateDepth2Menu);
  // Depth 1 <a> 첫번째 요소에서 shift + tab 키를 누를 경우, 하위 메뉴 닫힘
  if ( i === 0 ) {
    gnb_link.addEventListener('keydown', backTabDeactiveDepth2Menu);
    unb_link.addEventListener('keydown', backTabDeactiveDepth2Menu);
  }
  // Depth 2 마지막 <a> 요소에서 blur 이벤트 발생 시, 하위 메뉴 닫힘
  if ( i === l - 1 ) {
    gnb_last_a = $query('.depth-2 li:last-child a', gnb_link.parentNode);
    unb_last_a = $query('.depth-2 li:last-child a', unb_link.parentNode);
    gnb_last_a.addEventListener('blur', blurDeactiveDepth2Menu);
    unb_last_a.addEventListener('blur', blurDeactiveDepth2Menu);
  }
}