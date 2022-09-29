# Redis Cloud

https://inpa.tistory.com/entry/REDIS-%F0%9F%93%9A-Redis%EB%A5%BC-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EC%9E%90-Redislabs

# Redis

데이터베이스로 사용될 수 있으며, 캐시로도 사용 될 수 있음

#### 주로 사용하는 곳

1. 인증 토큰 등을 저장 (Strings or Hash)
2. Ranking 보드로 사용 (Sorted-Set)
3. 유저 API Limit
4. 잡큐 (List)

## 레디스 클라우드는 로컬을 한 후에 고도화 용으로 남겨놓다

기본기 중요

## 윈도우 버전

현재 7.0까지 있으나 윈도우용으로 만들어놓은 ms아카이브가 2016에 지원을 멈춰서 3.0까지만 사용할 수 있는 것 같다.

- Memurai 라는 사이트가 윈도우 버전을 만드는것같으나 여유가 있을 때 하자

## ERD 자료형

mysql :RDB 용
ledis :캐시 용

유저 - hashSet (primaryKey : number)
유저레이드기록 - hashSet (primaryKey : number)

랭킹 - sorted sets
(mysql 스키마 생성하지 않으며 ledis로만 사용한다.)

## API

1. 유저 생성
   mysql로 생성
2. 유저 조회
   캐시 확인 후 없을시 mysql 조회
3. 보스레이드 상태 조회 (보수필요)
   캐시에서 끝나는 시간과 현재시간비교
   캐시 확인 후 유저레이드 기록에서 확인
   ledis: 시작여부, 사용중인유저, 끝나는시간
   mysql: id, 사용중인유저, 시작시간, 끝나는시간
4. 보스레이드 종료
   캐시에서 유저레이드 가능여부 변환
   mysql에서 유저레이드기록 갱신 (이전에 끝나는 시간과 실제 시간비교)
5. 보스레이드 랭킹 조회
   mysql의 totalScore 데이터 내림차순으로 랭킹 조회

// 랭킹 서비스는 서버가 내려갔을시 초기화 된다. -> RDB,AOF

## Redis로만 구현 vs mysql,Redis 같이 사용하여 구현

1. Redis로만 구현

- 빠름
- 저장공간 부족

2. mysql,Redis 같이 사용하여 구현

- mysql의 기능 사용의 편리함
- 느림

Redis의 DB에 캐시기능이 있는 것이라니라
Redis가 인메모리 구조의 성격을 띄고 있어서 캐시 서버처럼 사용 되는것
일반적인 RDB들은 FS 구조의 성격을 띄어서 메모리가 아닌 실제 파일에 저장되기 때문에 메모리에 접근하는 것과는 속도가 다르다.

## 결론

회원가입, 유저조회와 같은 것들은 빠른 속도일 필요가 없기 때문에 mysql로 구현
보스레이드의 정보, 보스레이드의 랭킹 같은 경우는 redis에 저장
