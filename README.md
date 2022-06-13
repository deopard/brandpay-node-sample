# 브랜드페이 SDK 연동 샘플 프로젝트

브랜드페이 JavaScript SDK를 이용해 자체 간편결제를 구축할 수 있는 예제입니다.

## 시작하기

먼저 이 레포지토리를 [클론](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)합니다.

```sh
git clone https://github.com/tosspayments/brandpay-quickstart # 샘플 프로젝트 클론
cd brandpay-quickstart
```

의존성 패키지를 다운로드하고 서버를 실행합니다.

```sh
npm install   # 의존성 패키지 다운로드
node index.js # 서버 실행
```

브라우저에서 [http://localhost:3000/checkout](http://localhost:3000/checkout) 페이지로 접속합니다.

샘플 프로젝트가 성공적으로 실행되면 아래와 같은 화면을 확인할 수 있습니다.

![페이지 예시 이미지](https://static.tosspayments.com/docs/brandpay/test/checkout.png)

### Node.js가 설치되어 있지 않다면

1. nvm(Node Version Manager, Node.js 버전 관리자) 설치

  nvm 최신 버전 확인 후 아래 `{VERSION}`에 추가한 뒤 아래 커맨드로 nvm을 설치합니다.

  ```sh
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/{VERSION}/install.sh | bash
  ```

* [Window에서 설치하기](https://github.com/coreybutler/nvm-windows/)

2. Node.js 설치

  [Node.js 버전](https://nodejs.org/ko/about/releases/)을 확인하고 LTS 버전을 설치합니다.

  ```sh
  nvm install {NODE_VERSION}
  ```

## 인증

`{CLIENT_KEY}`, `{SECRET_KEY}`로 작성되어 있는 부분을 내 상점의 테스트용 API 키로 변경하세요. 테스트용 API 키는 [개발 정보 페이지](https://onboarding.tosspayments.com/my/integration)에서 확인할 수 있습니다.

API 키에 대한 더 자세한 내용은 [API 사용하기](/guides/apis/usage#가맹점용-api-키-발급받기) 페이지를 참고하세요.
