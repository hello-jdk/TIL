# 목차

1. [JWT 개요](#1-jwt-개요)
2. [JWT 구성](#2-jwt-구성)
3. [구현](#3-node)

## 1. JWT 개요

| JSON Web Token

- 웹 표준 RFC 7519
- 두 개체간에 JSON 객체를 사용하여 정보 교환 한다.
- 가볍고 `self-contained` 방식으로 정보를 무결하며 안전하게 전달 한다.

| `self-contained`

- 필요한 모든 정보를 자체적으로 지님

## 2. JWT 구성

<img width="100%" alt="1" src="https://user-images.githubusercontent.com/57665888/191921247-b0d09297-b054-4623-b284-23043936578b.png">
<br>
<br>

> ### Header

| 두가지 정보를 지니고 있다.

1. typ

- 토큰의 타입을 지정
- 이 경우에는 `JWT`

2. alg

- 해싱 알고리즘 지정
- 보통 `HAMC SHA256` 또는 `RSA` 사용
- 서명(signature)에서 토큰을 검증할 때 사용

> ### Payload

| 토큰의 본문이며 크게 3가지의 클레임으로 분류되어있다.

a. Registred Claim
b. Public Claim
c. Private Claim

#### 1. Registered Claim

토큰에 대한 정보, 옵션

- `iss` : 토큰 발급자 (issuer)
- `sub` : 토큰 제목 (subject)
- `aud` : 토큰 대상자 (audience)
- `exp` : 토큰 만료시간 (expriation)
  - NumbericDate 형식
- `nbf` : Not Before , 토큰 활성 날짜 개념
  - 이 날짜 전까지는 토큰이 처리되지 않음.
  - NumbericDate 형식
- `iat` : 토큰 발급 시간 (issued at)
- `jti` : JWT 고유 식별자 (jwtid)

#### 2. Public Claim

실질적 사용자(Key)에 대한 정보

- `collision-resistant` : 충돌을 방지하기 위해 중복되지 않는 않아야함.
- 일반적으로 URI 형식으로 이름을 짓는다.

#### 3. Private Claim

양 측간에 협의하에 사용되는 클레임

- 서버(백엔드) <-> 클라이언트(프론트엔드) 간에만 사용하는 정보들
- 중복이 가능하긴 하나 사용할때 주의해야한다.

| 클레임(claim) 기반

- 사용자(Key)에 대한 프로퍼티나 속성을 이야기함
- `JWT`는 `claim` 기반 : 서비스를 호출한 사용자에 대한 모든 정보를 가지고 있다.
- `OAuth` 토큰은 토큰 자체에 대한 정보를 담지 않음
- OAuth vs JWT (https://12bme.tistory.com/130)

> ### Signature

| 헤더(Header)와 정보(Payload)를 합쳐 주어진 비밀키로 해쉬를 생성

- 인코딩된 헤더 + 인코딩된 정보 로 이루어 지며
- 비밀키를 넣어야지 디코딩 된다.

## 3. NODE

http://www.opennaru.com/opennaru-blog/jwt-json-web-token/
https://velopert.com/2389
