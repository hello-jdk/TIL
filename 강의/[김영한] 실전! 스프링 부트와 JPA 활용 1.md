# 환경설정

## 개요

### 핵심 라이브러리

스프링 MVC
스프링 ORM
JPA, Hibernate
스프링 데이터 JPA

### 기타 라이브러리

H2 DB client
ConnectPool (default: HikariCP)
WEB(thymeleaf)
로깅 SLF4J(lognack)
테스트

## 스프링 부트 스타터

- 디펜던시

web, thymeleaf, jpa, lombok, validation(JSR-303)

## build.gradle

```
plugins {
	id 'org.springframework.boot' version '2.7.5'
	id 'io.spring.dependency-management' version '1.0.15.RELEASE'
	id 'java'
}

group = 'japbook'
version = '1.8.1'
sourceCompatibility = '11'

configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
	implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
	implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-devtools' // 파일별 컴파일 및 기타기능 제공

	runtimeOnly 'com.h2database:h2'
    implementation("com.github.gavlyukovskiy:p6spy-spring-boot-starter:${version}") // SQL 로깅용

	compileOnly 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'

    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation("org.junit.vintage:junit-vintage-engine") { // JUit4 사용을 위해
        exclude group: "org.hamcrest", module: "hamcrest-core"
    }
}

tasks.named('test') {
	useJUnitPlatform()
}

```

## 기타

- Gradle 컴파일 intelij IDEA 설정
- H2 `.mv.db` 파일생성하기: `jdbc:h2:~/jpashop` (윈도우는 "C:\Users\유저이름"에 생성됨)
- SQL 로깅 외부라이브러리 사용하기 https://github.com/gavlyukovskiy/spring-boot-data-source-decorator

#
