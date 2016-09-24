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
var html = document.documentElement;

var detect_classes = {
  'mobile': 800,
  'tablet': 1024,
  'desktop': 1280
};

function assignClassDetection() {
  // <html> 요소의 class 속성 값을 가져온다.
  var html_class = html.getAttribute('class');
  if(!html_class || html_class === detectDeviceType() ) { return; } // 함수 종료
  console.log('try code');
}

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

// 초기 실행 시, 클래스 속성 설정
html.classList.add( detectDeviceType() );

// 사용자가 창 크기를 조정할 때
window.onresize = assignClassDetection;
