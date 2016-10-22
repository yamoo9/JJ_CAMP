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
    'id': 'page',
    'class': 'container',
    'data-app': 'custom-library'
  };
  // var container = createEl('div', container_attrs);
  // var container = createEl('div', container_attrs, 'this is a container el.');
  var container = createEl({
    'element' : 'div',
    'attr'    : container_attrs,
    'text'    : 'this is a container el.',
    'finish'  : function() {
      append(query('body'), this);
    }
  });
  // console.log('container:', container);

  // Native
  // var container_content = createText('this is container element.');
  // console.log(container_content.nodeType === document.TEXT_NODE);

  // 요소노드에 텍스트노드를 자식으로 병합하는 방법 DOM API
  // 부모노드.appendChild(자식노드)
  // container.appendChild(container_content);
  // console.log('container:', container);

  // 조작
  // var body = query('body');
  // body 요소를 부모로 하여 container 자식 요소를 추가(삽입)
  // appendTo(container, body);


  // 공개(노출)
  // global.mike = mike;

}(this));

// console.log(mike); // ReferenceError: is not defined
// console.log(mike); // '무선 마이크'