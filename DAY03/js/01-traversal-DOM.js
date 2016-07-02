/*! 01-traversal-DOM.js © yamoo9.net, 2016 */

// 문서에서 button.button-toggle 요소를 찾아 변수에 참조
var toggle_btn = document.querySelector('.button-toggle');
var container = document.querySelector('.toggled-container');
// 문서에서 찾은 요소노드 객체를 콘솔 패널에 기록(log)
// console.log(toggle_btn, container);

// container 참고 객체의 초기 상태 (보이는지, 안보이는지)
// var container_state = true;

// 토글 버튼을 사용자가 클릭하는 것을 감지(Add Event Listener)
// 사용자가 클릭하면 할 일을 수행하도록 이벤트 연결(Event Binding)
toggle_btn.addEventListener('click', function() {
  // [제어]
  // 대상 찾기: .toggled-container 요소

  // 자바스크립트의 조건문을 통해
  // 조건을 확인하여 프로그래밍을 실행한다.

  // ※ 인라인 스타일이 설정되지 않은 요소에서 style['property']로 값을 가져오려고 시도할 경우 빈 문자열을 반환한다.
  // console.log( container.style.display === '' );

  // 함수 일시종료
  // return;

  // if ( container_state === true ) {
  if ( container.style.display === '' || container.style.display === 'block' ) {
    // 동작1. container 요소를 화면에서 사라지게 한다.
    container.style.display = 'none';
    container.style.opacity = 0;
    // container 상태 변경
    // container_state = false;
  } else {
    // 동작2. 사라진 container 요소를 화면에서 나타나게 한다.
    container.style.display = 'block';
    container.style.opacity = 1;
    // container_state = true;
  }
  // container_state = !container_state;

});