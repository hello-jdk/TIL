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

# 애너테이션
