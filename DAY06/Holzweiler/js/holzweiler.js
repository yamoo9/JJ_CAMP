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
  // var _parent_li = this.parentNode;
  // 탐색 헬퍼 함수 parentEl(el)
  var _parent_li = parentEl(this);
  deactiveDepth2Menu(_parent_li);
  _parent_li.classList.add('active');
}
// 하위 메뉴 접힘 함수
function deactiveDepth2Menu(_parent_li) {
  // var _parent_ul    = _parent_li.parentNode;
  var _parent_ul    = parentEl(_parent_li);
  var _activated_el = $query('.active', _parent_ul);
  if ( _activated_el ) { _activated_el.classList.remove('active'); }
}
// Blur 이벤트 감지 시, 하위 메뉴 접힘 함수
function blurDeactiveDepth2Menu() {
  // var _d1_parent_li = this.parentNode.parentNode.parentNode;
  var _d1_parent_li = parentEl(this, 3);
  deactiveDepth2Menu(_d1_parent_li);
}
// 키보드 Shift + Tab 감지 시, 하위 메뉴 접힘 함수
function backTabDeactiveDepth2Menu(event) {
  var _key = event.keyCode || event.which;
  // Tab 키 식별 숫자는 9 이다.
  if(event.shiftKey && _key === 9) { deactiveDepth2Menu( parentEl(this) ); }
}

/**
 * -----------------------------------------------------------------
 * 내비게이션 접근성 설정 초기화 (Initialization)
 */
var gnb          = $query('.holzweiler-gnb');
var unb          = $query('.holzweiler-unb');
var gnb_d1_links = $queryAll('.depth-1 > li > a', gnb);
var unb_d1_links = $queryAll('.depth-1 > li > a', unb);


/**
 * -----------------------------------------------------------------
 * 내비게이션 접근성 설정 이벤트 바인딩
 * 요소에 개별적 이벤트 적용을 위한 반복문 사용.
 * ※ 자바스크립트 호이스트 현상 고려, for문의 변수 선언은 초기화 영역으로 이동 정리.
 */
var i=0, l=gnb_d1_links.length, gnb_link,  gnb_last_a;
for(; i<l; i++) {
  gnb_link = gnb_d1_links[i];
  // Depth 1 <a> 요소에 포커싱될 경우, 하위 메뉴 펼쳐짐
  gnb_link.addEventListener('focus', activateDepth2Menu);
  // Depth 1 <a> 첫번째 요소에서 shift + tab 키를 누를 경우, 하위 메뉴 닫힘
  if ( i === 0 ) {
    gnb_link.addEventListener('keydown', backTabDeactiveDepth2Menu);
  }
  // Depth 2 마지막 <a> 요소에서 blur 이벤트 발생 시, 하위 메뉴 닫힘
  if ( i === l - 1 ) {
    gnb_last_a = $query('.depth-2 li:last-child a', parentEl(gnb_link));
    gnb_last_a.addEventListener('blur', blurDeactiveDepth2Menu);
  }
}

var k=0, m=unb_d1_links.length, unb_link,  unb_last_a;
for(; k<m; k++) {
  unb_link = unb_d1_links[k];
  unb_link.addEventListener('focus', activateDepth2Menu);
  if ( k === 0 ) {
    unb_link.addEventListener('keydown', backTabDeactiveDepth2Menu);
  }
  unb_last_a = $query('.depth-2', parentEl(unb_link));
  if(unb_last_a) {
    $query('li:last-child a', unb_last_a).addEventListener('blur', blurDeactiveDepth2Menu);
  }
}