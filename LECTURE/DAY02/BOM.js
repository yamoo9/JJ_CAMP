/**
 * --------------------------------
 * 브라우저 객체 모델
 * ----------------------------- */

// 전역 객체 (Global Object)
// Window 생성자(Contstructor) - 생성 -> 객체(Object, Instance)
console.log('window:', window);





// ------------------------------------------------------------
// Screen 객체
// 사용자의 스크린 화면에 대한 정보를 제공
// 화면의 가로 폭 길이(px)
// 화면의 세로 폭 길이(px)
// 화면의 가용(Available) 가능한 실제 폭 길이(px)
console.log('window.screen:', window.screen);
// 해상도(Resolution) 1440x900
// 전 세계 사용자의 스크린 가로 폭 평균치: 1366px (국내 평균 1920px)

// 미션. 현재 사용자의 화면(Screen)에서 실제 사용가능하지 않은 공간의 폭은 얼마인가?
var full_height    = window.screen.height;
var avail_height   = window.screen.availHeight;
var unavail_height = full_height - avail_height;
console.log('full_height:', full_height);
console.log('avail_height:', avail_height);
console.log('unavail_height:', unavail_height);

// 인스턴스 객체 Object <- ScreenOrientation 생성자 함수
var orient = window.screen.orientation;
// orient.angle; // 각도
// orient.lock(); // 회전 차단
// orient.onchange = function() {
//   // 스크린 회전 이벤트 감지
// };





// ------------------------------------------------------------
// Navigator 객체
// 웹 브라우저의 정보 제공
// 어떤 운영체제를 사용자가 쓰고 있나?
// 플러그인은 무엇 무엇을 사용하나?
// 웹 브라우저의 코드네임, 개발 엔진 ???

var html      = document.documentElement;
var navigator = window.navigator;
// navigation directory
// console.log('navigator.platform:', navigator.platform);

// 미션.
// 사용자가 접속한 환경은 window? 혹은? machintosh?
// 검토한 사용자의 환경을 식벽하기 위한 방법으로 class 속성에
// 감지된 해당 플랫폼 키워드를 추가한다.

function detectPlatform() {
  var is_window = navigator.platform.toLowerCase().indexOf('win') > -1; // 'mac', 'win'
  var identifier = is_window ? 'win' : 'mac';
  var existed_class = html.className !== '';
  // console.log('existed_class:', existed_class);
  // console.log('is_window:', is_window);
  // Window OS가 맞다면, 'win' 클래스 속성을 추가
  // if ( is_window ) {
  //   identifier = ' win';
  // }
  // // Window OS가 아니라면, 'mac' 클래스 속성을 추가
  // else {
  //   identifier = ' mac';
  // }
  // var space = '';
  // if ( existed_class ) { space = ' '; }
  // html.className += space + identifier;
  html.className += (existed_class ? ' ' : '') + identifier;
}
// 함수 실행
detectPlatform();