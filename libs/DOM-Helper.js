/*! DOM-Helper.js © yamoo9.net, 2016 */
'use strict';

(function(global){

  function type(data) {
    return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
  }

  function validateData(data, type, err_msg) {
    err_msg = err_msg || '전달된 '+ data +' 인자는 요구되는 '+ type +' 데이터 유형이 아니라서 오류가 발생했습니다.';
    if ( !data || !type ) {
      throw new Error('2개의 필수 전달인자 중 하나가 전달되지 않았습니다. 확인해주세요.');
    }
    if ( typeof type !== 'string' ) {
      throw new Error('2번째 필수 인자는 체크 할 자바스크립트 데이터 유형을 문자열로 전달해야 합니다.');
    }
    if ( typeof data !== type ) {
      throw new Error(err_msg);
    }
  }

  function isElNode(node) {
    return node.nodeType === 1;
  }

  function checkError(message) {
    validateData(message, 'string');
    throw new Error(message);
  }

  function trimBefore(str) {
    return str.replace(/\s+/,'');
  }
  function trimAfter(str) {
    return str.replace(/\s+/,'');
  }
  function trim(text) {
    return trimAfter( trimBefore(text) );
  }

  function idEl(id_name) {
    validateData(id_name, 'string', 'id 문자열을 전달해야 합니다.');
    return document.getElementById(id_name);
  }

  function tagEl(tag_name, context) {
    validateData(tag_name, 'string', 'tag_name 문자열을 전달해야 합니다.');
    return (context || document).getElementsByTagName(tag_name);
  }

  function classEl(class_name, context) {
    var all_els, filtered_els = [];
    if ( !document.getElementsByClassName ) {
      return (context || document).getElementsByClassName(class_name);
    } else {
      all_els = (context || document.body).getElementsByTagName('*');
      for ( var el, i=0, l=all_els.length; i<l; i++ ) {
        var check_class_name = new RegExp('(\\s|^)' + class_name + '(\\s|)');
        if( check_class_name.test( el.getAttribute('class') ) ) {
          filtered_els.push(el);
        }
      }
      return filtered_els;
    }
  }

  function queryAll(selector, context) {
    validateData(selector, 'string');
    if ( typeof context === 'string' ) {
      context = query(context);
    }
    return (context || document).querySelectorAll(selector);
  }

  function query(selector, context) {
    return queryAll(selector, context)[0];
  }

  function createEl(el_name, parent_el, text) {
    validateData(el_name, 'string');
    var _el = document.createElement(el_name);
    if ( parent_el ) {
      if ( isElNode(parent_el) ) {
        parent_el.appendChild(_el);
      } else {
        checkError('전달인자는 요소노드가 아닙니다. 이를 확인해주세요.');
      }
    }
    if (text) {
      createText(text, _el);
    }
    return _el;
  }

  function createText(text, el_node) {
    validateData(text, 'string');
    var _textnode = document.createTextNode(text);
    if ( el_node && isElNode(el_node) ) {
      el_node.appendChild(_textnode);
    } else {
      return _textnode;
    }
  }

  function createNode(node, text) {
    var _return_obj;
    if (!text) {
      return createEl(node);
    } else {
      var created_node = createEl(node);
      created_node.appendChild(createText(text));
      return created_node;
    }
  }

  function parentEl(el, depth) {
    // if ( !isElNode(el) ) {
    //   checkError('1번째 전달인자는 요소노드여야 합니다.');
    // }
    depth && validateData(depth, 'number');
    depth = depth || 1;
    do {
      el = el.parentNode;
    } while( el && isElNode(el) && --depth );
    return el;
  }

  var prevEl = (function() {
    var _prevEl;
    if ( 'previousElementSibling' in HTMLElement.prototype ) {
      _prevEl = function(el) {
        return el.previousElementSibling;
      };
    } else {
      _prevEl = function(el) {
        do {
          el = el.previousSibling;
        } while( el && !isElNode(el) );
        return el;
      };
    }
    return _prevEl;
  }());

  var nextEl = (function() {
    var _nextEl;
    if ( 'nextElementSibling' in HTMLElement.prototype ) {
      _nextEl = function(el) {
        return el.nextElementSibling;
      };
    } else {
      _nextEl = function(el) {
        do {
          el = el.nextSibling;
        } while( el && !isElNode(el) );
        return el;
      };
    }
    return _nextEl;
  }());

  var firstEl = (function(){
    var _firstEl;
    if ( 'firstElementChild' in HTMLElement.prototype ) {
      _firstEl = function(el) {
        return el.firstElementChild;
      };
    } else {
      _firstEl = function(el) {
        el = el.firstChild;
        return el && !isElNode(el) ? nextEl(el) : el;
      };
    }
    return _firstEl;
  })();

  var lastEl = (function(){
    var _lastEl;
    if ( 'lastElementChild' in HTMLElement.prototype ) {
      _lastEl = function(el) {
        return el.lastElementChild;
      };
    } else {
      _lastEl = function(el) {
        el = el.lastChild;
        return el && !isElNode(el) ? prevEl(el) : el;
      };
    }
    return _lastEl;
  })();

  var hasClass = (function(){
    var _hasClass;
    if ( 'classList' in HTMLElement.prototype ) {
      _hasClass = function(el, class_name) {
        return el.classList.contains(class_name);
      };
    } else {
      _hasClass = function(el, class_name) {
        var _check_class_name = new RegExp('(^| )'+class_name+'( |)');
        var el_class_name = el.getAttribute('class');
        return _check_class_name.test(el_class_name);
      };
    }
    return _hasClass;
  })();

  var addClass = (function(){
    var _addClass;
    if ( 'classList' in HTMLElement.prototype ) {
      _addClass = function(el, class_name) {
        if (!el.classList.contains(class_name)) {
          el.classList.add(class_name);
        }
      };
    } else {
      _addClass = function(el, class_name) {
        if ( !hasClass(el, class_name) ) {
          var pre_class_value = el.getAttribute('class') || '';
          el.setAttribute('class', (pre_class_value + ' ' + class_name).trim());
        }
      };
    }
    return _addClass;
  })();

  function _removeClassAll(el, class_name) {
    if (!class_name) { el.setAttribute('class', ''); }
  }
  var removeClass = (function() {
    var _removeClass;
    if ( 'classLists' in HTMLElement.prototype ) {
      _removeClass = function(el, class_name) {
        _removeClassAll(el, class_name);
        if (el.classList.contains(class_name)) {
          el.classList.remove(class_name);
        }
      };
    } else {
      _removeClass = function(el, class_name) {
        _removeClassAll(el, class_name);
        if ( hasClass(el, class_name) ) {
          var el_classes = el.getAttribute('class');
          var check_class_name = new RegExp('(^| )' + class_name + '(| )', 'i');
          el_classes = el_classes.replace(check_class_name, ' ');
          el.setAttribute( 'class', el_classes.trim() );
        }
      };
    }
    return _removeClass;
  })();

  var toggleClass = (function(){
    var _toggleClass;
    if ( 'classList' in HTMLElement.prototype ) {
      _toggleClass = function(el, class_name) {
        el.classList.toggle(class_name);
      };
    } else {
      _toggleClass = function(el, class_name) {
        if ( hasClass(el, class_name) ) {
          removeClass(el, class_name);
        } else {
          addClass(el, class_name);
        }
      };
    }
    return _toggleClass;
  })();

  function radioClass(el, class_name) {
    var siblings = el.parentNode.children;
    for ( var sibling, i=0, l=siblings.length; i<l; i++ ) {
      sibling = siblings[i];
      if( hasClass(sibling, class_name) ) {
        removeClass(sibling, class_name);
        break;
      }
    }
    addClass(el, class_name);
  }

  function getAttr(elNode, attribute) {
    if (!isElNode(elNode)) { console.error('전달된 첫번째 인자는 요소노드여야 합니다.'); }
    // validateData(attribute, 'string', '전달된 2번째 "속성 이름"은 반드시 문자열이어야 합니다.');
    return elNode.getAttribute(attribute);
  }
  function setAttr(elNode, attribute, value) {
    if (!isElNode(elNode)) { console.error('전달된 첫번째 인자는 요소노드여야 합니다.'); }
    // validateData(attribute, 'string', '전달된 2번째 "속성 이름"은 반드시 문자열이어야 합니다.');
    elNode.setAttribute(attribute, value);
  }
  // 8.13 ----------------------------------------------------------------------------
  var getStyle = (function(){
    // W3C Standard Method
    if ( window.getComputedStyle ) {
      return function(elNode, property, pseudo) {
        if (!isElNode(elNode)) { console.error('전달된 첫번째 인자는 요소노드여야 합니다.'); }
        validateData(property, 'string', '전달된 2번째 "속성 이름"은 반드시 문자열이어야 합니다.');
        var cssMap = window.getComputedStyle(elNode, pseudo);
        if ( pseudo && cssMap.content === '' ) {
          return null;
        }
        return cssMap[property];
      };
    }
    // MS IE Non Standard Method (IE 6-8)
    else {
      return function(elNode, property) {
        if (!isElNode(elNode)) { console.error('전달된 첫번째 인자는 요소노드여야 합니다.'); }
        validateData(property, 'string', '전달된 2번째 "속성 이름"은 반드시 문자열이어야 합니다.');
        return elNode.currentStyle[property];
      };
    }
  })();

  function setStyle(elNode, property, value) {
    if (!isElNode(elNode)) { console.error('전달된 첫번째 인자는 요소노드여야 합니다.'); }
    validateData(property, 'string', '전달된 2번째 "속성 이름"은 반드시 문자열이어야 합니다.');
    elNode.style[property] = value;
  }

  function css(elNode, property, value) {
    if ( !value && type(property) === 'string' ) {
      // GETTER
      return getStyle(elNode, property);
    } else if ( !value && type(property) === 'object' ) {
      each(property, function(prop, value){
        css(elNode, prop, value);
      });
    } else {
      // SETTER
      setStyle(elNode, property, value);
    }
  }

  function hasAttr(elNode, attribute) {
    if (!isElNode(elNode)) { console.error('전달된 첫번째 인자는 요소노드여야 합니다.'); }
    // validateData(attribute, 'string', '전달된 2번째 "속성 이름"은 반드시 문자열이어야 합니다.');
    if (type(attribute) === 'string') {
      return elNode.hasAttribute(attribute);
    }
    if (type(attribute) === 'undefined') {
      return elNode.hasAttributes();
    }
  }
  function removeAttr(elNode, attribute) {
    if (!isElNode(elNode)) { console.error('전달된 첫번째 인자는 요소노드여야 합니다.'); }
    var attr_type = type(attribute);
    // 문자열로 전달된 속성 하나를 제거
    if (attr_type === 'string') {
      elNode.removeAttribute(attribute);
    }
    // 배열로 전달된 속성만 제거
    if (attr_type === 'array' && attribute.length > 0) {
      each(attribute, function(item, index) {
        elNode.removeAttribute(item);
      });
    }
    // 모든 속성을 제거
    if (attr_type === 'undefined' || attribute.length === 0) {
      // elNode 속성이 존재하는가? 존재한다면 모든 속성을 제거
      if ( elNode.hasAttributes() ) {
      // if ( hasAttr(elNode) ) {
        // NamedNodeMap {name:value}, length
        each(elNode.attributes, function(item, index) {
          var property = item.name;
          // removeAttr(elNode, property);
          elNode.removeAttribute(property);
        });
      }
    }
  }

  function attr(elNode, attribute, value) {
    if ( type(attribute) === 'object' ) {
      for (var attr in attribute) {
        if (attribute.hasOwnProperty(attr)) {
          setAttr(elNode, attr, attribute[attr]);
        }
      }
    }
    else if ( type(value) === 'undefined' ) {
      return getAttr(elNode, attribute);
    }
    else {
      setAttr(elNode, attribute, value);
    }
  }

  var each = (function(){
    if ( Array.prototype.forEach ) {
      return function(list, callback) {
        var is_obj = ( type(list) === 'object' );
        if ( (list.length && type(list) !== 'string') || is_obj ) {
          makeArray(list).forEach(function(item, index) {
            if(!is_obj) {
              callback.call(item, item, index);
            } else {
              var obj_value = obj[item];
              callback.call(null, item, obj_value);
            }
          });
        }
      };
    }
    // IE 6-8 웹 브라우저
    else {
      return function(list, callback) {
        for (var list_item, i=0, l=list.length; i<l; i++) {
          list_item = list[i];
          callback.call(list_item, list_item, i);
        }
      };
    }
  })();

  var makeArray = (function(){
    if (Array.from) {
      return function(data) {
        if (type(data) === 'object') {
          return Object.keys(data);
        } else {
          return Array.from(data);
        }
      }
    } else {
      return function (obj) {
        var new_arr_set=[], i=0, l=obj.length
        if ( obj.length && type(obj) !== 'string' && !obj.pop ) {
          for(; i<l; i++) {
            new_arr_set.push(obj[i]);
          }
          return new_arr_set;
        } else if ( type(obj) === 'object' ) {
          for ( var prop in obj ) {
            if (obj.hasOwnProperty(prop)) {
              new_arr_set.push(prop);
            }
          }
          return new_arr_set;
        } else {
          return [];
        }
      };
    }
  })();



  function removeUnit(has_unit_value, tactics) {
    // 단위를 빼내는 구문
    // 흔하게 사용하는 CSS의 단위 리스트
    var unit_list = 'vmax vmin vh vw rem % em px'.split(' '); // ['em', 'rem', 'px', '%']
    // has_unit_value // 1.5, 20px, 1rem, 0.4em, 80%, ...
    for ( var unit, i=unit_list.length-1; unit_list[i]; i-- ) {
      unit = unit_list[i];
      // px, em, %, rem, vw, vh, vmin, vmax
      if ( has_unit_value.indexOf(unit) > -1 ) {
        if ( unit === 'em' ) {
          removeUnit.unit = 'em';
          continue;
        }
        removeUnit.unit = unit;
        break;
      }
    }

    // 전달된 인자에 따라 어떤 메소드(방법)를 사용할 지 결정
    var method = (tactics || 'int') === 'int' ? 'parseInt' : 'parseFloat';
    // 단위를 제거한 값을 반환
    return window[method](has_unit_value, 10);
  }
  removeUnit.unit = null;

  // DOM 조작에 도움을 주는 함수 제작
  function append(parent_node, child_node) {
    if ( !isElNode(parent_node) ) {
      checkError('전달된 인자는 요소노드여야 합니다.');
    }
    parent_node.appendChild(child_node);
  }

  function prepend(parent_node, child_node) {
    if ( !isElNode(parent_node) ) {
      checkError('전달된 인자는 요소노드여야 합니다.');
    }
    var firstChild = parent_node.firstChild; // 없다면 null, undefined
    // 부모 요소노드(parent_node)에 자식이 존재하는가? 검증
    // 조건1) 만약 자식노드가 존재한다면?
    // 자식노드 앞에 child_node를 삽입힌다.
    if ( firstChild ) {
      insertBefore(child_node, firstChild);
    }
    // 조건2) 만약 자식노드가 존재하지않는다면?
    // parent_node의 마지막 자식노드로 삽입한다.
    else {
      append(parent_node, child_node);
    }
  }

  function insertBefore(insert_node, target_node) {
    parentEl(target_node).insertBefore(insert_node, target_node);
  }

  function insertAfter(insert_node, target_node) {
    var next_node = target_node.nextSibling;
    if ( next_node ) {
      insertBefore(insert_node, next_node);
    } else {
      append(parentEl(target_node), insert_node);
    }
  }

  // 이벤트 제어
  function on(el_node, event_type, event_handler) {
    // 전달인자 검증
    if ( !isElNode(el_node) ) { checkError('전달된 인자는 요소노드여야 합니다.'); }
    if ( type(event_type) !== 'string' ) { checkError('전달된 2번째 인자는 텍스트 유형이어야 합니다.'); }
    if ( type(event_handler) !== 'function' ) { checkError('전달된 3번째 인자는 함수 유형이어야 합니다.'); }
    // 구형 이벤트 모델
    el_node['on'+event_type] = event_handler;
  }
  function off(el_node, event_type, event_handler) {
    // 전달인자 검증
    if ( !isElNode(el_node) ) { checkError('전달된 인자는 요소노드여야 합니다.'); }
    if ( type(event_type) !== 'string' ) { checkError('전달된 2번째 인자는 텍스트 유형이어야 합니다.'); }
    if ( type(event_handler) === 'function' || type(event_handler) === 'null' ) {
      // 구형 이벤트 모델
      el_node['on'+event_type] = null;
    }
  }

  global.yamoo9 = {
    // 문서객체모델 선택
    'query':        query,
    'queryAll':     queryAll,
    // 문서객체 생성
    // 'createEl':     createEl,
    // 'createText':   createText,
    'createNode': createNode,
    // 문서객체 탐색
    'parentEl':     parentEl,
    'prevEl':       prevEl,
    'nextEl':       nextEl,
    'firstEl':      firstEl,
    'lastEl':       lastEl,
    // 이벤트 제어(구형, 진보 이벤트 모델 모두 지원 업그레이드)
    'on':           on,
    'off':          off,
    // 문서객체 조작
    'prepend':      prepend,
    'append':       append,
    'insertAfter':  insertAfter,
    'insertBefore': insertBefore,
    // 문서객체 속성 제어
    'attr':         attr,
    'hasAttr':      hasAttr,
    'removeAttr':   removeAttr,
    // CSS 속성 제어
    'css':          css,
    // 클래스 속성 제어
    'hasClass':     hasClass,
    'addClass':     addClass,
    'removeClass':  removeClass,
    'toggleClass':  toggleClass,
    'radioClass':   radioClass,
    // 유틸리티
    'type':         type,
    'trim':         trim,
    'validateData': validateData,
    'isElNode':     isElNode,
    'checkError':   checkError,
    'each':         each,
    'makeArray':    makeArray,
    'removeUnit':   removeUnit,
  };

  // global.$$ = global.yamoo9;

})(this);