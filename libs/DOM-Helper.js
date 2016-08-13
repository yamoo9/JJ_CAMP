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

  function parentEl(el, depth) {
    if ( !isElNode(el) ) {
      checkError('1번째 전달인자는 요소노드여야 합니다.');
    }
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
    elNode.style[property] = value;
  }

  function css(elNode, property, value) {
    if ( !value ) {
      // GETTER
      return getStyle(elNode, property);
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
        makeArray(list).forEach(function(item, index) {
          callback.call(item, item, index);
        });
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
        return Array.from(data);
      }
    } else {
      return function (obj) {
        if ( obj.length && type(obj) !== 'string' && !obj.pop ) {
          for(var basket=[], i=0, l=obj.length; i<l; i++) {
            basket.push(obj[i]);
          }
          return basket;
        } else {
          return [];
        }
      };
    }
  })();

  global.yamoo9 = {
    // 문서객체모델 선택
    'query':        query,
    'queryAll':     queryAll,
    // 문서객체 생성
    'createEl':     createEl,
    'createText':   createText,
    // 문서객체 탐색
    'parentEl':     parentEl,
    'prevEl':       prevEl,
    'nextEl':       nextEl,
    'firstEl':      firstEl,
    'lastEl':       lastEl,
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
  };

  // global.$$ = global.yamoo9;

})(this);