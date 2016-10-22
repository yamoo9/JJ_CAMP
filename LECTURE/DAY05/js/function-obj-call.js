/*! 함수 .call(), .apply() © yamoo9.net, 2016 */

var a = {
  'name': 'alpha',
  'getName': function() {
    return this.name;
  }
};

var b = {
  'name': 'beta',
  'setName': function(name) {
    this.name = name;
  }
};

/////////////////////
// 메소드 빌려쓰기 패턴 //
/////////////////////
a.getName.call(b); // 'beta'

b.setName.call(a, '알파'); // a { 'name': '알파', ... }