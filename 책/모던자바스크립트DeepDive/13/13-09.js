var x = 1;

function foo() {
  var x = 10;
  bar();
}

//bar는 전역 스코프에 할당되어 있기 때문에 어디인지 관계없이 언제나 자신의 전역 스코프를 상위 스코프로 사용한다.
function bar() {
  console.log(x);
}

foo(); //1
bar(); //1
