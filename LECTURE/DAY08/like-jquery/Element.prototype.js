(function(global, $){

  'use strict';

  var old_this = null;

  $.radioClass = function(name) {
    // 기존에 name 변수에 복사된 문자 값을 class 속성으로 가진 요소에서는 해당 클래스 속성을 제거해야 한다.
    if ( old_this !== null ) {
      old_this.removeClass(name);
    }
    // ------------------------------------------------
    this.addClass(name);
    old_this = this;
    // ------------------------------------------------
    return this;
  };

  $.hasClass = function(name) {
    // ES 3
    var has_check_class = new RegExp( '(^|\\s+)' + name + '(\\s+|$)' );
    // ES 6 (2015)
    // String Template
    // var has_check_class = new RegExp( `(^|\\s+)${name}(\\s+|$)` );
    return has_check_class.test( this.getAttribute('class') );
  };

  $.toggleClass = function(name) {
    if ( this.hasClass(name) ) {
      this.removeClass(name);
    } else {
      this.addClass(name);
    }
    return this;
    // return this.hasClass(name) ? this.removeClass(name) : this.addClass(name);
  };

  $.addClass = function(name) {
    // this // DOM ElementNode
    name = name.split(' ');
    for(var i=0, l=name.length; i<l; i++) {
      this.classList.add(name[i]);
    }
    return this;
  };

  $.removeClass = function(name) {
    name = name || '*';
    if ( name === '*' ) {
      this.className = '';
      return this;
    }
    name = name.split(' ');
    for(var i=0, l=name.length; i<l; i++) {
      this.classList.remove(name[i]);
    }
  };

})(this, Element.prototype);