### 기존의 var 키워드

var 키워드로 선언하면 중복 선언이 되었으나 초기화문 유무에 따라 다르게 동작한다.
초기화 문이 있으면 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작하고 초기화문이 없는 변수 선언문은 무시 된다.
런타임에서 변수를 중복 선언하면 의도치 않게 변수 값이 변경된다.

### 함수 레벨 스코프 vs 블록 레벨 스코프

var 키워드로 선언한 변수는 오로지 함수 코드 블록만을 지역 스코프로 인정한다.
let 키워드로 선언한 변수는 모드 코드 블록(함수,if문,for문,while문,try/catch문 등)을 지역 스코프로 인정한다.

### let 변수 호이스팅

let 키워드로 선언한 변수는 스코프의 시작 시점부터 초기화 단계 시작 지점까지 변수를 참조할 수 없으며 이 구간을 TDZ 라고 부른다.

### 전역 객체

var로 선언한 전역 변수,함수, 그리고 선언하지 않은 변수에 값을 할당한 암묵적 전역은 전역객체인 window의 프로퍼티가 된다.

### const

immutable : const 키워드로 선언한 변수에 원시 값을 할당한 경우 변수 값을 변경할 수 없다.
const 키워드로 선언된 변수에 객체를 할당한 경우 값을 변경할 수 있다.
const 키워드는 재할당을 금지할 뿐 "불변"을 의미하지 않는다.
