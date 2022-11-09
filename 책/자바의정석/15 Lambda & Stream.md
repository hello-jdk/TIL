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

## `java.util.stream`

<b>메서드 써보기</b><br>

```
Stream<T>       distinct        ()                              // 중복 제거
Stream<T>       filter          (Predicate<T> predicate)        // 조건에 안 맞는 요소 제외
Stream<T>       limit           (long maxSize)                  // 스트림의 일부를 잘라냄
Stream<T>       skip            (long n)                        // 스트림의 일부를 건너뜀
Stream<T>       peek            (consumer<T> action)            // 스트림의 요소에 작업수행
Stream<T>       sorted          ()                              // 스트림의 요소를 정렬
Stream<T>       sorted          (Comparator<T> comparator)

Stream<R>       map             (Function<T,R> mapper)          // 스트림의 요소를 변환
DoubleStream    mapToDouble     (ToDoubleFunction<T> mapper)
IntStream       mapToInt
LongStream      mapToLong

void            forEach         (Consumer<? super T> action)    // 각 요소에 지정된 작업 수행
void            forEachOrdered  (Comsumer<? super T> action)

long            count           ()                              // 스트림의 요소 갯수 반환

Optional<T>     max             (Comparator<? super T> c)       // 스트림의 최대값 반환
Optional<T>     min             (Comparator<? super T> c)       // 스트림의 최소값 반환

Optional<T>     findAny         ()                              // 스트림의 요소 중 아무거나 하나 반환
Optional<T>     findFirst       ()                              // 스트림의 요소 중 첫 번쨰 요소 반환

boolean         allMatch        (Predicate<T> p)                // 주어진 조건을 모두 만족 시키는 지
boolean         anyMatch        (Predicate<T> p)                // 주어진 조건을 하나라도 만족 시키는 지
boolean         noneMatch       (Predicate<T> p)                // 주어진 조건을 모두 만족 시키지 않는 지

Object[]        toArray         ()                              // 스트림의 모든 요소를 배열로 반환
A[]             toArray         (IntFunction<A[]> generator)    //

Optional<T>     reduce          (BinaryOperator<T> accumulator) // 스트림 요소를 하나씩 줄여가면서 계산한다.
T               reduce          (T identity, BinaryOperator<T> a)
U               reduce          (U identity, BiFunction <U,T,U> a, BinaaryOperator<U> combiner)

R               collect         (Collector<T,A,R> collector)    // 스트림의 요소를 수집한다.
R               collect         (Supplier<R> s, BiConsumer<R,T> a, BiConsumer<R,R> combiner)
//요소를 그룹화, 분할한 결과를 컬렌션으로 반환

```

<b>중간 연산</b><br>
연산 결과가 스트림인 연산. 연속적으로 사용 가능
filter(), distince(), sort(), map()

<b>최종 연산</b><br>
연산 결과가 스트림이 아닌 연산. 마지막
max(), min(), findAny(), findFirst(), Mathch(), toArray(), reduce(), collect()

<b>원시형 Stream</b><br>
기본적으로 `Stream<T>`를 지원하지만 오토박싱과 언박싱의 비효율을 줄이기위해 IntStrea,LongStream 등이 제공된다.

## 스트림 만들기

<b>무한 스트림</b><br>

```
// seed 값으로 시작하여 f 연산 결과를 무한으로 반환
static <T>  Stream<T>   iterator    (T seed, UnarayOperator<T> f)

// s 연산을 무한으로 반환
static <T>  Stream<T>   generator   (Supplier<T> s)
```

```
IntStream evenStream = Stream.iterator(0,n->n+2).mapToInt(Integer::valueOf);
Stream<Integer> stream = evenStream.boxed();
```

원시형 스트림은 다룰 수 없다.

<b>범위 스트림</b><br>

```
IntStream IntStream.range       (int begin, int end)    // begin 이상 end 미만 int로 구성된 스트림 생성
IntStream IntStream.rangeClosed (int begin, int end)    // begin 이상 end 이하 int로 구성된 스트림 생성

//
IntStream ints = new Random().ints();                   // Random 클래스를 이용한 무한 스트림 생성
ints.limit(5).forEach(System.out::println);
```

<b>스트림 연결</b><br>

```
public static void main(String[] args) {
    Stream<String> strs1 = Stream.of("123", "456", "789");
    Stream<String> strs2 = Stream.of("abc", "efg", "hif");
    Stream<String> concat = Stream.concat(strs1, strs2);
    concat.forEach(System.out::print);
}
```

## 스트림 중간 연산

<b>스트림 자르기</b><br>

```
Stream<T>   skip    (long n)                            // n개의 요소를 건너뜀
Stream<T>   limit   (long maxSize)                      // 스트림의 크기를 5개로 제한

//
IntStream intStream = IntStream.rangeClosed(1,10);
intStream.skip(3).limit(5).forEach(System.out::print);  // 45678
```

<b>스트림 요소 걸러내기</b><br>

```
Stream<T>   filter  (Predicate<? super T> predicate)    // 조건에 맞지않는 요소를 제거
Stream<T>   distinct()                                  // 중복 제거

//
IntStream intStream = IntStream.rangeClosed(1,10);
intStream.filter(i->i%2==0).forEach(System.out::print) // 246810
```

<b>스트림 정렬</b><br>

```
Stream<T>   sorted  ()
Stream<T>   sorted  (Comparator<? super T> comparator)
```

Comparable을 구현한 클래스가 아니면 예외가 발생한다.

- 문자열 스트림 정렬 방법

strStream.sorted()의 매개변수 정리

```
// 기본 정렬        : CCaaabccdd
                                                //  (사전순)
Comparator.naturalOrder()                       //
(s1,s2) -> s1.compareTo(s2)                     //  (람다식)
String::comareTo                                //  (메서드 참조)

// 기본 정렬 역순   : ddccbaaaCC
Comparator.reverseOrder()                       //
Comparator.<String>naturalOrder().reversed()    //

// 대소문자 구분x   : aaabCCccdd
String.CASE_INSENSITIVE_OERDER                  //

// 대문자항상앞     : ddCCccbaaa
String.CASE_INSENSITIVE_ORDER.reversed          // (대문자 주의)

// 길이순 정렬      : bddCCccaaa
Comparator.comparing(String::length)            //
Comparator.comparingInt(String::length)         // (오토박싱x)

// 길이순 정렬 역순 : aaaddCCccb
Comparator.comparing(String::length).reversed() //

```

<b>비교의 가장 기본적인 메서드 comparing()</b><br>

반 -> 성적 -> 이름순으로 정렬하여 출력

```
studentStream.sorted(Comparator.comparing(Student::getBan)
                    .thenComparing(Student::getTatalScore)
                    .thenComparing(Student::getName)
                    .forEach(System.out::println);
                    )
```

이름 정렬 안함
반별 기본 정렬(오름차순)
성적 역순 정렬(내림차순)

예측 결과

```
[김자바, 1, 200]
[소자바, 1, 200]
[박자바, 2, 150]
[안자바, 2, 100]
[이자바, 3, 300]
[나자바, 3, 290]
[황자바, 3, 180]

```

코드

```
public class StreamEx1 {
    public static void main(String[] args) {
        Stream<Student> studentStream = Stream.of(
                new Student("이자바", 3, 300),
                new Student("김자바", 1, 200),
                new Student("안자바", 2, 100),
                new Student("박자바", 2, 150),
                new Student("소자바", 1, 200),
                new Student("나자바", 3, 290),
                new Student("황자바", 3, 180)
        );

        studentStream.sorted(Comparator.comparing(Student::getBan)      // 반별 오름차순
                .thenComparing(Comparator.naturalOrder()))              // 나머지 기본 정렬
                .forEach(System.out::println);
    }
}

class Student implements Comparable<Student> {
    String name;
    int ban;
    int totalScore;

    public Student(String name, int ban, int totalScore) {
        this.name = name;
        this.ban = ban;
        this.totalScore = totalScore;
    }

    @Override
    public String toString() {
        return String.format("[%s, %d, %d]", name, ban, totalScore);
    }

    // 총점 역순 정렬 (내림차순)
    @Override
    public int compareTo(Student o) {
        return o.totalScore - this.totalScore;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getBan() {
        return ban;
    }

    public void setBan(int ban) {
        this.ban = ban;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }
}
```

<b>변환 map()</b><br>
<b>조회 peek()</b><br>
<b>mapToInt(), mapToLong(), mapToDouble()</b><br>
<b>flatMap()</b><br>
<b>`Optional<T>와 OptionalInt`</b><br>

## 스트림 최종 연산

요소를 소모한다.

<b>forEach()</b><br>
Cosumer
<b>조건 검사 - allMatch(), anyMatch(), noneMatch(), findFirst, findAny()</b><br>
Predicate
<b>통계 - count(), sum(), average(), max(), min</b><br>
Comparator
<b>가산기 - reduce()</b><br>
R - Optional U - BinaryOperator

```
intStream.reduce(Integer::max);
intStream.reduce(Integer::min);
```

## collect()

스트림의 요소들을 어떻게 수집할 것인가. (collector)

```
collect()   스트림의 최종연산, 매개변수로 컬렉터를 필요
Collector   인터페이스, 컬렉터는 이 인터페이스를 구현해야함
Collectors  클래스, static 메서드로 미리 작성된 컬렉터 제공
```

<b>컬렉션과 배열 - toList(),toSet(),toMap(),toCollection(), toArray()</b><br>

```
List<String> names = stuStream.map(Student::getName)
                     .collect(Collectors.toList());

ArrayList<String> list = names.stream()
                        .collect(Collectors.toCollection(ArrayList::new));

Map<String,Person> map = personStream
                        .collect(Collectors.toMap(p->p.getRegId(), p->p))
```

<b>통계 - counting(), summingInt(), avergingInt(), maxBy(), minBy()</b><br>
<b>가산 - reducing()</b><br>
<b>문자열 결함 - joining()</b><br>
<b>그룹화와 분할 - groupingBy(), partitioningBy()</b><br>

## Collector 구현

```java
public interface Collector<T, A, R> {

    // 람다
    Supplier<A>             supplier();         // 작업 결과를 저장한 공간 코딩
    BiConsumer<A, T>        accumulator();      // 스트림의 요소를 수집할 방법 코딩
    BinaryOperator<A>       combiner();         // 두 저장공간을 병합발 방법 코딩
    Function<A, R>          finisher();         // 결과를 최종적으로 반환할 방법 코딩

    // 컬렉터가 수행하는 작업의 속성에 대한 정보 제공
    Set<Characteristics>    characteristics();

    ...
}
```
