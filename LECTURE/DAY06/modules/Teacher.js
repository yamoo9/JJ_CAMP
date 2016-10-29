/*! Teacher.js © yamoo9.net, 2016 */

/*

선생님(teacher)
  - 과목(subject)
  - 경력(career)
  - 전공(major)

  - 이름(name)
  - 성별(gender)
  - 나이(age)
  - 키(height)
  - 몸무게(weight)
  - 건강(health)
  - 질병(sickness)

*/

(function(global, y9){
  'use strict';

  function Teacher(
    person,
    subject,
    career,
    major
  ) {
    'use strict';
    // person 인자는 생성자가 Person인가?
    if ( person.constructor !== y9.Person ) {
      throw new Error('첫번째 인자는 Person 생성자를 사용하여 생성된 객체여야 합니다.');
    }
    this.person    = person;
    this.subject   = subject;
    this.career    = career;
    this.major     = major;
    this.lecturing = lecturing;
  }

  function lecturing(what) {
    return this.person.name + '가 ' + what + '을 가르치다.';
  }

  // global.Teacher = Teacher;
  y9.Teacher = Teacher;

})(this, (this.y9 = this.y9 || {}) );