/*! constructor-prototype.js © yamoo9.net, 2016 */

// function Subject(name, teacher){
//   // 엄격모드 사용
//   // new를 함께 사용하지 않은 생성자 함수 호출 시에
//   // window 전역 객체가 아닌, undefined
//   'use strict';
//   console.log(this);
//   this.name = name;
//   this.teacher = teacher;
// }

// 테스트
// new Subject('수학', '김봉찬');
// new Subject('국어', '이해성');

// 오류 발생
// Subject('영어', 'Herry Kain');

// --------------------------------------------------
// new 키워드를 사용하지 않을 경우 문제가 발생하니
// 이를 원천봉쇄하는 방법이 고안

// new를 강제화 하는 패턴 1
// function subject(name, teacher) {
//   return new Subject(name, teacher);
// }

// new를 강제화 하는 패턴 2
function Subject(name, teacher){
  // 객체의 생성자를 물어 자신(생성자)인지 확인 후,
  // new 키워드 사용을 강제화한다.
  if( this.constructor !== Subject ) {
    return new Subject(name, teacher);
  }
  // --------------------------------------------------------
  // 생성될 객체의 속성(Property)
  // --------------------------------------------------------
  // 공개(Public Member)
  // this.name = name;
  // this.teacher = teacher;
  // --------------------------------------------------------
  // 비공개(Private Member)
  var name = name;
  var teacher = teacher;
  // --------------------------------------------------------
  // 생성될 객체의 메소드(Method)
  // --------------------------------------------------------
  // 특권 메소드 (외부에서 접근이 불가능한 감춰진 멤버에 접근이 가능하다)
  this.getName = function() {
    return name;
  };
  this.setName = function(_name) {
    name = _name;
  };
  // 생성자 함수는 암묵적으로 this를 반환
  // return this;
}

// --------------------------------------------------
// 프로토타입(Prototype, 원형 객체)
// Subject // 생성자
// Subject.prototype // 생성자에 연결된 원형 객체 (빈 객체)

// UI 컴포넌트 Tab
var Tab = function(selector, options) {
  if ( this.constructor !== Tab ) {
    return new Tab(selector, options);
  }
  this.el = Tab.query(selector);
  this.options = options;
  this.init();
};

Tab.prototype = {
  'constructor': Tab,
  'init': function() {},
  'activeTab': function() {},
  'deactiveTab': function() {},
  'autoMovingTab': function() {},
  'stopMovingTab': function() {},
};

// Tab.prototype.activeTab = function(index) {
//   // 전달된 인덱스에 해당하는 탭을 화면에서 활성화되도록 뷰를 업데이트
// };

// Tab.prototype.deactiveTab = function(index) {
//   // 전달된 인덱스에 해당하는 탭을 화면에서 활성화되도록 뷰를 업데이트
// };

// Tab.prototype.autoMovingTab = function(time) {
//   // 시간에 따라 움직이는 탭 메뉴 설정
// };

// Tab.prototype.stopMovingTab = function() {
//   // 움직이는 탭을 멈추는 설정
// };

// Tab.query = yamoo9.query;