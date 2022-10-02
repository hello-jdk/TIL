### EC2란

Amazon Web Services(AWS) 클라우드에서 제공하는 Elastic Compute Cloud(EC2)
즉, 확장 가능 컴퓨팅 용량 제공

### 웹 서비스란..

- 네트워크 상에서 `서로 다른 종류의 컴퓨터들 간`의 상호작용을 위한 소프트웨어 시스템
- 서비스 지향적 분산 컴퓨팅 기술
- 프로토콜 스택 : SOAP, WSDL, UDDI ...

> `AWS 클라우드`는 아마존에서 클라우드, 웹 기반 서비스를 제공하는 소프트웨어(상품)

### EC2 서비스는 무엇을 제공하는가

1. 인스턴스 : 가상 컴퓨팅 환경
   - 유형 : 인스턴스를 위한 `CPU`,`메모리`,`스토리지`,`네트워킹 요량` 등 ...
2. Amazon 머신 이미지(AMI) : 서버에 필요한 운영체제 및 소프트웨어를 템플릿으로 제공, 인스턴스 사용 용의
3. 키 페어
4. Amazon Elastic Block Store(EBS) : EBS를 사용해 영구 스토리지에 저장
5. 보안 : 프로토콜,포트,소스IP 범위 지정하여 방화벽

> 아마존에서 제공하는 virtual machine(+@)

### 구현 시 더 알아볼 것

1. 보안 그룹 구성 : 생성한 인스턴트의 열어둘 PORT, PORT에 어떠한 IP 대역이 접근할 수 있게 하는지 정의
2. 키 페어

### 참고

[웹서비스](https://ko.wikipedia.org/wiki/%EC%9B%B9_%EC%84%9C%EB%B9%84%EC%8A%A4)
[EC2 제공서비스](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/concepts.html)
[E2C로Node.js배포하기](https://intrepidgeeks.com/tutorial/aws-node-on-ec2-deploy-js-server)
