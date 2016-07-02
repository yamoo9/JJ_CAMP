/*! 01-traversal-DOM.js © yamoo9.net, 2016 */

var toggle_btn = document.querySelector('.button-toggle');
var container = document.querySelector('.toggled-container');

toggle_btn.addEventListener('click', function() {
  // class 속성을 요소에 추가/제거하는 방법으로 공부!
  // if( container.classList.contains('screen-off') ) {
  //   container.classList.remove('screen-off');
  // } else {
  //   container.classList.add('screen-off');
  // }
  container.classList.toggle('screen-off');
});

/**
 * --------------------------------
 * DOM 탐색
 * ----------------------------- */
// 다음에 나오는 형제 요소노드를 찾아라.
// .nextSibling 은 다음에 나오는(인접한) 형제 노드를 찾고,
// .nextElementSibling 은 다음에 나오는 형제 요소노드를 찾는다.
var toggle_btn_nextEl = toggle_btn.nextElementSibling;
// .previousSibling 은 이전에 나오는(인접한) 형제 노드를 찾고,
// .previousElementSibling 은 이전에 나오는 형제 요소노드를 찾는다.
var toggle_btn_nextEl_prevEl = toggle_btn_nextEl.previousElementSibling;

// toggle_btn_nextEl // <button> 다음에 나오는 <div> 요소노드
// .previousSibling 은 이전에 나오는(인접한) 형제 노드를 찾고,
// .previousElementSibling 은 이전에 나오는 형제 요소노드를 찾는다.
console.log(toggle_btn_nextEl.firstElementChild.nextElementSibling.firstChild.nodeValue); // XML DOM
console.log(toggle_btn_nextEl.firstElementChild.nextElementSibling.innerText); // HTML DOM