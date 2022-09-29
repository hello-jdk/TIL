# REDIS

| REmote Dictionary Server

## 특징

- 메모리 기반 `key-value` 구조 데이터 관리 시스템
- 비 관계형 데이터베이스
- 싱글 스레드
  - 서버 하나에 여러개의 Redis Server를 띄울 수 있음
    (Master&Slave 구조 사용)

## 장점

- 모든 데이터를 메모리에 저장하고 조회하기 때문에 빠른 속도 보장
- 사용자 정의 애플리케이션 손쉽게 생성 가능

## 단점

- 싱글 스레드를 사용하기 때문에 스냅샷을 만들 때 자식 프로세스를 만들어 낸 후 copy-on-write를 사용
- 때문에 더 많은 메모리를 사용하며 `메모리 단편화` 발생 가능성
- `In-memory` 방식으로 데이터 유실 가능성

## 데이터 형식

- String
- Lists
- Sets
- Sorted sets
- Hashs

## 원자성, 동시성

- 여러 프로세스에서 동시에 같은 Key에 대한 갱신을 요청하는 경우, 데이터 부정합 방지 Atomic 함수 제공

## 데이터 유실에 따른 스냅샷 기능 지원

- Redis는 데이터를 메모리에 저장하기 때문에 Redis가 내려가면 메모리 상에 있던 데이터가 유실 될 수 있다.
- 이 유실을 방지하기 위해 AOF,RDB 기능 제공

#### AOF

| Append Only File

- `명령이 실행될 때마다` 해당 명령이 파일에 기록
- 데이터 손실이 거의 없다. (버퍼 사용)
- 수정가능
- `appendonly.aof`

#### RDB

| Redis Database

- `특정 시점`에 메모리에 있는 데이터 전체를 바이너리 파일에 저장
- 바이너리 파일로 저장되기 때문에 사람이 읽을 수 없다.
- AOF 파일보다 사이즈가 작아 빠른 로드 가능
- `dump.rdb`

# cache 구조

1. Look aside Cache

- 웹 서버에서 요청된 데이터가 캐시(Redis)에 있는 지 확인
- 있으면 Redis에서 가져오기
- 없으면 DB(mysql)에서 가져오고 캐시(Redis)에 저장

2. Write Back

- 웹 서버에서 요청된 데이터의 모든 것을 캐시(Redis)에 저장
- 일정 시간 마다 (배치) DB(mysql)에 저장
- DB(mysql)에 저장된 데이터를 캐시(Redis)에서 삭제

# insert 쿼리 500번 날리기 vs insert 쿼리 500개 모아서 한번에 날리기

- 후자가 훨신 빠름 (WriteBack을 쓰는 이유)

# DB 기본

ACID

- 아토믹
- 컨시던시
- 아이솔레이션
- 듀러빌리티

# 멤캐시 vs 레디스

멤캐시는 Collection을 지원하지 않는다.

# Redis 경우 Collection(자료구조)이 Atomic 하다.

해당 RaceCondition을 피할수있음
(그래도 잘못짜면 발생함)

# 출처

https://charming-kyu.tistory.com/37
https://mozi.tistory.com/369?category=1102290
https://www.youtube.com/watch?v=mPB2CZiAkKM
