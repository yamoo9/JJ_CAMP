/*! 01-traversal-DOM.js © yamoo9.net, 2016 */

var toggle_btn = document.querySelector('.button-toggle');
var container = document.querySelector('.toggled-container');

// class 속성을 요소에 추가/제거하는 방법으로 공부!

toggle_btn.addEventListener('click', function() {

  // 조건 확인
  var container_class = container.getAttribute('class');

  if( container_class === 'toggled-container') {
    // screen-off 클래스 속성을 추가
    container.setAttribute('class', container_class + ' screen-off');
  } else {
    // console.log('screen-off를 가지고 있는 상황');
    container.setAttribute('class', 'toggled-container');
  }

  // if (  ) {

  // } else {

  // }

});