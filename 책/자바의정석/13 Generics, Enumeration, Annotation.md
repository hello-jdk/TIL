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
