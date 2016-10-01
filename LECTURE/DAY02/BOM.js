/**
 * --------------------------------
 * 브라우저 객체 모델
 * ----------------------------- */

// 전역 객체 (Global Object)
// Window 생성자(Contstructor) - 생성 -> 객체(Object, Instance)
// console.log('window:', window);

// 기기의 픽셀 농도(Device Pixel Ratio)
function detectDevicePixelRatio() {
  var dpr         = window.devicePixelRatio || 1;
  var is_retina   = dpr === 2; // > 1.5
  var is_retinaHD = dpr === 3;
  assignHtmlClass('x' + dpr);
  return {
    'retina': is_retina,
    'retinaHD': is_retinaHD
  };
}

detectDevicePixelRatio();




// ------------------------------------------------------------
// Screen 객체
// 사용자의 스크린 화면에 대한 정보를 제공
// 화면의 가로 폭 길이(px)
// 화면의 세로 폭 길이(px)
// 화면의 가용(Available) 가능한 실제 폭 길이(px)
// console.log('window.screen:', window.screen);
// 해상도(Resolution) 1440x900
// 전 세계 사용자의 스크린 가로 폭 평균치: 1366px (국내 평균 1920px)

// 미션. 현재 사용자의 화면(Screen)에서 실제 사용가능하지 않은 공간의 폭은 얼마인가?
var full_height    = window.screen.height;
var avail_height   = window.screen.availHeight;
var unavail_height = full_height - avail_height;
// console.log('full_height:', full_height);
// console.log('avail_height:', avail_height);
// console.log('unavail_height:', unavail_height);

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
  assignHtmlClass(identifier);
}

function assignHtmlClass(identifier) {
  if ( !html ) { html = document.documentElement; }
  // 문자 유형만 전달 가능
  if( typeof identifier !== 'string' ) { throw new Error('문자 유형으로 전달인자를 설정해주세요.'); }
  var existed_class = html.className !== '';
  html.className += (existed_class ? ' ' : '') + identifier;
}

function detection(device) {
  // 문자 유형만 전달 가능
  if( typeof device !== 'string' ) { throw new Error('문자 유형으로 전달인자를 설정해주세요.'); }
  return navigator.userAgent.toLowerCase().indexOf(device) > -1;
}

function detectMobileDevice(device) {
  if ( detection(device) ) { assignHtmlClass(device); }
}

function loopDetectDevices(checking_devices, divider) {
  var is_string, device_len;
  // 사용자가 전달한 값이 없을 경우, ' '으로 초기화
  // 사용자 전달 값이 있으면 사용자가 전달한 값으로 설정
  divider = divider || ' ';
  // 검증
  // checking_devices 전달인자가 존재하는가?
  if ( !checking_devices ) { throw new Error('전달인자는 필수입니다.'); }
  is_string = typeof checking_devices === 'string';
  // 배열 또는 문자 유형인가?
  if ( !is_string && !(checking_devices instanceof Array) ) {
    throw new Error('전달인자는 문자 또는 배열만 가능합니다.');
  }
  // 만약 문자라면? 처리
  if (is_string) {
    // 문자 데이터 유형을 배열 데이터 유형으로 변경
    checking_devices = checking_devices.split(divider);
  }
  device_len = checking_devices.length;
  while(device_len) {
    device_len = device_len - 1;
    detectMobileDevice(checking_devices[device_len]);
  }
}

detectPlatform();

// TODO: 모바일 기기인지? 어떤 기기인지? 감지
// navigator.userAgent; 웹 브라우저의 식별자를 문자열로 반환
// iphone ipad android nexus sm-g ..

// 문자 유형과 배열 유형 모두 적용 가능하도록 함수 확장
loopDetectDevices( 'iemobile kindle iphone ipad android nexus sm-g' );
// loopDetectDevices( 'iemobile,kindle,iphone,ipad,android,nexus,sm-g', ',' );
// loopDetectDevices( ['iemobile','kindle','iphone','ipad','android','nexus','sm-g'] );


// 지도 기반 서비스를 활용하기 위한 geolocation 객체
var geo = navigator.geolocation;
// geo.getCurrentPosition(geoSuccess, geoFail);

function geoSuccess(position) {
  console.log('지도 위도/경도 좌표 가져오기 성공!');
  console.dir('position:', position);
  console.log('position.coords:', position.coords);
  console.log('position.coords.accuracy:', position.coords.accuracy);
  console.log('position.coords.latitude:', position.coords.latitude);
  console.log('position.coords.longitude:', position.coords.longitude);
}

function geoFail(error) {
  console.error('지도 위도/경도 좌표 가져오기 실패!');
}

// 온라인 환경 확인
var is_online = navigator.onLine;
// console.log('is_online:', is_online);


// ------------------------------------------------------------
// Location 객체

var _location = window.location;

// console.dir(_location);

var hashes = 'home about works contact'.split(' ');

function assignLocationhash(hash) {
  _location.hash = '!' + hash;
}

for( var h = hashes.length, n; (n=hashes[--h]); ) {
  window.setTimeout( (function(n){
    return function() {
      // console.log(n);
      assignLocationhash(n);
    };
  })(n) , h * 1000);
}