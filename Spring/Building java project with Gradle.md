### gradle init `basic` vs `application`

- basic
  기본 타입이다. 이것은 모든 타입의 기반이 되는 것으로 src 는 제공되지 않는다. 또한 빌드 파일도 구체적인 처리 등은 기술되지 않고, build.gradle과 settings.gradle만 생성된다. --type을 붙이지 않고, 단순히 gradle init만 실행하면 이 basic 타입이 지정된다.

- java-application
  Java 애플리케이션 프로젝트 작성에 대한 타입이다. 기본적으로 App.java가 제공된다.

Java 프로그래머는 java-application, java-library만 알고 있으면 충분하다.

### 트러블 슈팅: `build`시 Test 오류

`gradle init`을 실행할 때 `sample code` 생성을 했음.
`sample code`에 테스트 코드도 포함이 되있었음

1. `gradle build` 빌드 실패

2. `init` 후 App 코드 변경

   - `init` 할 때 sample code와 그에 대한 테스트 코드 자동 작성

3. 즉, 테스트 실패하여 빌드가 fail
   - 테스트 코드를 변경한 코드에 맞춰 작성 후 빌드 재개

### build 디렉터리

<img width="50%" alt="1" src="https://user-images.githubusercontent.com/57665888/194552764-8a981326-2c49-4a99-8862-07e0f72c7564.png">

- classes: 컴파일된 프로잭트 `.class` 파일
- reports: 빌드에 의해 생성된 보고서 (such as test reports)
- libs: 조립된 프로잭트 라이브러리 (usually JAR, WAR file)

<img width="70%" alt="1" src="https://user-images.githubusercontent.com/57665888/194553395-f9a0db6d-8263-44c7-9c06-3a6c36fdd978.png">

`생성된 Test reports... 현타온다... 이래서 Spring을 쓰는구나...`

### Gradle은 Maven에 의존적이다.

```
repositories {
    mavenCentral()
}
```

build should resolve its dependencies from the Maven Central repository.
(= Gradle은 Maven build tool의 많은 컨벤션과 facilites establised에 많이 의존하고있다.)

### build.gradle

- implementation: 프로젝트 코드를 컴파일하는데 필요한 의존성 라이브러리

  - 런타임에 제공
  - by a container running the code (for example, the Java Servlet API).

- testImplementation: 테스트 코드 컴파일에 필요한 의존성
  - 프로젝트 런타임 코드에서는 필요x(적용x)

### jar 파일 이름 설정

- `build.gradle`

```
jar {
    archiveBaseName= 'jdk-gradle'
    archiveVersion = '0.1.0'
}
```

### Gradle Wrapper

Gradle을 OS에 설치할 필요없이 build를 할 수있게 해주는 batch script

- 코드 배포하기

  - `gradle wrapper --gradle-version x.x.x`
  - 누구나 나의 프로젝트를 clone하여 같은 환경에서 빌드할 수 있다.

- 코드 빌드하기
  - `./gradlew build`

처음 특정 버전의 Gradle Wrapper를 구동하면 download 후 cache 한다. (Gradle Binaries for that version)

- 코드 실행하기
  - `./gradlew run`

<img width="100%" alt="1" src="https://user-images.githubusercontent.com/57665888/194562446-8c9235d9-943d-4c27-8013-87206e1520e4.png">

### 트러블 슈팅: `mainClass` 위치 확인

- Error: Could not find or load main class sample.App
  Caused by: java.lang.ClassNotFoundException: sample.App

- `build.gradle`의 ``application` 확인

```
application {
    // Define the main class for the application.
    mainClass = 'hello.App' // 메인메서드가 있는 클래스
}
```

# 참고자료

- 스프링공식\_guide
  https://spring.io/guides/gs/gradle/
- Gradle 설치
  https://www.gradle.org/downloads
- Gradle 공식\_guide
  https://docs.gradle.org/current/samples/sample_building_java_applications_multi_project.html
- gradle-init\_참고
  https://www.devkuma.com/docs/gradle/gradle-init-%EB%AA%85%EB%A0%B9%EA%B3%BC-type-%EC%A2%85%EB%A5%98/
