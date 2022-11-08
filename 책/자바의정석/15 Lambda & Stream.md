# 람다 lambda

<b>익명 객체</b><br>
람다식은 실제로는 익명 객체이다.
자바는 인터페이스를 정의해서 람다식을 다룬다.

<b>함수형 인터페이스</b><br>
오직 하나의 추상 메서드로만 정의된다.

## 선언과 구현

```
public class LambdaEx1 {
    public static void main(String[] args) {
        MyFunction f1 = new MyFunction() {
            @Override
            public void run() {
                System.out.println("f1.run()");
            }
        };
        MyFunction f2 = () -> System.out.println("f2.run()");

        f1.run();
        f2.run();

        execute(f1);
        execute(()-> System.out.println("execute ()-> sout"));
    }

    private static void execute(MyFunction f) {
        f.run();
    }
}

@FunctionalInterface
interface MyFunction{
    void run();
}
```

<b>인터페이스 구현체</b><br>
1번은 인터페이스로 인스턴스를 만들기위해 구현체를 작성한 것이며 2번과 똑같이 작동한다.

<b>익명의 객체이기에 매개변수로 전달이 가능하다</b><br>
객체는 참조주소값을 가지고 있고 이 말은 매개변수로 전달이 가능하다는 말이다.
즉, 메서드를 매개변수로 전달이 가능하다.

<b>람다식의 형변환</b><br>
함수형 인터페이스에 람다식을 참조할 수 있다.
하지만 람다식의 타입이 함수형 인터페이스와 일치하진 않는다.
(람다식은 익명객체이며 타입이 없다. 컴파일러가 임의로 지정)

```
@FunctionalInterface
interface FunctionalInterface_1{
    void myMethod();
}

public class LambdaEx2 {
    public static void main(String[] args) {
        // 자동형변환 (FunctionalInterface_1) ()->{};
        FunctionalInterface_1 f = () -> {};

        // 람다는 오직 인터페이스로만 형변환이 가능하다.
        Object obj = (FunctionalInterface_1) (()->{});

        // 때문에 인터페이스로 형변환 후에 다른 객체로 형변환 해야한다.
        String str = ((Object) (FunctionalInterface_1) (() -> {})).toString();

        System.out.println(f);      // ch14.LambdaEx2$$Lambda$1/1324119927@3d075dc0
        System.out.println(obj);    // ch14.LambdaEx2$$Lambda$2/1078694789@214c265e
        System.out.println(str);    // ch14.LambdaEx2$$Lambda$3/1831932724@682a0b20
    }

}
```

<b>Object로 형변환 하려할시</b><br>
<img width="100%" src="https://user-images.githubusercontent.com/57665888/200124165-bb111ec0-88ae-4829-8c73-aaaca68ccb04.png">

## 함수형 인터페이스 종류 (java.util.function 패키지)

<b>`java.util.function`</b><br>
일반적으로 많이 사용하는 함수형 인터페이스를 정의해두었다.
매개변수의 갯수로 구분을 한다.

<b>매개변수 없음</b><br>

1. `java.lang.Runnable`

   - 메서드 : void run()

2. `Supplier<T>`

   - 메서드 : T get()
   - 반환값 : T

<b>매개변수 1개</b><br>

1. `Consumer<T>`

   - 메서드 : void accept(T t)
   - 반환값 : 없음

2. `Function<T,R>`

   - 메서드 : R apply(T t)
   - 반환값 : R

3. `Predicate<T>`

   - 메서드 : boolean test(T t)
   - 반환값 : boolean

<b>매개변수 2개</b><br>

매개변수 1개와 동일하며 인터페이스 이름 앞에 `Bi`가 붙는다.

<b>매개변수와 반환값이 동일</b><br>

Function의 자손

1.  `UnaryOpator<T>`

    - 메서드 : apply(T t)
    - 반환값 : T

2.  `BinaryOperator<T>`

    - 메서드 : apply(T t,T t)
    - 반환값 : T

### 정리

```
Bi: 매개변수가 2개
Operator: 매개변수와 반환값 타입 일치

Runnable : run :매개변수x 반환값x
Supplier<T> : get : 매개변수x 반환값o
Consumer<T> : accept : 매개변수o 반환값x
Function<T,R> : apply : 매개변수o 반환값o
Predicate<T> : test : 매개변수o 반환값 boolean
```

## 컬렉션 프레임워크의 함수형 인터페이스

<b>메소드 써보기</b><br>

```
Collection  boolean removeIf        (Priedicate<E> filter)          // 조건에 맞는 요소 삭제
List        void    replaceAll      (UnaryOperator<E> operator)     // 모든 요소를 변환하여 대체
Iterable    void    forEach         (Consumer<T> action)            // 모든 요소에 작업 action을 수행
Map         V       compute         (K key, BiFunction<K,V,V> f)    // 지정된 키의 값에 작업 f를 수행
            V       computeIfAbsent (K key, BiFunction<K,V,V> f)    // 키가 없으면, 작업 f를 수행
            V       computeIfPresent(K key, BiFunction(K,V,V) f)    // 키가 있으면, 작업 f를 수행 후 추가
            V       merge           (K key, V value, BiFunction<V,V,V> f)   // 모든 요소에 병합작업 f를 수행
            void    forEach         (BiConsumer<K,V> action)        // 모든 요소에 작업 action을 수행
            void    replaceAll      (BiFunction<K,V,V> f)           // 모든 요소에 치환작업 f를 수행
```

<b>원시형 메서드도 존재</b><br>

```
AtoBFunction        : A매개변수 B로 반환값 Function
ToBFunction<T>      : T매개변수 B로 반환값 Function
AFunction<R>        : A매개변수 T로 반환값 Function
ObjAConsumer<T>     : T,A 매개변수 Consumer
```

<b>java.util.function 패키지의 static 메서드</b><br>

```
Function
default     <V> Function<T,V>   andThen (Function<? super R,? extends V>    after)      // f.andThen(g)
default     <V> Function<V,R>   compose (Function<? super V,? extends T>    before)     // g.compose(f)
static      <T> Function<T,T>   identity()                                              // 항등 함수

Predicate
default         Predicate<T>    and     (Predicate<? super T>   other)
default         Predicate<T>    or      (Predicate<? super T>   other)
default         Predicate<T>    negate  ()
static      <T> Predicate<T>    isEquals(Object targetRef)
```

## 메서드 참조

`클래스이름::메서드이름`

```
Function<String,Integer> f = Integer::parseInt;
```

`참조변수::메서드이름`

```
MyClass obj = new MyClass();
Runction<String, Boolean> f = obj::equals;
```

`new 연산자`

```
Supplier<MyClass> s = MyClass::new;
BiFunction<String,String,MyClass> f = MyClass::new; // 매개변수가 2개인 생성자 사용
Function<Integer,int[]> f = int[]::new;
```

# 스트림 Stream
