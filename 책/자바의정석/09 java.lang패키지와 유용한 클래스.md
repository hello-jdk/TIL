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

### Object.hashCode() `native`

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

### Object.clone() `native`

단순한 인스턴스 변수의 값만 복사
즉, 완전한 인스턴스 복제가 이루어지지는 않는다.

1. `Point` 클래스 생성 후 override

```
 @Override
    protected Object clone() {
        Object obj = null;
        try{
            obj = super.clone();
        }catch (CloneNotSupportedException e){
            System.out.println("Point.clone Exception");
        }
        return obj;
    }
```

2. 깊은 복사

인스턴스를 새로 생성하는 로직이 필요하다.

```
origin = Point@1b6d3586
clone = Point@4554617c
```

#### 공변 반환타입

조상 메서드의 반환 타입을 자손 메서드에서 반환타입을 변경할 수 있다.

- JDK1.5

#### 배열에서의 `clone()`

```
// 1
int[] arr = {1,2,3,4,5};
int[] arrClone = arr.clone;

// 2
int[] arr = {1,2,3,4,5};
int[] arrClone = new int[arr.length];
System.arraycopy(arr,0,arrClone,0,arr.length);
```

- 위의 1과 2는 동일

### Object.getClass()

클래스 파일이 '클래스 로더'에 의해 메모리에 올라갈 때, 자동으로 생성된다.

- 클래스로더
  - 클래스 파일(.class)을 메모리에 로드하고 변환하는 일을 한다.
  - 즉, 리터럴로 존재하는 파일의 코드를 읽고 관리

#### 클래스의 정보가 필요할때

```
// 1. 생성된 인스턴스에게 얻음
Class cObj = new Card().getClass();

// 2. 클래스 리터럴에게 얻음
Class cObj = Card.class();

// 3. 클래스 이름으로 얻음
Class cObj = Class.forName("Card");
```

## String 클래스

- immutable 클래스
  - 수정이 불가능
  - 덧셈연산자`+`를 이용한 수정은 새로운 메모리 주소를 가지게 된다
  - 결합, 추출 등 문자열을 다루는 작업이 많은 경우 `StringBuffer` 클래스를 사용하는 것이 좋다.
- 문자 리터럴
  - 클래스 파일에 직접 생성된다.

### String.join(String 구분자, 배열)

해당 배열을 구분자로 문자열 객체로 반환

- StringJointer: 클래스를 이용한 Join

```
StringJoiner sj = new StringJoiner(",", "[", "]");
String[] strArr = {"aaa","bbb","ccc"};

for(String s: strArr)
    sj.add(s);

soutv // [aaa,bbb,ccc]
```

#### 리터럴의 인코딩

- 자바는 기본적으로 `UTF-16`
- 문자열 리터럴에 포함되는 문자는 `OS`의 인코딩에 종속적이다.

- `getBytes(String charsetName)` 으로 해당 리터럴을 해당 인코딩의 바이트 값으로 얻을 수 있다.

- UTF-8
  - 한글: 3byte
  - 영문: 2byte

#### `String.valueOf`와 `Integer.parseInt`

valueOf는 String.format()과 달리 일반적인 원시형 변수를 String 으로 반환해준다. 래퍼 클래스의 parseXXX는 리터럴을 해당 래퍼클래스에 맞는 원시형 타입으로 `오토박싱`해주는 것

### StringBuffer

String 클래스와 유사하나 몇가지가 다르다.
성능에 관련이 있어서 사용한다.

1. 생성자

```
 public StringBuffer() {
        super(16);
    }

 public StringBuffer(int capacity) {
        super(capacity);
    }

 public StringBuffer(String str) {
        super(str.length() + 16);
        append(str);
    }
```

2. equals()

오버라이딩 안되있어 `==`와 같은 역할을 한다.
즉, 비교를 위해선 toString()으로 변경 후 비교해야한다.

### StringBuilder

StringBuffer와 완전히 동일하나 버퍼는 `thread safe`하도록 동기화가 되어있다.

String Builder는 쓰레드 동기화만 제거만 버전

## Math 클래스

OS의존적 (StrictMath class 사용)

### 올림, 버림, 반올림

리턴타입: long

## Wrapper 클래스

원시형 타입을 객체로 저장해야할 때 사용

### Wrapper 클래스 상속계층도 (Number)

1. Object
   - 2. Boolean
   - 2. Character
   - 2. Number
        - Byte
        - Short
        - Integer
        - Long
        - Float
        - Double
        - BigInteger (long으로도 다룰 수 없는 큰 정수)
        - BigDecimal (double로도 다룰 수 없는 큰 정수)

### 문자열을 숫자로 표현하는 방법들

```
int     i   =   new Integer("100").intValue();
int     i2  =   Integer.parseInt("100");
Integer i3  =   Integer.valueOf("100");
```

### 오토박싱

- JDK1.5 이전: 원시형타입을 객체로 변환 후 연산
- 컴파일러가 객체를 원시형 타입으로 자동변환 (언박싱)

책의 설명이 조금 이상한데 조금 찾아보고 정리를 하자면

- autoBoxing: 원시형 -> 객체
- unboxing: 객체 -> 원시형

이며 컴파일러는 `autoBoxing`을 해준다.

- 컴파일러는 원시 타입이 두 가지의 경우에 해당할 때 autoBoxing을 적용한다.

1. 원시형이 래퍼 클래스의 타입의 파라미터를 받는 메서드를 통과할 때

```
public class Test {
    private int text;

    public Integer getText() {
        return text; // Integer.valueOf(text);
    }
}
```

즉, 원시형의 타입을 상관관계가 있는 래퍼 클래스의 리턴값을 가질때 오토박싱이 적용

2. 원시형이 래퍼 클래스의 변수로 할당될 때

```
public class Test {
    public static void main(args){
        int a = 1;
        foo(a); // foo(Integer.valueOf(a))
    }

    public int foo(Integer text){
        ...
    }
}
```

강제 형변환도 같은 형태로 적용

# java.util

## Objects 클래스

### 널(null) 비교

- boolean isNull(Object obj)
  - true: Null
- boolean nonNull(Object obj)
  - true: notNull
- boolean requireNonNull(Object obj,String ExceptionMsg)
  - true: notNull
  - false: throw Exception(msg);

### 비교

- static int copare(Object a, Object b, Comparator c)

아래 equals는 java.lang.Object을 overide
Null 검사가 필요없다.

- static boolean equals(Object a, Object b)
- static boolean deepEquals(Object a, Object b)

## Random

Math클래스가 이것을 상속한것 엄밀히 override는 아니고 인스턴스 만들어서 가져온것

```
double randNum = Math.random();
double randNum = new Random().nextDouble();
//동일
```

### nextXXX() 이외의 메서드

- int[] fillRand(int[] arr, int from, int to)
- int[] fillRand(int[] arr, int[] data)
- int getRand(int from, int to)

## regex 패키지

정규식 (Regular Expression)

- java.util.regex.Pattern `API 문서`
- java.util.regex.Matcher

### 정규식 정의와 비교

```
public static void main(String[] args) {
    String[] data = {"bay", "baby", "bonus", "cA", "ca", "co", "c.", "c0", "car", "combat", "count", "date", "disc"};

    Pattern p = Pattern.compile("c[a-z]*"); // 1

    for (String v : data) {
        Matcher m = p.matcher(v); // 2
        if (m.matches()) {
            System.out.println(v);
        }
    }
}
```

1. `Pattern.compile(String regex)` 정규식 정의
2. Matcher `Pattern.matcher(String value)` 값 입력
3. `Matcher.matches()` 정규식 비교

### 정규식 패턴 예시

```
c[a-z]*
c[a-z]
c[a-zA-Z]
c[a-zA-Z0-9]
c\w
.*
c.
c\.
c\d
c[0-9]
c.*t
[b|c].*
[bc].*
[b-c].*
[^b|c].*
[^bc].*
[^b-c].*
.*a.*
.*a.+
[b|c].{2}
```

- `[]`: 한자리를 나타냄
- `*`: 모든 문자 (없어도 찾아줌)
- `+`: 한 문자이상
- `.`: 한 문자
- `|`: 또는
  - `[|]`경우 생략가능
  - `[a-zA-Z]`: a부터z와 A-Z인 문자하나
- `{}`: 자리수
  - `{2,5}`: 최소2자리 최대5자리
- `\`: 이스케이프
  - `\.` : dot (`.`)
  - `\d` : 숫자
  - `\w` : 모든 문자 (word)

1. `c.*t`: c로 시작하고 t로 끝나는 문자
2. `[bc].*`: b나 c로 시작하는 문자
3. `.*a.+`: a로 시작하거나 중간에 a가 있지만 a로 끝나지는 않는 문자
4. `[bc].{2}`: b나 c로 시작하며 아무문자나 2개있는 3자리 단어
5. `0\\d{4,8}`: 0으로 시작해서 최소 4 ~ 최대 8자리를 갖는 숫자 단어

### 로렌입숨 예제

```
public static void main(String[] args) {
    // 로렌입숨, 패턴, 스트링버퍼
    String source = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    String pattern = "[Ll]orem [Ii]psum";
    StringBuffer sb = new StringBuffer();

    // 패넡 컴파일, 매쳐에 소스넣기, 원본출력
    Pattern p = Pattern.compile(pattern);
    Matcher m = p.matcher(source);
    System.out.println("before = \n" + source);

    // m.find()로 찾기
    int i = 0 ;
    while(m.find()){
        System.out.println(++i + "번째 매칭:" + m.start() + "~" + m.end());
        m.appendReplacement(sb, "로렌 입숨"); // 찾은부분 replace
    }
    m.appendTail(sb); // 마지막 매칭 이후로 남은 소스 붙여넣기

    System.out.println("치환된 갯수 = " + i);
    System.out.println("after = \n" + sb);
}
```

결과

```
before =
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

1번째 매칭:0~11
2번째 매칭:75~86
3번째 매칭:446~457
4번째 매칭:562~573
치환된 갯수 = 4

after =
로렌 입숨 is simply dummy text of the printing and typesetting industry. 로렌 입숨 has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 로렌 입숨 passages, and more recently with desktop publishing software like Aldus PageMaker including versions of 로렌 입숨.
```

## Scanner 클래스

JDK1.5

### CLI 구현 예시

```
public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    String[] argArr = null;

    while (true) {
        // 프롬프트
        String prompt = ">>";
        System.out.print(prompt);

        // 한줄씩 read
        String input = s.nextLine();

        // trim -> command 추출 및 배열화 -> trim
        input = input.trim();
        argArr = input.split(" +"); // 하나이상의 공백
        String command = argArr[0].trim();

        // 공백처리
        if ("".equals(command)) continue;

        // command 소문자 통일
        command = command.toLowerCase();

        if (command.equals("q")) {
            break;
        } else {
            for (int i = 1; i < argArr.length; i++) {
                System.out.println("argArr[" + i + "] = " + argArr[i] + "\tlength = " + argArr[i].length());
            }
        }
    }
}
```

결과

```
>>command           a            b             dd
argArr[0] = command	length = 7
argArr[1] = a	length = 1
argArr[2] = b	length = 1
argArr[3] = dd	length = 2
```

## StringTokenizer 클래스

구분자를 이용하여 여러 토큰을 잘라내는데 사용

- Tokenize 하는 방식
  1. 정규표현식 사용
     - String(or리터럴)의 split(String regex)
     - Scanner의 useDelimiter(String pattern)
  2. 구분자문자열입력
  - StringTokenize

> 구분하면서 로직을 수행하려면 StringTokenize를 사용하라

### 예시

```
public static void main(String[] args) {
    String source = "100,200,300,400,500";

    // StringTokenize(String str, Strin delim)
    StringTokenizer st = new StringTokenizer(source, ",");

    // StringTokenize(String str, String delim, boolean returnDelims)
    StringTokenizer st2 = new StringTokenizer(source, ",", true);

    int i = 0 ;
    while(st.hasMoreTokens()){
        System.out.println(++i +": "+st.nextToken());
    }

    System.out.println("st1 TokenCount = " + i);

    int j = 0;
    while(st2.hasMoreTokens()){
        System.out.println(++j +": "+st2.nextToken());
    }

    System.out.println("st2 TokenCount = " + j);
}
```

결과

```
1: 100
2: 200
3: 300
4: 400
5: 500
st1 TokenCount = 5

1: 100
2: ,
3: 200
4: ,
5: 300
6: ,
7: 400
8: ,
9: 500
st2 TokenCount = 9
```

- `delim` 파라미터에 여러 구분자 동시입력이 가능하다
  - `"+-*/=()"`

### 한글 -> 아라비아 숫자 변환 예시

```
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String prompt = ">>";
    while (true) {
        System.out.print(prompt);
        String source = sc.next();

        if(source.trim().equals("q"))
            break;

        long l = hangulToNum(source);
        System.out.println("l = " + l);
    }

}

public static long hangulToNum(String input) {
    final String NUMBER = "영일이삼사오육칠팔구"; // 한자리 이상의 숫자단어는 사용x
    final String UNIT = "십백천만억조"; // 십백천 과 만억조 (ex. (십백천) 조 (십백천) 억 (십백천) 만)
    final long[] UNIT_NUM = {10, 100, 1000, 10000, (long) 1e8, (long) 1e12};

    long result = 0;    // 만,조,억 단위가 나올때 저장하는 공간
    long tmpResult = 0; // 만,조,억 단위 사이의 저장공간
    long num = 0;       //

    // 십백천만억조 구분자로 토크나이징
    StringTokenizer st = new StringTokenizer(input, UNIT, true);

    // 구분자마다 반복
    while (st.hasMoreTokens()) {
        String token = st.nextToken();

        // 단위 or 숫자 check
        int check = NUMBER.indexOf(token);

        // 구분자일 경우
        if (check == -1) {

            // 만,억,조 사이의 경우 === (십,백,천)
            // num에 저장된 숫자가 없을 경우 1 // 십만 -> 10 저장
            // token의 단위에 (십,백,천) 맞춰 tmpResult에 저장
            if ("만억조".indexOf(token) == -1) {
                tmpResult += (num != 0 ? num : 1) * UNIT_NUM[UNIT.indexOf(token)];
            }
            // 만,억,조 경우
            // 자릿수 일의 경우를 위해 num 저장
            // tmpResult에 저장된 숫자가 없는 경우 1 // 만 -> 1
            // token 단위에 맞춰서 result에 저장
            // tmpResult 리셋
            else {
                tmpResult += num;
                result += (tmpResult != 0 ? tmpResult : 1) * UNIT_NUM[UNIT.indexOf(token)];
                tmpResult = 0;
            }

            // 다음 구분자를 위한 리셋
            num = 0;
        }
        // 구분자가 아닐 경우 해당 숫자 저장
        else {
            num = check;
        }
    }

    return result + tmpResult + num;
}
```

- 숫자도 한자리, 단위도 한자리
  - 한음절이 하나의 토큰

1. whlie(`토큰이 숫자? 단위?`)

- `case1` 숫자

  - num에 저장

- `case2` 단위
  - `case A` 십백천
    - num -> tmp
    - tmp == 0 ? 1 : tmp;
    - (십백천) 곱하기
    - tmp에 저장
  - `case B` 만천조
    - num -> tmp
    - tmp == 0 ? 1 : tmp;
    - (만천조) 곱하기
    - result에 저장
    - tmp 초기화
- `공통` num 초기화

2. 토큰이 더 이상 없을 경우

   - result: 만 단위 이상의 숫자.
   - tmpResult: 만 단위 미만 십 단위 이상. (9999~10)
   - num: 일의자리.

3. 모두를 합친 값 출력
   - reulst + tmpResult + num

## BigInteger 클래스

큰 정수

- BigInteger.MAX_VALUE = (+-2)^(Integer.MAX_VALUE)

불변타입
10진수 10^(6억)정도
비트연산 메서드 제공

## BitDecimal

정확한 소수

- scale(범위): 0 ~ Integer.MAX_VALUE

불변타입
double 타입 매개변수를 사용하면 안됨
산술연산 메서드 제공
반올림 메서드 제공
