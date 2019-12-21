# BlockChain Side

## Development Environment
- truffle v5.0.39
- solc v0.5.6
- node v10.16.3
- npm 6.9.0

<br>

## How to use
> express를 사용하나 webpack-dev-server 사용하나 로직은 동일하나 
<br>가스비 수수료 대납 처리를 위해 express에서는 ```localhost:3000/ajax``` 라우팅 로직이 추가 구현하였음.

### express routing server 사용할 경우
1. Download ```node_server``` folder
2. Run your favorite ```terminal``` program like powershell, cmd and so on.
3. Go inside node_server dir
4. Type ```npm install``` command to install necessary modules.
5. Type ```node app.js``` command. Then, you can use local server. ```localhost:3000```
6. Visit that Link and Please login klaytn account with our key.
(Private Key is Secret!)

### webpack-dev-server 사용할 경우
1. Download ```node_server``` folder
2. Run your favorite ```terminal``` program like powershell, cmd and so on.
3. Go inside node_server dir
4. Type ```npm install``` command to install necessary modules.
5. Type ```run dev build``` command. Then, you can use local server. ```localhost:8080```
6. Visit that Link and Please login klaytn account with our key.
(Private Key is Secret!)

<br>

## File Structure
### node_server/src/*.js
- contractInfo.js : klaytn network 상에 배포한 smart contract address 및 ABI 정보
- index.js : .html 파일에서 사용할 js 로직을 구현한 파일

### node_server/dist/
- main.js
    - ../src/index.js를 entry로 지정하여 webpack으로 bundling한 결과물
    - index.html에서 button을 눌렀을 때, contract 내 어떤 함수들을 호출할지 구현되어 있음
- index.html (webpack-dev-server 사용 시, 이 .html 파일 사용)
    - main page
    - 여기서 위의 main.js 파일을 import해서 사용

### node_server/views/
- homepage.ejs (express routing server 사용 시, 이 .html 파일 사용)
    - main page
    - node_server/dist/index.html 과 내용 동일
    - 여기서 위의 main.js 파일을 import해서 사용
    
<br>

## Klaytn Account List
They are not private keys but pulbic keys. Because Private Key is scret, I didn't upload them.

### Contract Owner & Delegate Fee Payer
- Account[0]
    - 0x4aff875cb544368fd51b8f7fda6d247582b5b87c
    
### Writer, Translator, Evaluator
- Account[1]
    - 0x6f560ac6ede19461b28382816232c4dd50bd4843
- Account[2]
    - 0x19f74f83114ad84736df48534f3b0c569ebcd419
- Account[3]
    - 0xad4abd5ba764b4cbd1c97219bb42365749f6d03c

<br>

## 번역 프로젝트(글) 등록 시, 어느정도의 보상금이 적정한가?

### 실제 번역 업체 단가
- [온라인 번역업체 PTSGI의 번역 단가](https://www.ptsgi.com/service/detail/41)
- A4 용지, 12 폰트, 25 라인, 상하좌우 3cm 여백 >> <U>1 페이지 기준, **영어->한국어 15,000원</U>**

### 번역 보상금 권장금액
- 가격 경쟁력을 맞추려면 번역 업체보다 저렴한 2/3 가격인 10,000원을 한 페이지 분량의 적절한 보상금으로 권장
- Ether로 환산하면 10,000원 = 0.04710222 ETH (2019.10.27 기준, 1 ETH = 212,366 원)
    - [실시간 코인 가격 확인 Coinmarket](https://coinmarketcap.com/converter/btc/krw/)
- Klaytn에서 gas 당 가격을 25 Ston, Ethereum에서 gas 당 가격이 약 1.4 Gwei로 형성되었으므로 Klay의 가치를 17.8571 Klay = 1 ETH 로 생각한다. 0.04710222 ETH = 0.80073774 KLAY 이므로 BLOT 토큰으로 환산해보자. 1 Klay = 10000 BLOT 으로 토큰 판매를 할 것이므로 **<U>한 페이지에 대한 적정 보상금 권장 금액은 8007.3774 BLOT</U>** 임
    - [Ether Unit Converter](http://eth-converter.com/)

<br>

## Transaction Fee 측정

### Gas Price
- Klaytn는 가스 비용이 25 Ston으로 고정되어 있음. 1 Klay = 10의 9승 Ston
- Ehtereum에서 가스 비용은 가변적이지만 평균적으로 1.4 Gwei 값을 가짐
- 1 Klay가 실제 통화와 비교했을 때 얼만큼의 가치를 지닐지 불확실하기 때문에 Ether를 기준으로 1 ETH = 17.8571 Klay 라고 가정함.

### Ethereum의 가스 가격
- 2019.10.27 기준, Average Gas Price = 1.4 Gwei
- 가스 가격 확인 : [ETH GAS STATION](https://ethgasstation.info/calculatorTxV.php)

### 가스비 소요 금액 측정

#### Transaction별 수수료 측정
1. 회원가입 시, 사용자 등록
    - Tx : 0x81d4d174ad03fd17adc5effbd5928976826558851d5fb99151634feaf98169ce
    - 85687 gas

2. 토큰 구입
    - Tx : 0x6601498cf512e7a273e98de4c6e7db4d83a5c6c444400185a0eeced63917d937
    - 60232 gas

3. 프로젝트 글 등록
    - Tx : 0x4ceeb674ebcfac093f272bbf563a38cdccb7e8c548e4a9a3b7b2dc8aa1015829
    - 140294 gas

4. (한 명에게) 보상금 지급
    - Tx : 0x6a0dba3b1c5a65690a834a9284c5ca9b35ca8a65f829cd5e4feebaab46ef2fc6
    - 54292 gas

5. (한 명에 대한) 번역활동 기록(이밴트)
    - Tx : 0xc72f9c191e18cce1f5514cd9f05b51fd45a202df5e55262e97465c8b0940eba3
    - 42203 gas

#### 하나의 번역 프로젝트 등록부터 마감 후 활동 기록까지 드는 비용(5명의 번역자, 10명의 평가자)
- 85687 + 60232 + 140294 + (54292 X (5+10)) + (42203 X (5+10)) = 1732738 gas
- 1 gas = 25 Ston 로 생각했을 때, : 43318450 Ston = 0.04331845 Klay = 433 BLOT
- = 1 gas = 1.4 Gwei 로 생각했을 때, : 2425833.2 Gwei = 0.0024258332 ETH = 508 원

#### 결론
- 10000 원 = 0.8 Klay = 8000 BLOT 의 가치를 가짐
- 하나의 번역 프로젝트가 등록되어서 마감 후 활동기록까지 약 500원의 비용이 수수료로 사용됨
- 500원 = 433 BLOT. 이는 전체 보상금의 약 5%에 해당

<br>

## 수수료 대납 계정에 자금 충당 방법
1. 매일 자정에 번역 프로젝트 마감 후, 시장에 발행된 총 토큰 수 N 를 계산
2. "N / 10000 = Q" : Q는 사용자가 토큰 환불을 원할 경우, 바꿔줘야하므로 Contract 잔고에 남아있어야 함.
3. "Contract 현재 잔고 - Q = 잉여 자금" 이므로 잉여 자금을 대납 계정에 송금해줌.

<br>

> TO Do List
1. ~~수수료 대납 기능 구현~~
2. ~~BlotMain.sol의 사용자 지갑 주소 변경 함수 수정~~
    - ~~delegatecall을 이용해서 컨트랙트 사이에 호출에도 context 유지가 필요~~
3. 서버랑 클라이언트에 기능 붙이기
4. ~~취약점 파악 및 개선(contract Access controller 수정)~~
5. ~~Project 등록 오류 찾기~~
6. ~~Truffle Framework 설치 후 테스트 코드 작성~~

<br>

> Notice
- caver.js를 Server Side에서 사용할 때는 node module로 간단히 설치하면 됨
- caver.js를 Cleint Side에서 사용할 때는 webpack으로 caver.js 모듈을 포함한 Entry 파일을 지정 후 bundling한 파일(js)을 client html 파일에서 import해서 사용
- *webapck 참고 : https://stackoverflow.com/questions/4944863/how-to-use-node-js-module-system-on-the-clientside*

<br>

cf. Contract Deployment 비용
```
5_deploy_BlotMain.js
====================

   Replacing 'KlaytnMonetaryUnit'
   ------------------------------
   > transaction hash:    0x91f119fc32d751ab15e2da8debd1353d1d90320139282029b8bbf581d151642b
   > Blocks: 0            Seconds: 0
   > contract address:    0xE31615C95C79a1E7E44a213920c4145537177cF4
   > block number:        10562254
   > block timestamp:     1572107683
   > account:             0x4aFf875CB544368fd51B8F7fda6d247582B5b87c
   > balance:             7.874401600000000003
   > gas used:            337833
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.008445825 ETH


   Linking
   -------
   * Contract: BlotMain <--> Library: KlaytnMonetaryUnit (at address: 0xE31615C95C79a1E7E44a213920c4145537177cF4)

   Replacing 'BlotMain'
   --------------------
   > transaction hash:    0xb8c9079471f56f421113a9afda3e6f50ccc9cb102b1468e8dbcb1ae73c697493
   > Blocks: 0            Seconds: 0
   > contract address:    0x9F41B86276323B12Ee82a974ed2D91FBf7BFd18f
   > block number:        10562257
   > block timestamp:     1572107686
   > account:             0x4aFf875CB544368fd51B8F7fda6d247582B5b87c
   > balance:             7.670282850000000003
   > gas used:            8164750
   > gas price:           25 gwei
   > value sent:          0 ETH
   > total cost:          0.20411875 ETH


   ⠋ Saving migration to chain.BlotMain Address 기록 성공
BlotMain ABI 기록 성공
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.212564575 ETH

1 Gas = 1.4 Gwei로 환산했을 때, BlotMain 배포 비용 : 2,406 원
```