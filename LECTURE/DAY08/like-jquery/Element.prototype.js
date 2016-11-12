if ( !('addClass' in Element.prototype) ) {
  Element.prototype.addClass = function(name) {
    // this // DOM ElementNode
    name = name.split(' ');
    for(var i=0, l=name.length; i<l; i++) {
      this.classList.add(name[i]);
    }
    return this;
  };

  Element.prototype.removeClass = function(name) {
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
}