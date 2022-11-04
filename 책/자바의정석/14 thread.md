<b></b><br>

# 프로세스와 쓰레드

## 개요

<b>프로그램 실행</b><br>
OS로부터 실행에 필요한 자원(메모리)를 할당받아 프로세스가 된다.

<b>프로세스</b><br>
필요한 데이터, 메모리, 자원, 쓰레드로 구성
하나 이상의 쓰레드로 구성

<b>쓰레드</b><br>
프로세스의 자원을 이용해서 실제 작업을 수행
하나의 프로세스가 가질 수 있는 쓰레드 수는 제한되어 있지 않으나 쓰레드가 작업을 수행하는데 개별적인 메모리 공간(호출스택)이 필요

<b>멀티 쓰레딩의 문제점</b><br>

동기화(sychronization)

교착상태(deadlock)

### 쓰레드 구현법

```java
    public static void main(String[] args) {
        ThreadEx1_1 t1 = new ThreadEx1_1();

        Runnable r = new ThreadEx1_3();
        Thread t3 = new Thread(r);

        t1.start();
        t3.start();

    }
```

1. Thread 클래스 상속

```java
class ThreadEx1_1 extends Thread {
    @Override
    public void run() {
        System.out.println(getName());
    }
}
```

2. Runnable 인터페이스 구현

```java
class ThreadEx1_3 implements Runnable {
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName());
    }
}
```

<b>`java.lang.Thread`</b>

```java
class Thread implements Runnable {
        ....
}
```

Thread 클래스도 Runnable의 구현체이다.

<b>Runnable 메서드</b></br>
`static Thread currentThread()`: 현재 실행중인 쓰레드 참조 반환
`String getName()`: 쓰레드 이름

## start()와 run() 실행와 호출

<b>start()</b><br>
OS의 스케줄러에 의해 동작

<b>한 번 실행이 종료된 쓰레드는 다시 실행 할 수 없다.</b><br>
같은 쓰레드 2번 이상 호출 시 `IllegalThreadStateException` 예외 발생

<b>모든 쓰레드는 독립적인 작업을 위해 호출스택을 생성한다</b><br>
run(): 단순히 클래스에 선언된 메서드를 호출
start(): 호출스택 생성 run() 호출

<b>프로그램 종료</b><br>
실행 중인 사용자 쓰레드가 하나도 없을 때 프로그램은 종료된다.

<b>main쓰레드</b><br>
위의 프로그램 종료의 정의에 따라 main 메서드가 종료되어도 프로그램이 종료되지 않을 수 있다.

<b>start()를 사용해 쓰레드 생성</b><br>

```
Exception in thread "Thread-0" java.lang.RuntimeException: java.lang.Exception
	at ch13.ThreadEx2_1.throwException(ThreadEx2.java:22)
	at ch13.ThreadEx2_1.run(ThreadEx2.java:15)
```

쓰레드를 생성하고 쓰레드 내부에서 예외를 생성시키면 호출스택에는 main메서드는 없다.
main쓰레드가 이미 종료되었기 때문

<b>run()을 사용해 메서드 호출</b><br>

```
Exception in thread "main" java.lang.RuntimeException: java.lang.Exception
	at ch13.ThreadEx2_1.throwException(ThreadEx2.java:22)
	at ch13.ThreadEx2_1.run(ThreadEx2.java:15)
	at ch13.ThreadEx2.main(ThreadEx2.java:8)
```

쓰레드를 생성하지 않았기 때문에 main 메서드가 있는 main 쓰레드에서 호출이 되며 콜스택에 그대로 남아있는 것을 볼 수 있다.

## 싱글쓰레드 멀티쓰레드

<b>context switching</b><br>
멀티쓰레드 프로세스가 쓰레드간을 번갈아가면서 작업하는 것

<b>작업 전환(context switching)에 필요한 자원</b><br>
현재 진행 중인 작업 상태(프로그램 카운터 PC)

TBS
멀티 프로세스, 멀티 코어, 멀티 쓰레드는 운영체제 책 참고

## 쓰레드 우선 순위

TBS
자료부족, 쓰레드 마다 우선 순위를 줄 수 있다는 것만 알고 있자.

## 쓰레드 그룹

서로 관련된 쓰레드를 그룹으로 관리할 수 있다.

<b>메서드 한번 적어보기</b><br>

```
ThreadGroup(String name)
name 이름을 가진 쓰레드 그룹 생성

ThreadGroup(ThreadGroup parent, String name)
parent 쓰레드 그룹에 포함되는 쓰레드 그룹 생성

int activeCount()
활성상태 쓰레드 수 반환

int activeGroupCount()
활성상태 쓰레드 그룹의 수 반환

void checkAccess()
현재 실행 중(이 메서드를 호출한 쓰레드)가 해당 쓰레드 그룹을 변경할 권한이 있는지 check 없다면 SecurityException 예외 발생

void destroy()
쓰레드 그룹과 그 하위 그룹까지 모두 삭제

int enumerate(Thread[] list)
int enumerate(Thread[] list, boolean recurse)
int enumerate(ThreadGroup[] list)
int enumerate(ThreadGroup[] list, boolean recurse)
쓰레드 그룹에 속한 하위 쓰레드를 list에 담고 재귀(recurse)가 true 일 시 하위 쓰레드 그룹 또한 배열에 담는다.

int getMaxPriority()
쓰레드 그룹의 최대우선순위 반환

String getName()
ThreadGroup getParent()

void interrupt()
그룹에 속한 모든 쓰레드 interrupt

boolean isDaemon()
데몬 쓰레드 그룹인지 확인

boolean isDestroyed()
void list()
해당 쓰레드 그룹에대한 정보 출력

boolean parentOf(ThreadGroup g)
void setDaemon(boolean daemon)
데몬 쓰레드그룹으로 설정/해제

void setMaxPriority(int pri)
```

<b>모든 쓰레드는 반드시 쓰레드 그룹에 포함되어 있어야한다.</b><br>

1.  자바 애플리케이션 실행 시 JVM은 `main`과 `system`이라는 시스템 그룹을 만듦
2.  운영에 필요한 쓰레드를 생성하여 포함시킨다
    `main`쓰레드(main메서드) `system`쓰레드(GC:Finalizer)
3.  개발자가 만드는 모든 쓰레드 그룹은 `main` 쓰레드 그룹의 하위 쓰레드 그룹이 된다. (자동적으로 `main`쓰레드 그룹에 속하게됨)

<b>직접 관찰하기</b>

```java
public class ThreadEx9 {
    public static void main(String[] args) {
        // 1. 쓰레드 그룹 만들기
        ThreadGroup main = Thread.currentThread().getThreadGroup();
        ThreadGroup grp1 = new ThreadGroup("Group1");
        ThreadGroup grp2 = new ThreadGroup("Group2");
        ThreadGroup subGrp1 = new ThreadGroup(grp1, "Group1_subGroup1");

        // 새로 들어오는 쓰레드에 대해서만 우선순위가 적용된다.
        grp1.setMaxPriority(3);

        // 출력 이전에 실행이 멈추는 것을 방지
        Runnable r = new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        };

        // 2. 쓰레드 만들어서 할당 & 실행
        new Thread(grp1, r, "th1").start();
        new Thread(subGrp1, r, "th2").start();
        new Thread(grp2, r, "th3").start();

        System.out.println("main.getName() = " + main.getName());
        System.out.println("main.activeGroupCount() = " + main.activeGroupCount());
        System.out.println("main.activeCount() = " + main.activeCount());
        System.out.println();

        // main 쓰레드 그룹 정보 출력
        main.list();
    }
}
```

<b>Tree구조</b>

```
    mainGroup
        ㄴ Thread(main)                     (실행중)
        ㄴ Thread(Monitor Ctrl-Break:PCB)   (실행중)
        ㄴ Group1(grp1)
            ㄴ Thread(th1)                  (실행중)
            ㄴ subGrp1
                ㄴ Thread(th2)              (실행중)
        ㄴ Group2(grp2)
            ㄴ Thread(th3)                  (실행중)
```

<b>콘솔 출력</b>

```java
main.getName() = main
main.activeGroupCount() = 3
main.activeCount() = 5

java.lang.ThreadGroup[name=main,maxpri=10]
    Thread[main,5,main]
    Thread[Monitor Ctrl-Break,5,main]
    java.lang.ThreadGroup[name=Group1,maxpri=3]
        Thread[th1,3,Group1]
        java.lang.ThreadGroup[name=Group1_subGroup1,maxpri=3]
            Thread[th2,3,Group1_subGroup1]
    java.lang.ThreadGroup[name=Group2,maxpri=10]
        Thread[th3,5,Group2]

```

## 데몬 쓰레드

일반 쓰레드의 작업을 돕는 보조 쓰레드
(가비지컬렉터, 워드프로세서 자동저장, 화면자동갱신)

<b>보조</b><br>
일반 쓰레드가 종료되면 데몬 쓰레드는 자동으로 종료된다.

<b>대기</b><br>
무한루프와 조건을 이용한 대기
특정 조건 만족 시 작업을 수행 후 다시 대기

<b>데몬 쓰레드에서 생성한 쓰레드</b><br>
는 역시 데몬 쓰레드로 생성이 된다.

## 쓰레드 제어

<b>쓰레드 프로그래밍이 어려운 이유</b><br>
동기화, 스케줄링

<b>Thread 메서드 일단 써보기</b><br>

```
static sleep(long millis)
static sleep(long millis, int nanos)
지정된 시간동안 일시 정지
시간이 지나면 실행대기상태

void join()
void joint(long mills)
void joint(long mills, int nanos)
지정된 시간동안만 실행되도록한다.
시간이 지나면 호출한 쓰레드로 돌아간다.

void interrupt()
sleep()이나 join()에 의해 일시정지상태가 된 쓰레드를 깨워 실행대기상태로 만든다.
해당 쓰레드는 InterrupteException이 발생한다.

void stop()
즉시 종료

void suspend()
일시 정지
void resume()
일시 정지한 쓰레드를 실행대기상태로 만든다.

static void yield()
실행 중 자신에게 주어진 실행시간을 다른 쓰레드에게 양보하고
자신은 실행대기상태가 된다.
```

<b>stop, suspend, resume</b><br>
데드락을 쉽게 발생시킬 수 있어서 deprecated 됨

<b>쓰레드 상태</b>

```
NEW             쓰레드 생성됨, start() 호출되기 전
RUNNABLE        실행 중, 실행 가능 상태
BLOCKED         동기화에 의해 일시정지 상태
WAITING,        쓰레드 작업이 종료되지는 않았지만 실행이 불가한 일시정지 상태
TIMED_WATING    ㄴ일시정지시간이 지정된 경우는 TIMED_WATING
TERMINATED      작업 종료
```

<b>쓰레드 상태 순서</b>

```
1. NEW              : 쓰레드 생성
2. RUNABLE          : start() 호출
3. RUNABLE          : 대기 큐에서 대기상태
4. RUNABLE          : 순서가 되면 실행
5. RUNABLE          : 할당된시간종료, yield() 시 대기 큐로 이동
5. WATING,BLOCKED   : suspend(), sleep(), wait(), join(), I/O block 에 의해 일시정지 상태로 이동
6. RUNABLE          : time-out, resume(), notify(), interrupt() 시 다시 대기 큐로 이동
7. TERMINATED       : 작업 종료, stop() 시 쓰레드 소멸
```

### sleep()

### interrupt() isInterrupted() interrupted()

### suspend() resume() stop()

### yield()

### join()

## 동기화

### synchronized

### wait() notify()

### Lock Condition

### volatile

### fork join
