/*! dom-creation.js © yamoo9.net, 2016 */
(function(global){
  // 엄격한 문법 모드
  'use strict';
  // global === window ?
  // console.log('global === window: %c' + (global === window), 'color: #fe4940');
  // cLog('global === window: %c' + (global === window));

  // 비공개
  // var mike = '무선 마이크';
  var container_attrs = {
    'class': 'container'
  };
  // var container = createEl('div', container_attrs);
  // var container = createEl('div', container_attrs, 'this is a container el.');
  var container = createEl({
    'element': 'div',
    'text': 'this is a container el.',
    'attr': container_attrs,
  });
  // console.log('container:', container);

  // Native
  // var container_content = createText('this is container element.');
  // console.log(container_content.nodeType === document.TEXT_NODE);

  // 요소노드에 텍스트노드를 자식으로 병합하는 방법 DOM API
  // 부모노드.appendChild(자식노드)
  // container.appendChild(container_content);
  console.log('container:', container);


  // 공개(노출)
  // global.mike = mike;

}(this));

// console.log(mike); // ReferenceError: is not defined
// console.log(mike); // '무선 마이크'