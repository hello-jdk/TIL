### 깔려있는 것

- Gradle Installation
- Spring Boot CLI Installation

### 4.4 Developing Your First Spring Boot Application
- 목표: "Hello World" web application 만들기 
- [Maven](https://maven.apache.org/download.cgi) 이용
  - `mvn --version`

#### Apache Maven
```
  Maven is a software project management and comprehension tool. Based on
  the concept of a Project Object Model (POM), Maven can manage a project's
  build, reporting and documentation from a central piece of information.
```

- 소프트웨어 프로잭트 관리, 이해관련 툴
- POM 기반 (프로젝트 빌드, 리포팅, 문서 등을 관리)
- [POM?](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=kathar0s&logNo=10142172400)

#### 프로젝트 정의

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>myproject</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.4</version>
    </parent>

    <!-- Additional -->

</project>
```

- `node.js`의 package.json 같은 역할
- 파일의 디렉터리에서 `mvn package`

#### 4.4.4 Adding ClassPath Dependencies 
기존 start.spring.io에서 `spring-boot-starter-web` 추가했던 것처럼 dependency를 추가해준다.

1. `POM.xml`파일의 `<parent>` 섹션의 `spring-boot-starter-parent`: Maven defaults 기능과 설정을 담당

- [smoke test](https://sites.google.com/site/knowingmoresoftware/software-testing/smoke-sanity-testing)
  - 기초 안정성 테스트

2. `mvn dependency:tree`

```
PS C:\workspace\Remote\boardService\Server> mvn dependency:tree
[INFO] Scanning for projects...
[INFO] 
[INFO] -----------------------< com.example:myproject >------------------------
[INFO] Building myproject 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-dependency-plugin:3.3.0:tree (default-cli) @ myproject ---
[INFO] com.example:myproject:jar:0.0.1-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  0.706 s
[INFO] Finished at: 2022-10-13T00:02:33+09:00
[INFO] ------------------------------------------------------------------------
```

3. `spring-boot-starter-web` 추가
```
PS C:\workspace\Remote\boardService\Server> mvn dependency:tree
[INFO] Scanning for projects...
[INFO] 
[INFO] -----------------------< com.example:myproject >------------------------
[INFO] Building myproject 0.0.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-dependency-plugin:3.3.0:tree (default-cli) @ myproject ---
[INFO] com.example:myproject:jar:0.0.1-SNAPSHOT
[INFO] \- org.springframework.boot:spring-boot-starter-web:jar:2.7.4:compile
[INFO]    +- org.springframework.boot:spring-boot-starter:jar:2.7.4:compile
[INFO]    |  +- org.springframework.boot:spring-boot:jar:2.7.4:compile
[INFO]    |  +- org.springframework.boot:spring-boot-autoconfigure:jar:2.7.4:compile
[INFO]    |  +- org.springframework.boot:spring-boot-starter-logging:jar:2.7.4:compile
[INFO]    |  |  +- ch.qos.logback:logback-classic:jar:1.2.11:compile
[INFO]    |  |  |  +- ch.qos.logback:logback-core:jar:1.2.11:compile
[INFO]    |  |  |  \- org.slf4j:slf4j-api:jar:1.7.36:compile
[INFO]    |  |  +- org.apache.logging.log4j:log4j-to-slf4j:jar:2.17.2:compile
[INFO]    |  |  |  \- org.apache.logging.log4j:log4j-api:jar:2.17.2:compile
[INFO]    |  |  \- org.slf4j:jul-to-slf4j:jar:1.7.36:compile
[INFO]    |  +- jakarta.annotation:jakarta.annotation-api:jar:1.3.5:compile
[INFO]    |  +- org.springframework:spring-core:jar:5.3.23:compile
[INFO]    |  |  \- org.springframework:spring-jcl:jar:5.3.23:compile
[INFO] Total time:  0.777 s
[INFO] Finished at: 2022-10-13T00:04:41+09:00
[INFO] ------------------------------------------------------------------------

```

### Executable jar 만들기

- `spring-boot-starter-parent` POM에도 `<excutions>` 섹션이 있는데 사용하지 않기 위해서 아래 코드를 추가해준다.

```
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```

- 빌드하기: `mvn package`
- 빌드된 파일보기: `jar tvf target/myproject-0.0.1-SNAPSHOT.jar`
  - window: `java -jar 파일경로/파일이름.확장자`

