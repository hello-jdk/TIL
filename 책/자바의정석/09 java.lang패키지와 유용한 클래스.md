# java.lang

- 자바 프로그래밍의 기본 클래스
- import문 없이 사용가능

## Object 클래스

### Object.equals(Object obj)

```
    public boolean equals(Object obj) {
        return (this == obj);
    }
```

- 참조 주소를 비교한다.

### Object.hashCode()

- 해싱

  - 데이터 관리기법: 다량의 데이터 저장과 검색에 유용
  - 찾고자하는 `값`을 입력하면 저장된 위치인 `해시코드`를 반환

- `String` 클래스는 문자열이 같으면 같은 같은 해시코드를 반환하도록 오버라이딩 되있음

`System.identityHashCode()`: 참조주소값을 이용한 해시코드

### Object.toString()

인스턴스 정보를 `문자열`로 제공할 목적

```
    public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }
```

- int 배열을 sout으로 찍으면 `[I@123123123` 이런 유형으로 나오는 이유

### Object.clone()
