/*! DOM-Helper.js © yamoo9.net, 2016 */

// JS 엄격한 모드로 동작
// "use strict";

// (function(global){
  // ----------------------------------------------------------------------------

  // 데이터 유형을 정확하게 반환하는 헬퍼 함수
  function $type(data) {
    // 1. typeof      [], null을 올바르게 이야기 하지 못한다.
    // 2. instanceof  원시 데이터 유형(리터럴, 그 자체의 값)을 올바르게 이야기 하지 못한다.
    // 3. constructor 완벽해보이나.... 문제가 있다. (객체가 아닌 데이터 유형에서는 오류 발생)
    // 4. 메소드 빌려쓰기 패턴: Object.prototype.toString.call()
    // ※ jQuery.type() 같은 원리로 동작한다.
    return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
  }


  // 데이터 유형을 체크하는 헬퍼 함수
  // [필수 전달인자] data
  // [필수 전달인자] type ※ 문자열 데이터 유형만 가능!
  // [선택 전달인자] err_msg
  function validateData(data, type, err_msg) {
    // 오류 메시지 초기화
    err_msg = err_msg || '전달된 '+ data +' 인자는 요구되는 '+ type +' 데이터 유형이 아니라서 오류가 발생했습니다.';
    // 데이터 유형 검사
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

  // ----------------------------------------------------------------------------
  // 전달된 데이터의 노드 유형이 요소노드인지 확인하는 함수
  function isElNode(node) {
    return node.nodeType === 1;
  }

  // ----------------------------------------------------------------------------
  // 전달된 message를 사용하여 오류 메시지를 출력하고, 코드를 멈추는 함수
  function checkError(message) {
    validateData(message, 'string');
    throw new Error(message);
  }

  // ----------------------------------------------------------------------------
  // 문자열의 좌측, 우측의 공백을 제거하는 헬퍼 함수
  var trim = (function(){
    // 비공개 함수 (함수 내부의 함수)
    function _trimBefore(str) {
      return str.replace(/\s+/,'');
    }
    function _trimAfter(str) {
      return str.replace(/\s+$/,'');
    }
    // 공개 함수 (함수 내부에서 외부로 내보내지는(공개되는) 함수)
    return function(text) {
      return _trimAfter( _trimBefore(text) );
    }
  })();

  // ----------------------------------------------------------------------------

  // .getElementById()
  // ↑ 헬퍼 $idEl()
  function $idEl(id_name) {
    validateData(id_name, 'string', 'id 문자열을 전달해야 합니다.');
    // 유효성 검사
    // if ( !id_name || typeof id_name !== 'string' ) {
      // throw new Error('id 문자열을 전달해야 합니다.');
      // 콘솔 패널에 오류(Error)를 출력
      // console.error();
      // 함수 종료
      // return;
    // }
    return document.getElementById(id_name);
  }

  // ----------------------------------------------------------------------------

  // .getElementsByTagName()
  // ↑ 헬퍼 $tagEl(tag_name, context)
  function $tagEl(tag_name, context) {
    // STEP 1 유효성 검사
    validateData(tag_name, 'string', 'tag_name 문자열을 전달해야 합니다.');
    // if ( !tag_name || typeof tag_name !== 'string' ) {
    //   throw new Error('tag_name 문자열을 전달해야 합니다.');
    // }
    // STEP 2 찾은 요소노드 대상을 반환
    // if (!context) { context = document; }
    // return context.getElementsByTagName(tag_name);
    return (context || document).getElementsByTagName(tag_name);
  }

  // ----------------------------------------------------------------------------

  // .getElementsByClassName() IE 9+
  // ↑ 헬퍼 $classEl()
  function $classEl(class_name, context) {
    // 자바스크립트 호이스트(Hoist, 끌어올리다)
    var all_els, filtered_els = [];
    // 조건 1 IE 9+ 처리
    if ( !document.getElementsByClassName ) {
      return (context || document).getElementsByClassName(class_name);
    }
    // 조건 2 IE 8- 경우 처리
    else {
      all_els = (context || document.body).getElementsByTagName('*');
      // 반복문 (수집된 DOM 객체를 순환)
      for ( var el, i=0, l=all_els.length; i<l; i++ ) {
        el = all_els[i]; // console.log(el);
        // 조건 class 속성을 포함하고 있는지 확인
        // console.log(!!el.hasClass);
        var check_class_name = new RegExp('(\\s|^)' + class_name + '(\\s|$)');
        if( check_class_name.test( el.getAttribute('class') ) ) {
          // 조건문이 참이면 아래 코드 수행
          filtered_els.push(el);
        }
      }
      return filtered_els;
    }
    // console.log(filtered_els); // 배열
  }

  // ----------------------------------------------------------------------------

  // .querySelectorAll()
  // ↑ 헬퍼 $queryAll(selector, context)
  function $queryAll(selector, context) {
    // STEP 1 유효성 검사
    validateData(selector, 'string');
    // STEP 2 찾은 요소노드 대상을 반환
    // context 조건 확인
    if ( typeof context === 'string' ) {
      context = $query(context);
    }
    return (context || document).querySelectorAll(selector);
  }

  // ----------------------------------------------------------------------------

  // .querySelector()
  // ↑ 헬퍼 $query()
  function $query(selector, context) {
    return $queryAll(selector, context)[0];
  }

  // ----------------------------------------------------------------------------

  // 요소를 생성하는 헬퍼 함수

  // Native Code
  // var new_el = document.createElement('div');
  // document.body.appendChild(new_el);

  // Helper Function
  function $createEl(el_name, parent_el, text) {
    // 유효성 검사
    validateData(el_name, 'string');
    // 요소노드 생성
    var _el = document.createElement(el_name);
    // 조건 1. parent_el 가 있을 경우, 기존 코드 수행
    if ( parent_el ) {
      // 요소 노드인가?
      if ( isElNode(parent_el) ) {
        parent_el.appendChild(_el);
      } else {
        checkError('전달인자는 요소노드가 아닙니다. 이를 확인해주세요.');
      }
    }
    // A && B 코드는 A 값이 true 일 때 B 코드가 실행되는 조건문이다.
    // B 코드에서는 3항식을 사용하여 조건 분기문을 처리할 수 있다.
    // parent_el && isElNode(parent_el) ?
    //                  parent_el.appendChild(_el) :
    //                  checkError('전달인자는 요소노드가 아닙니다. 이를 확인해주세요.');

    // 조건: text가 있다면
    if (text) {
      $createText(text, _el);
    }

    // 생성된 _el이 참조하는 문서 요소노드를 반환
    return _el;
  }

  // ----------------------------------------------------------------------------

  // 텍스트 노드를 생성하는 헬퍼 함수
  function $createText(text, el_node) {
    // 전달인자 유효성 검사
    validateData(text, 'string');
    // 텍스트노드 생성
    var _textnode = document.createTextNode(text);
    // 조건: el_node 가 있다면
    if ( el_node && isElNode(el_node) ) {
      el_node.appendChild(_textnode);
    } else {
      return _textnode;
    }
  }

  /**
   * --------------------------------
   * 탐색 헬퍼 함수
   */
  function $parentEl(el, depth) {
    if ( !isElNode(el) ) {
      checkError('1번째 전달인자는 요소노드여야 합니다.');
    }
    depth && validateData(depth, 'number');
    depth = depth || 1;
    do {
      el = el.parentNode; // <a>, <li>, <ul>
    } while( el && isElNode(el) && --depth );

    return el;
  }

  // $prevEl 변수에 바로 실행되어 처리되는 것은 즉시 실행함수.
  var $prevEl = (function() {
    var _prevEl;
    if ( 'previousElementSibling' in HTMLElement.prototype ) {
      _prevEl = function(el) {
        // if ( !isElNode(el) ) {
        //   checkError('전달된 인자는 요소노드가 아닙니다.');
        // }
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
    // 반환되는 함수는 클로저 함수이다.
    return _prevEl;
  }());

  var $nextEl = (function() {
    var _nextEl;
    if ( 'nextElementSibling' in HTMLElement.prototype ) {
      _nextEl = function(el) {
        // if ( !isElNode(el) ) {
        //   checkError('전달된 인자는 요소노드가 아닙니다.');
        // }
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
    // 반환되는 함수는 클로저 함수이다.
    return _nextEl;
  }());

  // $firstEl(el)
  // 전달된 el 요소노드의 첫번째 자식 요소노드를 반환하는 헬퍼 함수
  var $firstEl = (function(){
    var _firstEl;
    if ( 'firstElementChild' in HTMLElement.prototype ) {
      // console.log('firstElementChild를 지원');
      _firstEl = function(el) {
        return el.firstElementChild;
      };
    } else {
      _firstEl = function(el) {
        // console.log('firstElementChild를 미지원');
        // STEP 1. el.firstChild를 참조
        el = el.firstChild;
        // 경우 1.
        // if ( el && !isElNode(el) ) {
        //   // STEP 2. el의 다음 노드가 요소 노드인지 확인할 것.
        //   el = $nextEl(el);
        // }
        // return el;
        // 경우 2.
        return el && !isElNode(el) ? $nextEl(el) : el;
      };
    }
    return _firstEl;
  })();

  // $lastEl(el)
  // 전달된 el 요소노드의 마지막 자식 요소노드를 반환하는 헬퍼 함수
  var $lastEl = (function(){
    var _lastEl;
    if ( 'lastElementChild' in HTMLElement.prototype ) {
      // console.log('lastElementChild를 지원');
      _lastEl = function(el) {
        return el.lastElementChild;
      };
    } else {
      _lastEl = function(el) {
        // console.log('lastElementChild를 미지원');
        // STEP 1. el.firstChild를 참조
        el = el.lastChild;
        // 경우 1.
        // if ( el && !isElNode(el) ) {
        //   // STEP 2. el의 다음 노드가 요소 노드인지 확인할 것.
        //   el = $prevEl(el);
        // }
        // return el;
        // 경우 2.
        return el && !isElNode(el) ? $prevEl(el) : el;
      };
    }
    return _lastEl;
  })();

  /**
   * --------------------------------
   * 조작(Manipulation) 헬퍼함수
   */
  // $hasClass()
  // elNode.classList.contains
  var $hasClass = (function(){
    var _hasClass;
    if ( 'classList' in HTMLElement.prototype ) {
      _hasClass = function(el, class_name) {
        return el.classList.contains(class_name);
      };
    } else {
      _hasClass = function(el, class_name) {
        var _check_class_name = new RegExp('(^| )'+class_name+'( |$)');
        var el_class_name = el.getAttribute('class');
        return _check_class_name.test(el_class_name);
      };
    }
    return _hasClass;
  })();

  // $addClass()
  // elNode.classList.add
  var $addClass = (function(){
    var _addClass;
    if ( 'classList' in HTMLElement.prototype ) {
      _addClass = function(el, class_name) {
        if (!el.classList.contains(class_name)) {
          el.classList.add(class_name);
        }
      };
    } else {
      _addClass = function(el, class_name) {
        // 검증!
        // 전달된 class_name 값을 el가 소유하고 있나?
        if ( !$hasClass(el, class_name) ) {
          var pre_class_value = el.getAttribute('class') || '';
          el.setAttribute('class', (pre_class_value + ' ' + class_name).trim());
        }
      };
    }
    return _addClass;
  })();

  // $removeClass()
  // elNode.classList.remove
  function _removeClassAll(el, class_name) {
    if (!class_name) { el.setAttribute('class', ''); }
  }
  var $removeClass = (function(){
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
        if ( $hasClass(el, class_name) ) {
          var el_classes = el.getAttribute('class');
          var check_class_name = new RegExp('(^| )' + class_name + '($| )', 'i');
          el_classes = el_classes.replace(check_class_name, ' ');
          el.setAttribute( 'class', el_classes.trim() );
        }
      };
    }
    return _removeClass;
  })();

  // $toggleClass()
  // elNode.classList.toggle
  var $toggleClass = (function(){
    var _toggleClass;
    if ( 'classList' in HTMLElement.prototype ) {
      _toggleClass = function(el, class_name) {
        el.classList.toggle(class_name);
      };
    } else {
      _toggleClass = function(el, class_name) {
        if ( $hasClass(el, class_name) ) {
          $removeClass(el, class_name);
        } else {
          $addClass(el, class_name);
        }
      };
    }
    return _toggleClass;
  })();


  // $radioClass(el, class_name)
  function $radioClass(el, class_name) {
    // el은 활성화 시킬 요소
    // el의 형제 요소들을 찾아서 그 중 활성화 클래스 속성을 가진 요소에서 클래스 속성 제거
    var siblings = el.parentNode.children;
    for ( var sibling, i=0, l=siblings.length; i<l; i++ ) {
      sibling = siblings[i];
      if( $hasClass(sibling, class_name) ) {
        $removeClass(sibling, class_name);
        break;
      }
    }
    // 위의 코드는 형제 요소 중에서 활성화 클래스를 가진 요소에서 활성화 클래스 속성 제거
    // 아래 코드는 자신(el)에게 활성화 클래스 속성 추가
    $addClass(el, class_name);
  }

  // 전역에 노출(공개)
  // global.yamoo9 = {
  //   'hasClass': $hasClass,
  //   'addClass': $addClass,
  //   'removeClass': $removeClass,
  //   'toggleClass': $toggleClass,
  //   'radioClass': $radioClass,
  // };

  // 별칭(Alias) 설정
  // global.$$ = global.yamoo9;

// })(this);