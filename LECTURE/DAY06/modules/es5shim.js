/** @String.prototype trim() */
if (!String.prototype.trim) {
  String.prototype.trimLeft = function() {
    return this.replace(/^\s+/,'');
  };
  String.prototype.trimRight = function() {
    return this.replace(/\s+$/,'');
  };
  String.prototype.trim = function() {
    return this.trimLeft().trimRight();
  };
}

/** @Array.prototype forEach() */
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function(callback) {
    // this; <= Array Instance Object
    var _this = this;
    for ( var i=0, l=_this.length; i<l; i++ ) {
      callback.call(undefined, i, _this[i]);
    }
  }
}