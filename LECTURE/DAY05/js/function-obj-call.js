/*! 함수 .call(), .apply() © yamoo9.net, 2016 */

var a = {
  'name': 'alpha',
  'getName': function() {
    return this.name;
  }
};

var b = {
  'name': 'beta',
  'nickname': 'betago',
  'setName': function(name, nickname) {
    this.name = name;
    this.nickname = nickname;
  }
};

/////////////////////
// 메소드 빌려쓰기 패턴 //
/////////////////////

// .call(), .apply()는 기능면에서는 유사하나,
// 전달 인자의 개수가 2개 이상일 때, .call()의 경우 낱개로 전달
// .apply()의 경우는 배열 유형으로 전달

// .call()
// a.getName.call(b); // 'beta'
// .apply()
var b_name = a.getName.apply(b); // 'beta'
console.log(b_name);

// .call()
// b.setName.call(a, '알파', '알파고'); // a { 'name': '알파', ... }
// .apply()
b.setName.apply(a, ['알파', '알파고']); // a { 'name': '알파', ... }



// arguments 객체, ES3 (ECMAScript 3rd Edition)
function sum() {
 // arguments 객체 (존재)
 // console.log(arguments, arguments.length, 'push' in arguments);
  var k = 0, arg, l = arguments.length;
  while( (arg=arguments[--l]) ) {
    k += arg;
  }
  return k;
  // var i=0, m=i, l=arguments.length;
  // for(; i<l; i++) {
  //  m += arguments[i];
  // }
  // return m;
}

sum(213, -10, 90, 11, 1023); // ???
sum(1, 2, 3, 4, -109); // ???


// [ES3]
function getSomeCoffee3() {
     var who = arguments[0];
     var people_counts = [].slice.call(arguments, 1);
     console.log(who);
     console.log(people_counts);
}

// [ES6] rest parameter
// chrome, firefox
function getSomeCoffee6(who, ...people_counts) {
     console.log(who);
     console.log(people_counts);
}

// [ES6] default parameter & template string & interpolation
function borderRadius( radius = '4px' ) {
  return `
    -webkit-border-radius: ${radius};
    -moz-border-radius: ${radius};
    border-radius: ${radius};
  `;
}