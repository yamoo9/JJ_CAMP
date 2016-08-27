/*! javascript-object-oriented.js © yamoo9.net, 2016 */

// 객체 생성하는 생성자 => 함수
// 객체를 생성하기 위해서는 함수 앞에 new 키워드를 사용
(function(global){
  // 엄격 모드 사용 시,
  // 생성자 함수 내부에 선언된 this가 window 객체를 참조하지 못하도록 하기 위해,
  // new 키워드를 사용하지 않을 경우 콘솔에 오류를 출력한다.
  // ※ new를 강제화하는 패턴을 사용하여 문제를 해결할 수도 있다.
  'use strict';

  // 생성자 함수 (일반 함수)
  function RCCar(driver) {
    // 디자인 패턴: 오류를 사전에 방지하기 위한 목적으로 사용
    // new를 강제화 하는 패턴
    // 엄격모드에서는 생성자 함수 내부의 this 참조 변수가 new를 사용하지 않았을 때
    // this는 undefined 값이 되므로 아래와 같은 비교 구문을 추가한다.
    if ( this === undefined || this.constructor !== RCCar ) {
      return new RCCar(driver);
    }
    this.driver = driver;
  }

  // console.log('window.driver:', global.driver);

  var m_car = new RCCar('민용'); // new 키워드를 사용하여 객체를 생성한 예
  var k_car = RCCar('기석');     // new 키워드를 사용하지 않았을 때 (오류 발생이 없도록 조치)

  // console.log('window.driver:', global.driver);

})(this);

// 생성자 함수와 프로토타입 객체
(function(global){
  'use strict';

  // [상위 객체 생성자 함수]
  function superF() {}
  superF.prototype.look = function() { console.log('보다'); };

  // --------------------------------------------------------------

  // var sf = new superF();
  // sf.look(); // 프로토타입 객체의 능력 사용

  // --------------------------------------------------------------

  // [하위 객체 생성자 함수]
  function F() {}
  // 생성자 함수의 .prototype 속성에 연결된 원형(Prototype) 객체
  console.log(F.prototype);

  // --------------------------------------------------------------

  // [상속]
  // 상위 객체의 능력을 하위 객체가 물려 받는 것.
  // 다른 객체 생성자 함수 정의
  // superF.prototype의 능력을 F.prototype에 상속
  // F.prototype = new superF(); // superF{}
  // F.prototype.constructor = F;

  // 상속 과정을 추상화한 헬퍼 함수
  // ECMAScript 3rd Edition
  function inherit(klass, superKlass) {
    klass.prototype = new superKlass();
    klass.prototype.constructor = klass;
  }

  // ECMAScript 5th Edition
  function inherit(klass, superKlass) {
    var type = Object.prototype.toString.call(superKlass).slice(8,-1).toLowerCase();
    if ( type !== 'function' || type !== 'null' ) {
      throw new Error('superKlass는 반드시 함수, 또는 null 데이터 유형이어야 합니다.');
    }
    klass.prototype = Object.create(superKlass && superKlass.prototype, {
      'constructor': {
        'enumerable': false,
        'writable': true,
        'value': klass,
        'configurable': true
      }
    });
    if (superKlass) {
      Object.setPrototypeOf ? Object.setPrototypeOf(klass, superKlass) : klass.__proto__= superKlass;
    }
  }

  // Babel ES5 컴파일러의 _inherits
  // function _inherits(subClass, superClass) {
  //   if (typeof superClass !== "function" && superClass !== null) {
  //     throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  //   }
  //   subClass.prototype = Object.create(superClass && superClass.prototype, {
  //     constructor: {
  //       value: subClass,
  //       enumerable: false,
  //       writable: true,
  //       configurable: true
  //     }
  //   });
  //   if (superClass)
  //     Object.setPrototypeOf ?
  //       Object.setPrototypeOf(subClass, superClass) :
  //       subClass.__proto__ = superClass;
  // }

  inherit(F, superF);

  // ECMAScript 2015(6th) Edition
  // 상속을 언어 차원에서 지원
  // class를 지원, super 키워드 사용
  // class SuperF {}
  // class F extends SuperF {}

  // --------------------------------------------------------------

  // 생성자 함수를 사용하여 생성한 객체(Instance)
  var f = new F();
  f.look();
  console.log(f);

})(this);