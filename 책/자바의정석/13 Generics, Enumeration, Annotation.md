[1. Generics](#generics)

- 컴파일 시 강타입체크, 제네릭 메서드, 와일드 카드, Comparator 쉽게 만들기

[2. Enumberation](#enums)

-

[3. Annotation](#annotation)

- 메타데이터

# Generics

### 제네릭란

다양한 타입의 객체를 다루는 메서드, 컬렉션의
컴파일 시 타입 체크 (compile-time type check)를 지원해주는 기능

### 제네릭 선언

```
public class GenericsEx1 {
	public static void main(String[] args) {
		Box<String> stringBox = new Box<>();
		stringBox.setItem("abc");

		String item = stringBox.getItem();
		System.out.println("item = " + item); // item = abc
	}
}

class Box<T> {
	T item;
	void setItem(T item) {this.item = item;}
	T getItem() {return item;}
}

```

<b>T 는 그냥 identifier 이다</b>
Type의 약자이며 상황에 맞는 변수명을 정해주면된다.
대,소문자 길이와 상관 없음

<b>T를 value로 바꾼 예시</b>

```
class Box<value> {
	value item;
	void setItem(value item) {this.item = item;	}
	value getItem() {return item;}
}
```

### 제네릭 제한사항

<b>statics</b>
컴파일 시 타입 변환이기때문에 당연히 static 사용 불가

<b>new, instanceof 연산자</b>
T를 이용한 new 연산자 사용 불가 (컴파일시 타입을 알고있어야 함)
instanceof 연산자도 마찬가지

~~<b>용어</b>~~
~~`Class Box<T>`~~
~~Box: 제네릭스의 원시 타입~~
~~T: 타입 변수~~

<b>타입추정</b>
JDK1.7 도입

```
Box<Apple> appleBox = new Box<Apple>();
Box<Apple> appleBox = new Box<>();
```

<b>상속관계</b>
`class FruitBox<T extends Fruit & Eatable> extends Box<T>{}`

FruitBox 클래스는 제네릭 클래스이며, Box<T>의 상속을 받는다.
타입 T는 Fruit을 부모 클래스로 가지며 Eatable 인터페이스를 imple한다.
즉, 부모 클래스와 인터페이스 모두 `extends`를 사용하여 상속받는다.

### 와일드 카드

<b>스태틱 메서드 매개변수에 제네릭 사용</b>
`static Juice makeJuice(FruitBox<T> box)` 와 같이 static 메서드에 특정 제네릭 클래스의 타입을 가지는 매개변수가 들어와야 할 때 사용하기 위해 만들어 졌다.

<b>형태</b>

```
<? extends T>   클래스 T와 그 자식 클래스
<? suepr T>     클래스 T와 그 부모 클래스
<?>             <? extends Object> 동일
```

<b>예시</b>

```
// Fruit 및 상속을 받은 클래스만 사용 가능
static Juice makeJuice(FruitBox<? extends Fruit> box)
// Apple 및 조상 클래스만 사용 가능
static Juice makeJuice(FruitBox<? super Apple> box)
// 모든 클래스 사용 가능
static Juice makeJuice(FruitBox<?> box)
```

### 제네릭 클래스를 이용해서 Compartor 구현하기

<b>Fruit</b>

```
class Fruit {
	String name;
	int weight;

	public Fruit(String name, int weight) {
		this.name = name;
		this.weight = weight;
	}

	@Override
	public String toString() {
		return name + "(" + weight + ")";
	}
}

class FruitComp implements Comparator<Fruit> {
	@Override
	public int compare(Fruit o1, Fruit o2) {
		return o2.weight - o1.weight;
	}
}
```

<b>Apple</b>

```
class Apple extends Fruit {
	Apple(String name, int weight) {
		super(name, weight);
	}
}

class AppleComp implements Comparator<Apple> {
	@Override
	public int compare(Apple o1, Apple o2) {
		return o2.weight - o1.weight;
	}
}

```

<b>Grape</b>

```
class Grape extends Fruit {
	Grape(String name, int weight) {
		super(name, weight);
	}
}

class GrapeComp implements Comparator<Grape> {
	@Override
	public int compare(Grape o1, Grape o2) {
		return o2.weight - o1.weight;
	}
}
```

무게를 비교한 내림차 순 Comparator 상속 클래스이다.
FruitComp만 구현해도 된다.

<b>Collections.sort() 메서드</b>

```
public static <T> void sort(List<T> list, Comparator<? super T> c) {
    list.sort(c);
}
```

Collections.sort에서 `List<T> list` 의 T 의 조상까지 검색가능하기 때문

### 제네릭 메서드

`static Juice makeJuice(FruitBox<? extends Fruit> box)`
와일드 카드
`매개변수` box는
Fruit 및 자식 클래스의 타입을 제네릭으로 가지는 FruitBox클래스이여야한다.

`static <T extends Fruit> Juice makeJuice(FruitBox<T> box)`
지네릭 메서드
`메서드`를 사용할 때 T를 가져야한다. (추정가능)
예시 : `Juicer.<Apple>makeJuice(appleBox)` or 생략(추정)가능 `Juicer.makeJuice(appleBox)`

# Enums

JDk1.5

### 열거형의 이해

```
//  enum으로 구현
enum Direction {EAST, SOUTH, WEST, NORTH}


// class로 구현
class Direction {
	static final Direction EAST = new Direction("EAST");
	static final Direction SOUTH = new Direction("SOUTH");
	static final Direction WEST = new Direction("WEST");
	static final Direction NORTH = new Direction("NORTH");

	private String name;

	private Direction(String name) {
		this.name = name;
	}
}
```

두가지는 똑같이 작동한다. (사용법은 다르다)

### 사용

<b>정의</b>

```java
enum Direction {

	// 상수
	EAST(1), SOUTH(3), WEST(-1), NORTH(10);

	// 매개변수
	private final int value;

	// 생성자 private(기본값)는 생략가능하다
	private Direction(int value) {
		this.value = value;
	}

	public int getValue(){
		return value;
	}

}
```

<b>상수 개선 - 추상메서드 추가</b>

```java
enum Direction {

	// 상수
	EAST(1,100)		{ int fare(int distance) { return distance*BASIC_FARE }},
	SOUTH(3,150)	{ int fare(int distance) { return distance*BASIC_FARE + 300}},
	WEST(-1,200)	{ int fare(int distance) { return distance*BASIC_FARE }},
	NORTH(10,300)	{ int fare(int distance) { return distance*BASIC_FARE - 200}};

	// 매개변수
	private final int value;
	private final int BASIC_FARE;

	// 생성자
	Direction(int value, int basicFare) {
		this.value = value;
		this.basicFare = BASIC_FARE;
	}

	...

	// 추상메서드
	abstract int fare(int distance);
}
```

위와 같이 추상메서드를 통해 각 방향별로 요금을 다르게 정의할 수 있다.

<b>선언</b>

```
Direction d1 = Direction.EAST;
Direction d2 = Direction.valueOf("EAST");
Direction d3 = Enum.valueOf(Direction.class, "EAST");
```

- `java.lang.Enum` 클래스 이용하기
  - `Enum.valueOf(Enum클래스, String str)`

기원 자체가 상수이기 때문에 변수명을 사용하지 않고 해당 Enum 상수값을 사용

### Enum 메서드

```
// 해당 Enum의 모든 상수값을 배열형태로 반환
Direction[] dArr = Direction.values();

Direction d = Driection.EAST;
Stirng 	상수이름 	= d.name(); 	// 상수 리터럴
int	상수인덱스 	= d.ordinal();	// 상수 인덱스 (의존하지 않는게 좋음, 컴파일러에 따름)

// Comparable
Direction.EAST.compareTo(Direction.WEST);  // -2
```

# Annotation

<b>javadoc.exe</b>
소스코드와 문서를 하나의 파일로 관리하기 위해 만든 프로그램
소스코드의 주석으로부터 HTML문서를 생성해낸다.
여기서 애너테이션 기능이 있었는데

```
/**
 * The common interface extended by all annotation types.  Note that an
 * interface that manually extends this one does <i>not</i> define
 * an annotation type.  Also note that this interface does not itself
 * define an annotation type.
 *
 * More information about annotation types can be found in section 9.6 of
 * <cite>The Java&trade; Language Specification</cite>.
 *
 * The {@link java.lang.reflect.AnnotatedElement} interface discusses
 * compatibility concerns when evolving an annotation type from being
 * non-repeatable to being repeatable.
 *
 * @author  Josh Bloch
 * @since   1.5
 */
```

<b>java.lang.<I>Annotation</I></b>
모든 애너테이션의 조상 Annotation 인터페이스
위의 @ 부분처럼 모든 문서에서 중복되는 부분을 작성하는 기능이 있었다.
즉, 주석처럼 프로그래밍 언어에 영향을 미치지 않으면서도
다른 프로그램에게 유용한 정보를 제공하는 목적

### 표준 애너테이션

<b>@Override</b>
`컴파일러`에게 `오버라이딩하는 메서드`를 알린다.
개발자의 의도가 오버라이딩인 메서드에 적어 실수를 줄이는 용도

<b>@Deprecated</b>
더 이상 사용되지 않는 `필드`나 `메서드`에 붙여
같이 사용하는 개발자에게 컴파일시 알려주는 용도

<b>@FunctionalInterface</b>
함수형 인터페이스를 선언할 때
컴파일러가 함수형 인터페이스를 올바르게 선언했는지 확인한다.

<b>@SuppressWarnings</b>
컴파일러가 보내는 경고 메시지를 무시하게 하는 용도
deprecation,
unchecked(제네릭타입경고),
rawtypes(제네릭사용을 하지않는 경고)
varargs(가변인자가 제네릭인 경고)

<b> + 컴파일, 빌드 `-Xlint` 옵션</b>

```
PS C:\...\ch12\annotation> javac Ex1.java
Note: Ex1.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

```

deprected API를 사용하고있다고 알려줌

```
PS C:\...\ch12\annotation> javac -Xlint Ex1.java
Ex1.java:11: warning: [deprecation] oldField in NewClass has been deprecated
                nc.oldField = 10;
                  ^
1 warning
```

<b>@SafeVarags</b>
메서드의 가변인자가 reifiable이 아닌 경우 발생하는 메서드의 경고를 무시하게 하는 용도

reifiable: 컴파일 후에도 타입정보가 유지되는 타입
컴파일 후에 타입정보가 유지되지 않는 타입: 제네릭타입(컴파일시 대체 및 제거됨)

`@SuppressWarnings("unchecked")` 와 다른 점은
선언하는 곳에만 적어주면 호출하는 곳에서는 적어주지 않아도 된다.

컴파일 과정에서 메서드 매개변수에 선언된 `<T>`의 경우
Object로 바뀌게 되는데 모든 타입에 대해 열려있어 컴파일러는 경고를 보낸다.

즉, 제네릭을 매개변수로 사용하는 메서드에서 해당 identifier에 제한이 걸어준 다음
메서드의 가변인자가 타입 안정성을 갖게 되게 했을 때 컴파일러에게 알려주기 위해 작성한다.

대괄호 안에 해당 경고 키워드와 소스코드를 보여줌

<b>+ 예시</b>

<b>컴파일 할 코드</b>

```java
package ch12.annotation.varargs;

import java.util.Arrays;

public class AnnotationEx4 {
	public static void main(String[] args) {
		MyArrayList<String> list = MyArrayList.asList("1", "2", "3");
		System.out.println("list = " + list);
	}
}

class MyArrayList<T> {
	T[] arr;

	public MyArrayList(T... arr) {
		this.arr = arr;
	}

	// <T>는  <T extends Object>
	// 메모리 pollution이 발생 가능성
	public static <T> MyArrayList<T> asList(T... a){
		return new MyArrayList<>(a);
	}

	@Override
	public String toString() {
		return Arrays.toString(arr);
	}
}

```

<b>컴파일 경고</b>

```java
PS C:\workspace\Local\Example\JAVA\src\ch12\annotation\varargs> javac -Xlint AnnotationEx4.java

// unchekced
// 생성자 경고
AnnotationEx4.java:15: warning: [unchecked] Possible heap pollution from parameterized vararg type T
        public MyArrayList(T... arr) {
                                ^
  where T is a type-variable:
    T extends Object declared in class MyArrayList

// unchecked
// static 제네릭 메서드 경고
AnnotationEx4.java:19: warning: [unchecked] Possible heap pollution from parameterized vararg type T
        public static <T> MyArrayList<T> asList(T... a){
                                                     ^
  where T is a type-variable:
    T extends Object declared in method <T>asList(T...)

2 warnings
```

<b>해결</b>

```java
@SafeVarargs
@SuppressWarnings("varargs")
public MyArrayList(T... arr) {
	this.arr = arr;
}

@SafeVarargs
@SuppressWarnings("varargs")
public static <T> MyArrayList<T> asList(T... a){
	return new MyArrayList<>(a);
}
```

`@SafeVarargs`는 `uncheked` 경고만 억제
`varargs` 경고는 억제하지 못하기 때문에 같이 써준다.

### 메타 애너테이션

<b>애너테이션을 정의하기 위해 사용하는 애너테이션</b>
적용대상(target), 유지기간(retention), 애너테이션상속하기(inherited),
여러애너테이션사용가능(repeatable), docs포함여부(documented),
네이티브 메서드사용(native)

<b>@Target</b>
해당 애너테이션이 적용가능한 대상을 지정한다.

```
ANNOTATION_TYPE		애너테이션에 사용가능한 애너테이션
CONSTRUCTOR		생성자
FIELD			멤버변수, ENUM상수
LOCAL_VARIABLE		지역변수
METHOD			메서드
PACKAGE			패키지
PARAMETER		매개변수
TYPE			타입 (클래스, 인터페이스, ENUM)		// 해당 타입을 선언할 때 사용가능
TYPE_PARAMETER		타입 매개변수				// 해당 타입을 매개변수로 사용할때 사용가능
TYPE_USE		타입이 사용되는 모든 곳			// 해당 타입을 사용해 변수를 만들거나 그 외 모든 곳
```

중괄호로 여러 개의 값 지정하기 (@SuppressWarnings 애너테이션)

```java
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE})
@Retention(RetentionPolicy.SOURCE)
public @interface SuppressWarnings { ... }
```

<b>@Retention</b>
애너테이션이 유지되는 기간을 지정한다.
아래는 애너테이션 유지 정책 종류

```
SOURCE			소스 파일에만, 클래스 파일에는 존재하지 않음
CLASS(기본값)		클래스 파일에만 존재, 실행 시 사용불가
RUNTIME			클래스 파일에반 존재, 실행 시 사용가능
```

1.SOURCE
컴파일러가 직접 사용하는 애너테이션
`@Override` `@SuppressWarnings`

2.CLASS
컴파일 시 컴파일러가 해당 애너테이션을 class 파일에 저장을 하나
JVM이 class 파일을 로딩 할 때는 무시된다.

3.RUNTIME
실행 시 리플렉션(reflection)을 통해 클래스 파일에 저장된 애너테이션을 사용
`@FunctionalInterface` : 컴파일러가 사용도 하지만 실행 시에도 사용이된다.

(지역 변수에 붙은 애너테이션은 컴파일러만 인식할 수 있다.)

<b>@Documented</b>

<b>@Inherited</b>
애너테이션이 자손 클래스에 상속되도록 한다.
부모 클래스에 붙이면 자손 클래스에 모든 애너테이션들이 상속된다.

<b>@Repeatable</b>
`@Repeatable(ToDos.class)`를 붙이면
@ToDos 애너테이션을 여러번 붙일 수 있다.

```java
@interface ToDos{
	ToDo[] value();			// ToDo 애너테이션 배열타입 (반드시 value)
}

@Repeatable(ToDos.class)
@interface ToDo {
	String value();
}

@ToDo("할일1")
@ToDO("할일2")
class MyClass {
	...
}
```

<b>@Native</b>
네이티브 메서드에 의해 참조되는 `상수 필드 (constant field)` 에 붙이는 애너테이션

네이티브 메서드: JVM이 설치된 OS의 메서드
자바에서는 메서드 선언부만 정의하고 구현은 하지 않는다.

그냥 네이티브 메서드만 선언해 놓고 호출한다고 되는 것은 아니다.
자바에 정의도니 네이티브 메서드와 OS의 메서드를 연결해주는 작업이 추가로 필요하다.
`JNI (Java Native Interface)` 가 그 역할을 한다.

### 사용자정의 애너테이션

```java
import java.lang.annotation.Annotation;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Deprecated
@SuppressWarnings("그냥무시되는애너테이션")
@TestInfo(testedBy = "aaa", testDate = @DateTime(yymmdd = "221102", hhmmss = "162800"))
public class AnnotationToClass {

	public static void main(String[] args) {

		Class<AnnotationToClass> cls = AnnotationToClass.class;
		TestInfo anno = (TestInfo) cls.getAnnotation(TestInfo.class);

		System.out.println("anno.testedBy() = " + anno.testedBy());
		System.out.println("anno.testDate().yymmdd() = " + anno.testDate().yymmdd());
		System.out.println("anno.testDate().hhmmss() = " + anno.testDate().hhmmss());

		System.out.println();
		for (String str : anno.testTools()) {
			System.out.println("str = " + str);
		}

		System.out.println();
		Annotation[] annotations = cls.getAnnotations();
		for (Annotation a : annotations) {
			System.out.println("a = " + a);
		}

	}

}

@Retention(RetentionPolicy.RUNTIME)
@interface TestInfo {
	int count() default 1;

	String testedBy();

	String[] testTools() default {"JUnit", "AutoTester"};

	TestType testType() default TestType.FIRST;

	DateTime testDate();

}

@Retention(RetentionPolicy.RUNTIME)
@interface DateTime {
	String yymmdd();

	String hhmmss();
}

enum TestType {
	FIRST, FINAL
}
```

<b>모든 애너테이션의 조상은 java.lang.annotation.Annotation 인터페이스다.</b>
하지만 상속이 허용되지 않으므로 명시적으로 조상을 지정할 수 없다.
인터페이스이기 때문에 모든 애너테이션 객체는 컴파일이후 equals(), hashCode(), toString() 같은 메서드 호출이 가능하다.

<b>마커 애너테이션</b>
값을 지정할 필요가 없는 경우, 애너테이션의 요소를 정의하지 않을 수 도있다.

<b>애너테이션 요소 규칙</b>

1. 허용타입: 원시형, String, enum, annotation, class
2. 매개변수는 가질 수 없다.
3. 예외를 가질 수 없다.
4. 요소를 타입의 매개변수로 정의할 수 없다.
